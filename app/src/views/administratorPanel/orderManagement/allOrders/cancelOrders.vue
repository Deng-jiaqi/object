<template>
  <div class="c-cancelOrders" v-if="pageInfo">
    <!-- top -->
    <div class="top">
      <span class="title">取消订单</span>
      <span class="order-number">123456789</span>
    </div>
    <div class="c-boxs">
      <!-- 商品信息 -->
      <div class="box box-good-info" v-if="pageInfo.goodsinfo">
        <div class="good" v-for="(item,index) in pageInfo.goodsinfo" :key="index">
          <div class="good-top clearfix">
            <img :src="item.img" />
            <div class="info">
              <p class="title">{{item.goodsname}}</p>
              <p
                class="detail"
                v-for="(itemTwo,indexTwo) in item.attr"
                :key="indexTwo"
              >{{itemTwo.attr_name}}: {{itemTwo.attr_value}}</p>
            </div>
          </div>
          <div class="c-number">
            <span>数量</span>
            <Counter v-model="item.number" />
          </div>
          <div class="c-price">
            <span class="title">价格</span>
            <span>${{item.price}} x {{item.number}}</span>
          </div>
        </div>
      </div>
      <!-- 退款信息 -->
      <div class="box box-refund-info">
        <div class="info-top">
          <div class="sp-between subtotal">
            <span>所选产品总金额</span>
            <span>${{totalAmountAndTaxes.subtotal}}</span>
          </div>
          <div class="freight clearfix">
            <span>运费&nbsp;&nbsp;&nbsp;(剩余￥{{pageInfo.shipping}}）</span>
            <div class="c-input-freight">
              <input
                @blur="freightInputCheck"
                type="text"
                class="input-freight"
                v-model="refundFreight"
              />
              <span class="dollar-sign">$</span>
            </div>
          </div>
          <transition name="el-fade-in">
            <div class="warning" v-show="freightInputCheckVisible">* 无法退回超过限额的款项</div>
          </transition>
          <div class="sp-between taxes-and-fees">
            <span>税费</span>
            <span>${{totalAmountAndTaxes.taxes}}</span>
          </div>
          <div class="sp-between total-refundable-amount">
            <span>可退款总额</span>
            <span>${{pageInfo.refundsum}}</span>
          </div>
          <div class="sp-between total">
            <span>总计</span>
            <span
              v-if="refundFreight"
            >${{parseInt(totalAmountAndTaxes.subtotal)+parseInt(totalAmountAndTaxes.taxes)+parseInt(refundFreight)}}</span>
            <span
              v-if="!refundFreight"
            >${{parseInt(totalAmountAndTaxes.subtotal)+parseInt(totalAmountAndTaxes.taxes)}}</span>
          </div>
        </div>
        <div class="info-btm">
          <span>使用 (For Testing) Bogus Gateway 退款 (•••• •••• •••• 1)</span>
          <div class="c-input-freight">
            <input
              @blur="refundInputCheck"
              type="text"
              class="input-freight"
              v-model="ultimatelyRefundMoney"
            />
            <span class="dollar-sign">$</span>
          </div>
        </div>
        <transition name="el-fade-in">
          <div class="waring2" v-show="refundInputCheckVisible">* 无法退回超过限额的款项</div>
        </transition>
      </div>
      <!-- 操作 -->
      <div class="box box-operation">
        <div class="one">
          <span class="rePutInStorage">重新入库商品</span>
          <APcheckbox v-model="rePutInStorage" />
        </div>
        <p class="prompt">此订单请求的产品数量将重新入库到您的商店。</p>
        <div class="cancle-reason">
          <p class="text">取消订单原因</p>
          <el-select v-model="cancelReason" class="reason-select">
            <el-option
              v-for="item in cancelReasons"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="email-notify">
          <span>邮件通知客户</span>
          <EdgCheckbox v-model="emailNotify" />
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn btn-cancel" @click="keepOrder">保留订单</div>
      <div class="btn btn-determine" @click="determineCancle">取消订单</div>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/administratorPanel/counter'
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
import {
  getCancelOrderPageInfo,
  getRefundMoneyInfo,
  submitCancleOrder
} from '../../../../common/api/api'
import { setTimeout } from 'timers'
export default {
  components: {
    Counter,
    EdgCheckbox
  },
  data () {
    return {
      //   变量
      refundFreight: null,
      ultimatelyRefundMoney: null,
      rePutInStorage: true,
      emailNotify: true,
      pageInfo: null,
      ordergoods: [], // 选择不同的产品数量组成的数组
      totalAmountAndTaxes: {},
      refundCheck: false, // 两个输入框校验结果的和
      preventQuickClicks: false, // 防止改变取消数量变化过快
      //   data
      cancelReasons: [
        {
          value: 1,
          label: '客户更改/取消了订单'
        },
        {
          value: 2,
          label: '大环境的/等哈看'
        },
        {
          value: 3,
          label: '去去去/打打打'
        },
        {
          value: 4,
          label: '支持支持/锤子槽'
        }
      ],
      cancelReason: 1,
      // ui
      freightInputCheckVisible: false,
      refundInputCheckVisible: false
    }
  },
  computed: {
    orderid () {
      return this.$route.query.orderid
    }
  },
  watch: {
    pageInfo: {
      handler: function (newVal, oldVal) {
        this.ordergoods = []
        newVal.goodsinfo.forEach(item => {
          this.ordergoods.push(`${item.ordergid}-${item.number}`)
        })
        console.log(this.ordergoods)
        if (this.preventQuickClicks) {
          return
        }
        this.preventQuickClicks = true
        setTimeout(() => {
          getRefundMoneyInfo({ ordergoods: this.ordergoods }).then(res => {
            console.log(res)
            this.totalAmountAndTaxes = res.data.data
            this.preventQuickClicks = false
          })
        }, 2000)
      },
      deep: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    freightInputCheck () {
      console.log(1111)
      // 运费校验
      if (parseInt(this.refundFreight) > parseInt(this.pageInfo.shipping)) {
        this.freightInputCheckVisible = true
        this.refundCheck = false
      } else {
        this.freightInputCheckVisible = false
        this.refundCheck = true
      }
    },
    refundInputCheck () {
      // 退款input校验
      if (
        parseInt(this.ultimatelyRefundMoney) > parseInt(this.pageInfo.refundsum)
      ) {
        console.log(6666)
        this.refundInputCheckVisible = true
        this.refundCheck = false
      } else {
        this.refundInputCheckVisible = false
        this.refundCheck = true
      }
    },
    keepOrder () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/orderDetails',
        query: { orderid: this.orderid }
      })
    },
    determineCancle () {
      submitCancleOrder({
        orderid: this.orderid,
        reason: this.cancelReason,
        ordergoods: this.ordergoods,
        amount: this.ultimatelyRefundMoney,
        freight: this.refundFreight
      }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          console.log('退款成功')
          this.$router.push({
            path: '/administratorPanel/orderManagement/orderDetails',
            query: { orderid: this.orderid }
          })
        }
      })
    }
  },
  created () {
    getCancelOrderPageInfo({ orderid: this.orderid }).then(res => {
      console.log(res)
      this.pageInfo = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
.c-cancelOrders {
  height: calc(100vh - 78px);
  background-color: rgba(242, 242, 242, 1);
  overflow-y: auto;
  .top {
    line-height: 76px;
    height: 76px;
    padding-left: 22px;
    background-color: #fff;
    .title {
      font-size: 26px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin-right: 22px;
    }
    .order-number {
      font-size: 22px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-right: 12px;
    }
  }
  .c-boxs {
    padding: 24px 22px 142px 22px;
    .box {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 50px 0px rgba(204, 204, 204, 0.65);
      border-radius: 8px;
      padding: 29px 22px 28px 22px;
      background-color: #fff;
      font-size: 22px;
    }
    .box-good-info {
      margin-bottom: 22px;
      .good {
        padding-bottom: 28px;
        margin-top: 24px;
        .good-top {
          img {
            width: 173px;
            height: 162px;
            margin-right: 7px;
            float: left;
          }
          .info {
            width: calc(100% - 180px);
            float: right;
            p {
              margin-bottom: 13px;
            }
            p:last-child {
              margin-bottom: 0;
            }
            .title {
              margin-bottom: 18px;
            }
            .detail {
              font-size: 20px;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
        .c-number {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        .c-price {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          .title {
            letter-spacing: 10px;
          }
        }
      }
    }
    .box-refund-info {
      margin-bottom: 22px;
      .info-top {
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        padding-bottom: 22px;
        .warning {
          color: #bf0711;
          text-align: end;
          position: relative;
          top: -30px;
        }
        .sp-between {
          display: flex;
          justify-content: space-between;
        }
        .subtotal {
          margin-bottom: 34px;
        }
        .freight {
          margin-bottom: 40px;
          line-height: 46px;
          .c-input-freight {
            float: right;
            position: relative;
            .input-freight {
              width: 104px;
              height: 46px;
              border: 1px solid rgba(201, 201, 201, 1);
              border-radius: 4px;
              outline: none;
              padding-left: 40px;
              font-weight: 400;
              color: rgba(137, 137, 137, 1);
            }
            input::-ms-clear,
            input::-ms-reveal {
              display: none;
            }
            .dollar-sign {
              color: rgba(137, 137, 137, 1);
              position: absolute;
              left: 10px;
              top: 2px;
            }
          }
        }
        .taxes-and-fees {
          margin-bottom: 40px;
        }
        .total-refundable-amount {
          margin-bottom: 40px;
        }
        .total {
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
      .info-btm {
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(51, 51, 51, 1);
        margin-top: 22px;
        .c-input-freight {
          position: relative;
          .input-freight {
            width: 104px;
            height: 46px;
            border: 1px solid rgba(201, 201, 201, 1);
            border-radius: 4px;
            outline: none;
            padding-left: 40px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
          }
          input::-ms-clear,
          input::-ms-reveal {
            display: none;
          }
          .dollar-sign {
            color: rgba(137, 137, 137, 1);
            position: absolute;
            left: 10px;
            top: 11px;
          }
        }
      }
      .waring2 {
        font-size: 14px;
        color: #bf0711;
        text-align: end;
        padding-right: 36px;
        position: relative;
        top: -20px;
      }
    }
    .box-operation {
      .one {
        margin-bottom: 24px;
        .rePutInStorage {
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 20px;
        }
      }
      .prompt {
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        margin-bottom: 42px;
      }
      .cancle-reason {
        margin-bottom: 37px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        .text {
          margin-bottom: 22px;
        }
        .reason-select {
          width: 100%;
          // select框样式修改
          /deep/ .el-input__suffix {
            display: none;
          }
          /deep/ .el-input::after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid rgba(109, 109, 109, 1);
            right: 10px;
            top: calc(50% - 4px);
            transition: all 0.3s;
            cursor: pointer;
          }
          /deep/ .el-input__inner {
            height: 54px;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
          }
        }
      }
      .email-notify {
        margin-bottom: 54px;
        span {
          font-size: 16px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 20px;
        }
      }
    }
    .btn {
      width: 560px;
      height: 92px;
      box-shadow: 0px 30px 60px 0px rgba(0, 159, 255, 0.65);
      border-radius: 46px;
      font-size: 34px;
      line-height: 92px;
      text-align: center;
      margin: auto;
      margin-top: 36px;
    }
    .btn-cancel {
      background: rgba(255, 255, 255, 1);
      color: rgba(0, 159, 255, 1);
      box-shadow: 0px 20px 50px 0px rgba(204, 204, 204, 0.65);
    }
    .btn-determine {
      background-color: rgba(0, 159, 255, 1);
      box-shadow: 0px 30px 60px 0px rgba(0, 159, 255, 0.65);
      color: rgba(255, 255, 255, 1);
    }
  }
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
p {
  margin: 0;
}
// select 的时候样式单独写(可能因为权重关系？)
.el-select-dropdown__item.selected {
  color: rgba(0, 159, 255, 1);
}
/deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: rgba(0, 159, 255, 1);
}
/deep/ .el-select .el-input__inner:focus {
  border-color: rgba(0, 159, 255, 1);
}
</style>

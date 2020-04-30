<template>
  <div class="c-cancelOrders" v-if="pageInfo">
    <div class="content-cancelOrders">
      <el-form ref="cancelOrdersForm" :model="informationAboutMoney" :rules="rule">
        <!-- top -->
        <div class="top">
          <div class="left">
            <span class="title">{{$t('lang.cancelOrder.text1')}}</span>
            <span class="order-number">{{ordernum}}</span>
          </div>
          <div class="right" @click="back">
            <span class="iconfont icon-fanhui1"></span>
            {{$t('lang.cancelOrder.text2')}}
          </div>
        </div>
        <!-- 商品信息 -->
        <div class="c-good-info">
          <div class="good clearfix" v-for="(item,index) in pageInfo.goodsinfo" :key="index">
            <img :src="item.img" alt />
            <div class="info">
              <p class="title">{{item.goodsname}}</p>
              <p
                class="detail"
                v-for="(itemTwo,indexTwo) in item.attr"
                :key="indexTwo"
              >{{itemTwo.attr_name}}: {{itemTwo.attr_value}}</p>
            </div>
            <Counter v-model="item.number" />
            <span class="money">${{item.price}} x {{item.number}}</span>
          </div>
        </div>
        <!-- 退款信息 -->
        <div class="box-refund-info" v-loading="refundInfoVisible">
          <div class="info-top">
            <div class="sp-between subtotal">
              <span>{{$t('lang.cancelOrder.text3')}}</span>
              <span>${{totalAmountAndTaxes.subtotal}}</span>
            </div>
            <div class="freight clearfix">
              <p class="left-text">
                <span>{{$t('lang.cancelOrder.text4')}}&nbsp;&nbsp;&nbsp;({{$t('lang.cancelOrder.text5')}} ￥{{pageInfo.shipping}}）</span>
              </p>
              <div class="c-input-freight">
                <span class="dollar-sign">$</span>
                <el-form-item prop="refundFreight">
                  <el-input v-model="informationAboutMoney.refundFreight"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="sp-between discount">
              <span>{{$t('lang.cancelOrder.text17')}}</span>
              <span>{{totalAmountAndTaxes.discount_code}}</span>
            </div>
            <div class="sp-between discountAmount">
              <span>{{$t('lang.cancelOrder.text18')}}</span>
              <span>- ${{totalAmountAndTaxes.discount_amount}}</span>
            </div>
            <div class="sp-between taxes-and-fees">
              <span>{{$t('lang.cancelOrder.text6')}}</span>
              <span>${{totalAmountAndTaxes.taxes}}</span>
            </div>
            <div class="sp-between total-refundable-amount">
              <span>{{$t('lang.cancelOrder.text7')}}</span>
              <span>${{pageInfo.refundsum}}</span>
            </div>
            <div class="sp-between total">
              <span>{{$t('lang.cancelOrder.text8')}}</span>
              <span
                v-if="informationAboutMoney.refundFreight"
              >${{parseFloat(totalAmountAndTaxes.refundsum,2)+parseFloat(informationAboutMoney.refundFreight,2)}}</span>
              <span
                v-if="!informationAboutMoney.refundFreight"
              >${{parseFloat(totalAmountAndTaxes.refundsum,2)}}</span>
            </div>
          </div>
          <div class="info-btm">
            <span>{{$t('lang.cancelOrder.text10')}}</span>
            <div class="c-input-freight">
              <el-form-item prop="ultimatelyRefundMoney">
                <el-input v-model="informationAboutMoney.ultimatelyRefundMoney"></el-input>
              </el-form-item>
              <span class="dollar-sign">$</span>
            </div>
          </div>
        </div>
        <!-- 操作 -->
        <div class="box-operation">
          <div class="one">
            <span class="rePutInStorage">{{$t('lang.cancelOrder.text11')}}</span>
            <el-checkbox v-model="rePutInStorage"></el-checkbox>
          </div>
          <p class="prompt">{{$t('lang.cancelOrder.text12')}}</p>
          <div class="cancle-reason">
            <p class="text">{{$t('lang.cancelOrder.text13')}}</p>
            <el-select v-model="cancelReason" class="reason-select">
              <el-option
                v-for="item in $i18n.locale==='zh-cn'?cancelReasonsZh:cancelReasonsEn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="email-notify">
            <span>{{$t('lang.cancelOrder.text14')}}</span>
            <el-checkbox v-model="emailNotify"></el-checkbox>
          </div>
          <div class="c-btn">
            <el-button plain @click="keepOrder">{{$t('lang.cancelOrder.text15')}}</el-button>
            <el-button type="primary" @click="determineCancle">{{$t('lang.cancelOrder.text16')}}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/administratorPanel/counter'
import {
  getCancelOrderPageInfo,
  getRefundMoneyInfo,
  submitCancleOrder
} from '../../../../common/api/api'
import { mapMutations } from 'vuex'
import messageAlert from '@/utils/messageAlert'
export default {
  components: {
    Counter
  },
  data () {
    const freightInputCheck = (rule, value, callback) => {
      if (isNaN(parseFloat(value))) {
        callback(new Error(this.$t('lang.validate.text12')))
      }
      // 退还运费的最大值验证
      if (parseInt(value) > parseInt(this.pageInfo.shipping)) {
        callback(new Error(this.$t('lang.validate.text13')))
      } else {
        callback()
      }
    }
    const refundInputCheck = (rule, value, callback) => {
      if (isNaN(parseFloat(value))) {
        callback(new Error(this.$t('lang.validate.text12')))
      }
      // 退还运费的最大值验证
      if (parseInt(value) > parseInt(this.pageInfo.refundsum)) {
        callback(new Error(this.$t('lang.validate.text13')))
      } else {
        callback()
      }
    }
    return {
      rule: {
        refundFreight: [
          { required: true, message: this.$t('lang.validate.text14'), trigger: 'blur' },
          { validator: freightInputCheck, trigger: 'blur' }
        ],
        ultimatelyRefundMoney: [
          { required: true, message: this.$t('lang.validate.text15'), trigger: 'blur' },
          { validator: refundInputCheck, trigger: 'blur' }
        ]
      },
      //   变量
      informationAboutMoney: {
        refundFreight: null,
        ultimatelyRefundMoney: null
      },
      rePutInStorage: true,
      emailNotify: true,
      pageInfo: null,
      ordernum: null,
      ordergoods: [], // 选择不同的产品数量组成的数组
      totalAmountAndTaxes: {},
      refundCheck: false, // 两个输入框校验结果的和
      timer: null,
      //   data
      cancelReasonsZh: [
        {
          value: 1,
          label: '客户更改/取消了订单'
        }
      ],
      cancelReasonsEn: [
        {
          value: 1,
          label: 'The customer has changed/cancelled the order'
        }
      ],
      cancelReason: 1,
      // ui
      refundInfoVisible: true
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
        clearTimeout(this.timer)
        this.refundInfoVisible = true
        setTimeout(() => {
          getRefundMoneyInfo({ ordergoods: this.ordergoods }).then(res => {
            console.log(res)
            this.refundInfoVisible = false
            this.totalAmountAndTaxes = res.data.data
          })
        }, 1500)
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['forRightLoadingVisible']),
    back () {
      this.$router.go(-1)
    },
    keepOrder () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/orderDetails',
        query: { orderid: this.orderid }
      })
    },
    determineCancle () {
      this.$refs['cancelOrdersForm'].validate(valid => {
        if (valid) {
          submitCancleOrder({
            orderid: this.orderid,
            reason: this.cancelReason,
            ordergoods: this.ordergoods,
            amount: this.informationAboutMoney.ultimatelyRefundMoney,
            freight: this.informationAboutMoney.refundFreight
          }).then(res => {
            console.log(res)
            messageAlert(res)
            if (res.data.code === 1) {
              setTimeout(() => {
                this.$router.push({
                  path: '/administratorPanel/orderManagement/orderDetails',
                  query: { orderid: this.orderid }
                })
              }, 2000)
            }
          })
        }
      })
    }
  },
  created () {
    this.forRightLoadingVisible(true)
    getCancelOrderPageInfo({ orderid: this.orderid }).then(res => {
      console.log(res)
      this.forRightLoadingVisible(false)
      this.pageInfo = res.data.data
    })
    this.ordernum = this.$route.query.orderNum
  }
}
</script>
<style lang="less" scoped>
.c-cancelOrders {
  max-width: 772px;
  margin: auto;
  padding-top: 87px;
  padding-bottom: 96px;
  .content-cancelOrders {
    .top {
      margin-bottom: 27px;
      display: flex;
      justify-content: space-between;
      .left {
        .title {
          font-size: 30px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-right: 16px;
        }
        .order-number {
          font-size: 22px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 12px;
        }
      }
      .right {
        font-size: 18px;
        padding-right: 20px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        display: flex;
        align-items: center;
        .icon-fanhui1 {
          font-size: 14px;
        }
      }
      .right:hover {
        cursor: pointer;
      }
    }
    .c-good-info {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding-bottom: 54px;
      padding-top: 33px;
      margin-bottom: 11px;
      .good {
        background: rgba(252, 252, 252, 1);
        border: 1px solid rgba(239, 239, 239, 1);
        border-radius: 4px;
        width: 707px;
        margin: auto;
        padding-top: 45px;
        padding-bottom: 45px;
        display: flex;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          margin-left: 24px;
          margin-right: 20px;
        }
        .info {
          float: left;
          margin-right: 30px;
          width: 270px;
          p {
            margin-bottom: 13px;
          }
          p:last-child {
            margin-bottom: 0;
          }
          .title {
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            word-break: break-all;
            word-wrap: break-word;
          }
          .detail {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
        .money {
          font-size: 14px;
          margin-left: 62px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .box-refund-info {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 13px;
      .info-top {
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 32px 46px 25px 31px;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        .sp-between {
          display: flex;
          justify-content: space-between;
        }
        .subtotal {
          margin-bottom: 34px;
        }
        .freight {
          margin-bottom: 40px;
          .left-text {
            line-height: 51px;
            display: inline-block;
          }
          .c-input-freight {
            float: right;
            position: relative;
            .dollar-sign {
              color: rgba(137, 137, 137, 1);
              position: absolute;
              left: 10px;
              z-index: 1000;
              top: 16px;
            }
            /deep/ .el-input__inner {
              height: 51px;
              padding-left: 30px;
            }
          }
        }
        .discount {
          margin-bottom: 40px;
        }
        .discountAmount {
          margin-bottom: 40px;
        }
        .taxes-and-fees {
          margin-bottom: 40px;
        }
        .total-refundable-amount {
          margin-bottom: 40px;
        }
        .total {
          font-size: 18px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
      .info-btm {
        padding: 33px 36px 33px 32px;
        font-size: 16px;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(51, 51, 51, 1);
        .c-input-freight {
          position: relative;
          /deep/ .el-input__inner {
            height: 51px;
            padding-left: 30px;
          }
          .dollar-sign {
            color: rgba(137, 137, 137, 1);
            position: absolute;
            z-index: 1000;
            left: 10px;
            top: 18px;
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
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding-left: 36px;
      padding-top: 38px;
      padding-bottom: 27px;
      .one {
        margin-bottom: 24px;
        .rePutInStorage {
          font-size: 16px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 20px;
        }
      }
      .prompt {
        font-size: 14px;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        margin-bottom: 57px;
      }
      .cancle-reason {
        margin-bottom: 57px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        .text {
          margin-bottom: 20px;
        }
        .reason-select {
          width: 558px;
          // select框样式修改
          /deep/ .el-input__inner {
            height: 54px;
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
      .c-btn {
        padding-right: 34px;
        display: flex;
        justify-content: flex-end;
      }
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
</style>

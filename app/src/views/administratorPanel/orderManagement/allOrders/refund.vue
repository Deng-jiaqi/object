<template>
  <div class="c-refund" v-if="pageInfo" ref="test">
    <!-- top -->
    <div class="top">
      <span class="title">退款</span>
      <span class="order-number">{{pageInfo.ordernum}}</span>
    </div>
    <div class="c-boxs">
      <!-- 未发货商品信息 -->
      <div class="box box-unshipped-good-info" v-if="pageInfo.notshiped">
        <div class="c-status">
          <span class="yellow-circle"></span>
          {{pageInfo.notshiped.head}}
        </div>
        <div class="good" v-for="(item,index) in pageInfo.notshiped.info" :key="index">
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
        <div
          class="if-rePutInStorage"
          v-if="choosedNotShipedNumber"
        >重新入库{{choosedNotShipedNumber}}件商品</div>
      </div>
      <!-- 已发货商品信息 -->
      <div class="box box-shipped-good-info" v-if="pageInfo.shiped">
        <div v-for="(item,idx) in pageInfo.shiped" :key="idx">
          <div class="c-status">
            <span class="blue-circle"></span>
            <span class="status">{{item.head}}</span>
            <p class="delivery-information">{{item.deliver_method}}: {{item.deliver_order}}</p>
          </div>
          <div class="good" v-for="(itemTwo,indexTwo) in item.info" :key="indexTwo">
            <div class="good-top clearfix">
              <img :src="itemTwo.img" />
              <div class="info">
                <p class="title">{{itemTwo.goodsname}}</p>
                <p
                  class="detail"
                  v-for="(itemThree,indexThree) in itemTwo.attr"
                  :key="indexThree"
                >{{itemThree.attr_name}}: {{itemThree.attr_value}}</p>
              </div>
            </div>
            <div class="c-number">
              <span>数量</span>
              <Counter v-model="itemTwo.number" />
            </div>
            <div class="c-price">
              <span class="title">价格</span>
              <span>${{itemTwo.price}} x {{itemTwo.number}}</span>
            </div>
          </div>
        </div>
        <div class="c-replenishment" v-show="choosedShipedNumber">
          <p class="title">补货{{choosedShipedNumber}}件商品:</p>
          <el-select v-model="deliveryWarehouse" placeholder="请选择">
            <el-option
              v-for="item in deliveryWarehouses"
              :key="item.Id"
              :label="item.name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 退款-运费 -->
      <div class="box box-refund-freight clearfix">
        <p class="title">已退还运费:&nbsp;&nbsp;&nbsp;${{pageInfo.refund_freight}}</p>
        <p class="max">运费:&nbsp;&nbsp;&nbsp;Heavy Goods Shipping (${{pageInfo.freight}})</p>
        <div class="c-input-freight">
          <el-form ref="refundFreightValidate" :model="refundFreight" :rules="refundFreightRule">
            <p class="text">退款金额</p>
            <el-form-item prop="refundFreight">
              <el-input :placeholder="'$0.00'" v-model.number="refundFreight.refundFreight" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 退款-原因 -->
      <div class="box box-refund-reason">
        <p class="title">退款原因</p>
        <el-input v-model="refundReason" />
      </div>
      <!-- 摘要 -->
      <div class="box box-Abstract">
        <p class="title">摘要</p>
        <div class="subtotal sp-between">
          <span>产品小计</span>
          <span>${{RefundMoneyInfo.subtotal}}</span>
          <span class="good-number">{{RefundMoneyInfo.goodsnum}} 件商品</span>
        </div>
        <div class="Taxes-fees sp-between">
          <span>税费</span>
          <span>${{RefundMoneyInfo.taxes}}</span>
        </div>
        <div class="delivery sp-between">
          <span>运费</span>
          <span>${{refundFreight.refundFreight}}</span>
        </div>
        <div class="total-amount sp-between">
          <span>退款总额</span>
          <span
            v-if="refundFreight.refundFreight"
          >${{parseInt(RefundMoneyInfo.refundsum)+parseInt(refundFreight.refundFreight)}}</span>
          <!-- <span v-if="!refundFreight">${{parseInt(RefundMoneyInfo.refundsum)}}</span> -->
        </div>
      </div>
      <!-- 退款 -->
      <div class="box box-refund-good">
        <div class="refund-good-top clearfix">
          <div class="c-input-ultimatelyRefundMoney">
            <el-form
              ref="ultimatelyRefundMoneyValidate"
              :model="ultimatelyRefundMoney"
              :rules="ultimatelyRefundMoneyRule"
            >
              <p class="text">退款金额</p>
              <el-form-item prop="ultimatelyRefundMoney">
                <el-input
                  :placeholder="'$0.00'"
                  v-model.number="ultimatelyRefundMoney.ultimatelyRefundMoney"
                />
              </el-form-item>
            </el-form>
          </div>
          <p class="canbe-refund">可退金额：${{pageInfo.totalprice}}</p>
        </div>
        <div class="refund-good-btm clearfix">
          <span>邮件通知用户</span>
          &nbsp;&nbsp;
          <EdgCheckbox v-model="emailNotify" />
          <!-- <edg-button
            class="refund-btn"
            @click.native="refund"
            :type="'primary'"
            :text="ultimatelyRefundMoney.ultimatelyRefundMoney?`退款$${ultimatelyRefundMoney.ultimatelyRefundMoney}`:'退款'"
          />-->
        </div>
      </div>
      <div class="btn-determine" @click="refund">退款<span v-show='ultimatelyRefundMoney.ultimatelyRefundMoney'>$</span>{{ultimatelyRefundMoney.ultimatelyRefundMoney}}</div>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/administratorPanel/counter'
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
import {
  getRefundPageInfo,
  getRefundMoneyInfo,
  submitRefund
} from '../../../../common/api/api'
import { setTimeout } from 'timers'
export default {
  components: {
    Counter,
    EdgCheckbox
    // APcheckbox
  },
  data () {
    const checkRefundFreight = (rule, value, callback) => {
      // 退还运费的最大值验证
      if (
        parseInt(value) >
        parseInt(this.pageInfo.freight) - parseInt(this.pageInfo.refund_freight)
      ) {
        callback(new Error('超出最大金额'))
      } else {
        callback()
      }
    }
    const checkUltimatelyRefundMoney = (rule, value, callback) => {
      // 退还运费的最大值验证
      if (parseInt(value) > parseInt(this.pageInfo.totalprice)) {
        callback(new Error('超出最大金额'))
      } else {
        callback()
      }
    }
    return {
      refundFreightRule: {
        refundFreight: [
          { required: true, message: '请输入退款金额', trigger: 'blur' },
          { type: 'number', message: '金额必须为数字' },
          { validator: checkRefundFreight, trigger: 'blur' }
        ]
      },
      ultimatelyRefundMoneyRule: {
        ultimatelyRefundMoney: [
          { required: true, message: '请输入退款金额', trigger: 'blur' },
          { type: 'number', message: '金额必须为数字' },
          { validator: checkUltimatelyRefundMoney, trigger: 'blur' }
        ]
      },
      // 变量
      refundFreight: {
        // 退款运费
        refundFreight: null
      },
      ultimatelyRefundMoney: {
        // 最终退款金额
        ultimatelyRefundMoney: null
      },
      choosedNotShipedNumber: 0,
      choosedShipedNumber: 0,
      deliveryWarehouses: null,
      deliveryWarehouse: null,
      locationId: null,
      refundReason: '',
      emailNotify: true,
      formValidate: false, // 2个输入框校验的和
      preventQuickClicks: false, // 防止改变退款数量变化过快
      // data
      pageInfo: {},
      ordergoodsForCheckMoney: [], // 查看摘要要求传的数据格式 [id-数量的格式]
      ordergoodsForSubmit: { shiped: [], notshiped: [] }, // 提交时候后端要求格式难以理解
      RefundMoneyInfo: {} // 摘要处退款商品的金额信息
      // ui
    }
  },
  watch: {
    pageInfo: {
      handler: function (newVal, oldVal) {
        this.ordergoodsForCheckMoney = []
        this.ordergoodsForSubmit = { shiped: [], notshiped: [] }
        if (newVal.notshiped) {
          this.choosedNotShipedNumber = 0
          newVal.notshiped.info.forEach(item => {
            this.ordergoodsForCheckMoney.push(
              `${item.ordergid}-${item.number}`
            )
            this.ordergoodsForSubmit.notshiped.push(
              `${item.ordergid}-${item.number}`
            )
            this.choosedNotShipedNumber += parseInt(item.number, 0)
          })
        }
        if (newVal.shiped) {
          this.choosedShipedNumber = 0
          newVal.shiped.forEach(item => {
            item.info.forEach(itemTwo => {
              this.ordergoodsForCheckMoney.push(
                `${itemTwo.ordergid}-${itemTwo.number}`
              )
              this.ordergoodsForSubmit.shiped.push(
                `${itemTwo.ordergid}-${itemTwo.number}-${itemTwo.Id}`
              )
              this.choosedShipedNumber += parseInt(itemTwo.number, 0)
            })
          })
        }
        if (this.preventQuickClicks) {
          return
        }
        this.preventQuickClicks = true
        setTimeout(() => {
          getRefundMoneyInfo({ ordergoods: this.ordergoodsForCheckMoney }).then(
            res => {
              console.log(res)
              this.RefundMoneyInfo = res.data.data
            }
          )
          this.preventQuickClicks = false
        }, 2000)
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    back () {
      this.$router.go(-1)
    },
    refund () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        console.log(this.$refs.ultimatelyRefundMoney)
        this.$refs['ultimatelyRefundMoneyValidate'].validate(valid => {
          if (valid) {
            this.formValidate = true
          } else {
            this.formValidate = false
          }
        })
        this.$refs['refundFreightValidate'].validate(valid => {
          if (valid) {
            this.formValidate = true
          } else {
            this.formValidate = false
          }
        })
        if (this.formValidate) {
          submitRefund({
            orderid: this.$route.query.orderid,
            amount: this.ultimatelyRefundMoney.ultimatelyRefundMoney,
            reason: this.refundReason,
            freight: this.refundFreight.refundFreight,
            ordergoods: this.ordergoodsForSubmit,
            locateid: this.deliveryWarehouse
          }).then(res => {
            console.log(res)
            if (res.data.code === 1) {
              this.$router.push({
                path: '/administratorPanel/orderManagement/orderDetails',
                query: { orderid: this.$route.query.orderid }
              })
            }
          })
        }
      }, 1000)
    }
  },
  created () {
    getRefundPageInfo({ orderid: this.$route.query.orderid }).then(res => {
      console.log(res)
      this.pageInfo = res.data.data
      if (this.pageInfo.shiped) {
        this.deliveryWarehouses = this.pageInfo.location
        this.deliveryWarehouse = this.deliveryWarehouses[0].Id
      }
    })
  }
}
</script>
<style lang="less" scoped>
.c-refund {
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
    .box-unshipped-good-info {
      margin-bottom: 22px;
      .c-status {
        .yellow-circle {
          width: 16px;
          height: 16px;
          background: rgba(255, 203, 61, 1);
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
      }
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
      .if-rePutInStorage {
        padding-left: 22px;
        font-size: 22px;
        padding-top: 20px;
        border-top: 2px solid rgba(238, 238, 238, 1);
        margin-top: 20px;
        word-spacing: 2px;
        letter-spacing: 2px;
      }
    }
    .box-shipped-good-info {
      margin-bottom: 22px;
      .c-status {
        .blue-circle {
          width: 16px;
          height: 16px;
          background: rgba(0, 159, 255, 1);
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
        .delivery-information {
          margin-top: 22px;
          margin-bottom: 22px;
        }
      }
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
      .c-replenishment {
        padding-left: 22px;
        font-size: 22px;
        padding-top: 20px;
        border-top: 2px solid rgba(238, 238, 238, 1);
        margin-top: 20px;
        .title {
          margin-bottom: 20px;
        }
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
        /deep/ .el-select .el-input.is-focus .el-input__inner {
          border-color: rgba(0, 159, 255, 1);
        }
        /deep/ .el-select .el-input__inner:focus {
          border-color: rgba(0, 159, 255, 1);
        }
        /deep/ .el-select .el-input__inner:hover {
          border-color: rgba(0, 159, 255, 1);
        }
        .el-select-dropdown__item.selected {
          color: rgba(0, 159, 255, 1);
        }
        /deep/ .el-input__inner {
          font-size: 22px;
          height: 56px;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          border: 1px solid #959595;
          border-radius: 4px;
        }
      }
    }
    .box-refund-freight {
      margin-bottom: 22px;
      .text {
        margin-top: 24px;
        margin-bottom: 24px;
        margin-right: 20px;
      }
      .c-input-freight {
        /deep/ .el-form-item__content {
          display: inline-block;
          width: 100%;
        }
        /deep/ .el-input {
          width: 100%;
        }
        /deep/ .el-input__inner {
          background: #fff;
          border: 1px solid rgba(149, 149, 149, 1);
          border-radius: 4px;
          outline: rgba(56, 92, 165, 1);
          padding-left: 17px;
          height: 58px;
        }
        /deep/ .el-input__inner:focus {
          border: 1px solid rgba(0, 159, 255, 1);
        }
        /deep/ .el-input__inner:hover {
          border-color: rgba(0, 159, 255, 1);
        }
      }
      .title {
        margin-bottom: 30px;
      }
      .max {
        margin-bottom: 34px;
      }
    }
    .box-refund-reason {
      margin-bottom: 22px;
      .title {
        margin-bottom: 22px;
      }
      /deep/ .el-input {
        width: 100%;
      }
      /deep/ .el-input__inner {
        background: #fff;
        border: 1px solid rgba(149, 149, 149, 1);
        border-radius: 4px;
        outline: rgba(56, 92, 165, 1);
        padding-left: 17px;
        height: 56px;
      }
      /deep/ .el-input__inner:focus {
        border: 1px solid rgba(0, 159, 255, 1);
      }
      /deep/ .el-input__inner:hover {
        border-color: rgba(0, 159, 255, 1);
      }
    }
    .box-Abstract {
      margin-bottom: 22px;
      .title {
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 20px;
      }
      .subtotal {
        margin-bottom: 63px;
        position: relative;
        color: rgba(51, 51, 51, 1);
        .good-number {
          position: absolute;
          top: 36px;
          left: 0;
          font-size: 16px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .Taxes-fees {
        margin-bottom: 37px;
        color: rgba(51, 51, 51, 1);
      }
      .delivery {
        margin-bottom: 37px;
        color: rgba(51, 51, 51, 1);
      }
      .total-amount {
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .sp-between {
        display: flex;
        justify-content: space-between;
      }
    }
    .box-refund-good {
      margin-bottom: 22px;
      .refund-good-top {
        .c-input-ultimatelyRefundMoney {
          /deep/ .el-form-item__content {
            display: inline-block;
            width: 100%;
          }
          /deep/ .el-input {
            width: 100%;
          }
          /deep/ .el-input__inner {
            background: #fff;
            border: 1px solid rgba(149, 149, 149, 1);
            border-radius: 4px;
            outline: rgba(56, 92, 165, 1);
            padding-left: 17px;
            height: 56px;
          }
          /deep/ .el-input__inner:focus {
            border: 1px solid rgba(0, 159, 255, 1);
          }
          /deep/ .el-input__inner:hover {
            border-color: rgba(0, 159, 255, 1);
          }
        }
        .text {
          margin-bottom: 22px;
        }
        .canbe-refund {
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-top: 42px;
          margin-bottom: 35px;
        }
      }
    }
    .btn-determine {
      width: 560px;
      height: 92px;
      background: linear-gradient(
        90deg,
        rgba(0, 159, 255, 1) 0%,
        rgba(0, 198, 255, 1) 100%
      );
      box-shadow: 0px 30px 60px 0px rgba(0, 159, 255, 0.65);
      border-radius: 46px;
      font-size: 34px;
      color: rgba(255, 255, 255, 1);
      line-height: 92px;
      text-align: center;
      margin: auto;
      margin-top: 36px;
    }
  }
}
p {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>

<template>
  <div class="c-refund" v-if="pageInfo">
    <div class="content-refund">
      <el-form ref="refundForm" :model="informationAboutMoney" :rules="rule">
        <!-- top -->
        <div class="top">
          <span @click="back" class="iconfont icon-fanhui1"></span>
          <span class="title">{{$t('lang.refund.text1')}}</span>
          <span class="order-number">{{pageInfo.ordernum}}</span>
        </div>
        <!-- 未发货商品信息 -->
        <div class="c-good-info" v-if="pageInfo.notshiped">
          <div class="c-status">
            <span class="yellow-circle"></span>
            <span class="status">{{pageInfo.notshiped.head}}</span>
          </div>
          <div class="good" v-for="(item,index) in pageInfo.notshiped.info" :key="index">
            <div class="left">
              <img :src="item.img" alt />
              <div class="info">
                <p class="title">{{item.goodsname}}</p>
                <p class="money">${{item.price}} x {{item.number}}</p>
                <p
                  class="detail"
                  v-for="(itemTwo,indexTwo) in item.attr"
                  :key="indexTwo"
                >{{itemTwo.attr_name}}: {{itemTwo.attr_value}}</p>
              </div>
            </div>
            <Counter v-model="item.number" />
          </div>
          <div
            class="if-rePutInStorage"
            v-if="choosedNotShipedNumber"
          >{{$t('lang.refund.text19')}} {{choosedNotShipedNumber}} {{$t('lang.refund.text20')}}</div>
        </div>
        <!-- 已发货商品信息 -->
        <div class="c-good-info" v-if="pageInfo.shiped">
          <div v-for="(item,idx) in pageInfo.shiped" :key="idx">
            <div class="c-status">
              <span class="blue-circle"></span>
              <span class="status">{{item.head}}</span>
              <p class="delivery-information">{{item.deliver_method}}: {{item.deliver_order}}</p>
            </div>
            <div class="good" v-for="(itemTwo,indexTwo) in item.info" :key="indexTwo">
              <div class="left">
                <img :src="itemTwo.img" alt />
                <div class="info">
                  <p class="title">{{itemTwo.goodsname}}</p>
                  <p class="money">${{itemTwo.price}} x {{itemTwo.number}}</p>
                  <p
                    class="detail"
                    v-for="(itemThree,indexThree) in itemTwo.attr"
                    :key="indexThree"
                  >{{itemThree.attr_name}}: {{itemThree.attr_value}}</p>
                </div>
              </div>

              <Counter v-model="itemTwo.number" />
            </div>
          </div>
          <div class="c-replenishment" v-show="choosedShipedNumber">
            <p
              class="title"
            >{{$t('lang.refund.text3')}} {{choosedShipedNumber}} {{$t('lang.refund.text4')}}:</p>
            <el-select v-model="deliveryWarehouse" :placeholder="$t('lang.refund.text21')">
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
        <div class="refund-freight clearfix">
          <p class="title">{{$t('lang.refund.text5')}}&nbsp;&nbsp;&nbsp;${{pageInfo.refund_freight}}</p>
          <p
            class="max"
          >{{$t('lang.refund.text6')}}:&nbsp;&nbsp;&nbsp;Heavy Goods Shipping (${{pageInfo.freight}})</p>
          <div class="c-input-freight">
            <span class="text">{{$t('lang.refund.text7')}}</span>
            <el-form-item prop="refundFreight">
              <el-input :placeholder="'$0.00'" v-model="informationAboutMoney.refundFreight" />
            </el-form-item>
          </div>
        </div>
        <!-- 退款-原因 -->
        <div class="refund-reason">
          <p v-if='!pageInfo.refundid'> {{$t('lang.refund.text8')}} </p>
          <el-input v-if='!pageInfo.refundid' v-model="refundReason" />
          <p v-if='pageInfo.refundid'>
            {{$t('lang.refund.text8')}}:

            <span v-if="pageInfo.reason">{{pageInfo.reason}}</span>
            <span v-if="!pageInfo.reason">{{$t('lang.refund.text30')}}</span>
          </p>
          <p v-if='pageInfo.refundid'>
            {{$t('lang.refund.text29')}}:
            <span v-if="pageInfo.comment">{{pageInfo.comment}}</span>
            <span v-if="!pageInfo.comment">{{$t('lang.refund.text30')}}</span>
          </p>
        </div>
        <!-- 摘要 -->
        <div class="Abstract" v-loading="AbstractVisible">
          <p class="title">{{$t('lang.refund.text9')}}</p>
          <div class="subtotal sp-between">
            <span>{{$t('lang.refund.text10')}}</span>
            <span>${{RefundMoneyInfo.subtotal}}</span>
            <span class="good-number">{{RefundMoneyInfo.goodsnum}} {{$t('lang.refund.text11')}}</span>
          </div>
          <div class="sp-between discount" v-show="RefundMoneyInfo.discount_code">
            <span>{{$t('lang.refund.text22')}}</span>
            <span>{{RefundMoneyInfo.discount_code}}</span>
          </div>
          <div class="sp-between discount">
            <span>{{$t('lang.refund.text23')}}</span>
            <span>-{{RefundMoneyInfo.discount_amount}}</span>
          </div>
          <div class="Taxes-fees sp-between">
            <span>{{$t('lang.refund.text12')}}</span>
            <span>${{RefundMoneyInfo.taxes}}</span>
          </div>
          <div class="delivery sp-between">
            <span>{{$t('lang.refund.text13')}}</span>
            <span>${{informationAboutMoney.refundFreight}}</span>
          </div>
          <div class="total-amount sp-between">
            <span>{{$t('lang.refund.text14')}}</span>
            <span
              v-if="informationAboutMoney.refundFreight"
            >${{parseFloat(RefundMoneyInfo.refundsum,2)+parseFloat(informationAboutMoney.refundFreight,2)}}</span>
          </div>
        </div>
        <!-- 退款 -->
        <div class="refund-good">
          <div class="refund-good-top clearfix">
            <div class="c-input-ultimatelyRefundMoney">
              <p class="text">{{$t('lang.refund.text15')}}</p>
              <el-form-item prop="ultimatelyRefundMoney">
                <el-input
                  :placeholder="'$0.00'"
                  v-model="informationAboutMoney.ultimatelyRefundMoney"
                />
              </el-form-item>
            </div>
            <p class="canbe-refund">{{$t('lang.refund.text16')}}${{pageInfo.totalprice}}</p>
          </div>
          <div class="refund-good-btm clearfix">
            <span>{{$t('lang.refund.text17')}}</span>
            &nbsp;&nbsp;
            <el-checkbox v-model="emailNotify" />
            <el-button
              class="refund-btn"
              v-show="informationAboutMoney.ultimatelyRefundMoney"
              type="primary"
              @click="refund"
            >{{`${$t('lang.refund.text18')}$${informationAboutMoney.ultimatelyRefundMoney}`}}</el-button>
            <el-button
              class="refund-btn"
              v-show="!informationAboutMoney.ultimatelyRefundMoney"
              type="primary"
              @click="refund"
            >{{$t('lang.refund.text18')}}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/administratorPanel/counter'
import { mapMutations } from 'vuex'
import {
  getRefundPageInfo,
  getRefundMoneyInfo,
  submitRefund
} from '../../../../common/api/api'
import messageAlert from '@/utils/messageAlert'
export default {
  components: {
    Counter
  },
  data () {
    const checkRefundFreight = (rule, value, callback) => {
      // 退还运费的最大值验证
      if (isNaN(parseFloat(value))) {
        callback(new Error(this.$t('lang.refund.text24')))
      }
      if (
        parseInt(value) >
        parseInt(this.pageInfo.freight) - parseInt(this.pageInfo.refund_freight)
      ) {
        callback(new Error(this.$t('lang.refund.text25')))
      } else {
        callback()
      }
    }
    const checkUltimatelyRefundMoney = (rule, value, callback) => {
      // 退还运费的最大值验证
      if (isNaN(parseFloat(value))) {
        callback(new Error(this.$t('lang.refund.text26')))
      }
      if (parseInt(value) > parseInt(this.pageInfo.totalprice)) {
        callback(new Error(this.$t('lang.refund.text27')))
      } else {
        callback()
      }
    }
    return {
      rule: {
        refundFreight: [
          { required: true, message: this.$t('lang.refund.text28'), trigger: 'blur' },
          { validator: checkRefundFreight, trigger: 'blur' }
        ],
        ultimatelyRefundMoney: [
          { required: true, message: this.$t('lang.refund.text28'), trigger: 'blur' },
          { validator: checkUltimatelyRefundMoney, trigger: 'blur' }
        ]
      },
      // 变量
      informationAboutMoney: {
        refundFreight: null, // 退款运费
        ultimatelyRefundMoney: null // 最终退款金额
      },
      choosedNotShipedNumber: 0,
      choosedShipedNumber: 0,
      deliveryWarehouses: null,
      deliveryWarehouse: null,
      locationId: null,
      refundReason: '',
      emailNotify: true,
      timer: null,
      // data
      pageInfo: null,
      ordergoodsForCheckMoney: [], // 查看摘要要求传的数据格式 [id-数量的格式]
      ordergoodsForSubmit: { shiped: [], notshiped: [] }, // 提交时候后端要求格式难以理解
      RefundMoneyInfo: {}, // 摘要处退款商品的金额信息
      // ui
      AbstractVisible: true
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
        clearTimeout(this.timer)
        this.AbstractVisible = true
        this.timer = setTimeout(() => {
          getRefundMoneyInfo({ ordergoods: this.ordergoodsForCheckMoney }).then(
            res => {
              this.AbstractVisible = false
              console.log(res)
              this.RefundMoneyInfo = res.data.data
            }
          )
        }, 1500)
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['forRightLoadingVisible']),
    back () {
      this.$router.go(-1)
    },
    refund () {
      console.log(this.$refs.ultimatelyRefundMoney)
      this.$refs['refundForm'].validate(valid => {
        if (valid) {
          submitRefund({
            orderid: this.$route.query.orderid,
            amount: this.informationAboutMoney.ultimatelyRefundMoney,
            reason: this.refundReason,
            refundid: this.pageInfo.refundid,
            freight: this.informationAboutMoney.refundFreight,
            ordergoods: this.ordergoodsForSubmit,
            locateid: this.deliveryWarehouse
          }).then(res => {
            console.log(res)
            messageAlert(res)
            if (res.data.code === 1) {
              setTimeout(() => {
                this.$router.push({
                  path: '/administratorPanel/orderManagement/orderDetails',
                  query: { orderid: this.$route.query.orderid }
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
    getRefundPageInfo({ orderid: this.$route.query.orderid }).then(res => {
      this.forRightLoadingVisible(false)
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
  padding-top: 32px;
  padding-bottom: 32px;
  .content-refund {
    .top {
      margin-bottom: 25px;
      padding-right: 15px;
      .icon-fanhui1 {
        font-size: 20px;
        margin-right: 15px;
        margin-left: 5px;
        cursor: pointer;
      }
      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-right: 16px;
      }
      .order-number {
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-right: 16px;
      }
      .back {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .c-good-info {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      padding-bottom: 54px;
      margin-bottom: 18px;
      .c-status {
        padding-top: 33px;
        margin-bottom: 21px;
        padding-left: 29px;
        .yellow-circle {
          width: 10px;
          height: 10px;
          background: rgba(255, 203, 61, 1);
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
        .blue-circle {
          width: 10px;
          height: 10px;
          background: rgba(66, 103, 178, 1);
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
        .status {
          font-size: 18px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
      }
      .delivery-information {
        font-size: 16px;
        color: #637381;
        margin-top: 20px;
      }
      .good {
        background: rgba(252, 252, 252, 1);
        border: 1px solid rgba(239, 239, 239, 1);
        border-radius: 4px;
        margin: auto;
        padding-top: 45px;
        padding-bottom: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 60%;
        }
        img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .info {
          p {
            margin-bottom: 13px;
            max-width: 100%;
            word-break: break-all;
          }
          .title {
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .detail {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
          .money {
            font-size: 14px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .if-rePutInStorage {
        padding-left: 30px;
        font-size: 16px;
        padding-top: 20px;
        border-top: 1px solid #eeeeee;
        word-spacing: 2px;
        letter-spacing: 2px;
      }
      .c-replenishment {
        padding-left: 30px;
        font-size: 16px;
        padding-top: 20px;
        border-top: 1px solid #eeeeee;
        margin-top: 20px;
        word-spacing: 2px;
        letter-spacing: 2px;
        .title {
          margin-bottom: 20px;
        }
      }
    }
    .refund-freight {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      padding: 30px 15px 30px 15px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 19px;
      .text {
        float: left;
        margin-bottom: 24px;
        margin-right: 20px;
      }
      .c-input-freight {
        /deep/ .el-form-item__content {
          display: inline-block;
        }
        /deep/ .el-input {
          width: 330px;
        }
        /deep/ .el-input__inner {
          padding-left: 17px;
          height: 58px;
        }
      }
      .title {
        margin-bottom: 30px;
      }
      .max {
        margin-bottom: 34px;
      }
    }
    .refund-reason {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 30px;
      padding-bottom: 30px;
      margin-bottom: 23px;
      p {
        margin-bottom: 15px;
        line-height: 30px;
        font-weight: bold;
        span {
          font-weight: 400;
        }
      }
      /deep/ .el-input {
      }
      /deep/ .el-input__inner {
        padding-left: 17px;
        height: 58px;
      }
    }
    .Abstract {
      padding: 29px 15px 31px 15px;
      margin-bottom: 15px;
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 20px;
      }
      .subtotal {
        margin-bottom: 63px;
        position: relative;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        .good-number {
          position: absolute;
          top: 29px;
          left: 0;
          font-size: 16px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .discount {
        margin-bottom: 37px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .Taxes-fees {
        margin-bottom: 37px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .delivery {
        margin-bottom: 37px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .total-amount {
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .sp-between {
        display: flex;
        justify-content: space-between;
      }
    }
    .refund-good {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      padding: 29px 15px 31px 15px;
      .refund-good-top {
        .c-input-ultimatelyRefundMoney {
          /deep/ .el-form-item__content {
            display: inline-block;
            width: 100%;
          }
          /deep/ .el-input {
          }
          /deep/ .el-input__inner {
            padding-left: 17px;
            height: 58px;
          }
        }
        .text {
          margin-bottom: 20px;
          margin-right: 20px;
          font-size: 16px;
        }
        .canbe-refund {
          font-size: 16px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-top: 26px;
          margin-bottom: 55px;
        }
      }
      .refund-good-btm {
        .refund-btn {
          float: right;
          position: relative;
          top: -8px;
        }
      }
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

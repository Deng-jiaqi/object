<template>
  <div class="c-rePutInStorage" v-if="pageInfo">
    <div class="content-rePutInStorage">
      <!-- top -->
      <div class="top">
        <div class="left">
          <span class="title">{{$t('lang.reputInStorage.text1')}}</span>
          <span class="order-number">{{pageInfo.ordernum}}</span>
        </div>
        <div class="right" @click="back"><span class="iconfont icon-fanhui1"></span>{{$t('lang.reputInStorage.text2')}}</div>
      </div>
      <!-- 未发货商品信息 -->
      <div class="c-good-info" v-if="pageInfo.notshiped">
        <div class="c-status">
          <span class="yellow-circle"></span>
          <span class="status">{{pageInfo.notshiped.head}}</span>
        </div>
        <div class="good clearfix" v-for="(item,index) in pageInfo.notshiped.info" :key="index">
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
        <div
          class="if-rePutInStorage"
          v-if="choosedNotShipedNumber"
        >{{$t('lang.reputInStorage.text3')}} {{choosedNotShipedNumber}} {{$t('lang.reputInStorage.text4')}}</div>
      </div>
      <!-- 已发货商品信息 -->
      <div class="c-good-info" v-if="pageInfo.shiped">
        <div v-for="(item,idx) in pageInfo.shiped" :key="idx">
          <div class="c-status">
            <span class="blue-circle"></span>
            <span class="status">{{item.head}}</span>
            <p class="delivery-information">{{item.deliver_method}}: {{item.deliver_order}}</p>
          </div>
          <div class="good clearfix" v-for="(itemTwo,indexTwo) in item.info" :key="indexTwo">
            <img :src="itemTwo.img" alt />
            <div class="info">
              <p class="title">{{itemTwo.goodsname}}</p>
              <p
                class="detail"
                v-for="(itemThree,indexThree) in itemTwo.attr"
                :key="indexThree"
              >{{itemThree.attr_name}}: {{itemThree.attr_value}}</p>
            </div>
            <Counter v-model="itemTwo.number" />
            <span class="money">${{itemTwo.price}} x {{itemTwo.number}}</span>
          </div>
        </div>
        <div class="c-replenishment" v-show="choosedShipedNumber">
          <p class="title">{{$t('lang.reputInStorage.text11')}} {{choosedShipedNumber}} {{$t('lang.reputInStorage.text12')}}:</p>
          <el-select v-model="deliveryWarehouse" placeholder="$t('lang.reputInStorage.text13')">
            <el-option
              v-for="item in deliveryWarehouses"
              :key="item.Id"
              :label="item.name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 退款-原因 -->
      <div class="refund-reason">
        <p class="title">{{$t('lang.reputInStorage.text5')}}</p>
        <el-input v-model="refundReason" />
      </div>
      <!-- 重新入库 -->
      <div class="determine-box">
        <div class="money">
          <span class="text1">{{$t('lang.reputInStorage.text6')}}</span>
          <span class="text2">{{$t('lang.reputInStorage.text7')}}：${{pageInfo.totalprice}}</span>
        </div>
        <p class="instructions">{{$t('lang.reputInStorage.text8')}}</p>
        <div class="determine-box-btm clearfix">
          <el-button class="determine-btn" type="primary" @click="determineReputInStorage">{{$t('lang.reputInStorage.text10')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/administratorPanel/counter'
import {
  getReputInStoragePageInfo,
  submitReputInStorage
} from '../../../../common/api/api'
import messageAlert from '@/utils/messageAlert'
import { mapMutations } from 'vuex'
export default {
  components: {
    Counter
  },
  data () {
    return {
      // 变量
      refundReason: '',
      choosedNotShipedNumber: 0,
      choosedShipedNumber: 0,
      deliveryWarehouses: null,
      deliveryWarehouse: null,
      // data
      pageInfo: null,
      ordergoods: { shiped: [], notshiped: [] } // 确定重新入库商品的数组 id-数量 [1-1,2-2....]
    }
  },
  watch: {
    pageInfo: {
      handler: function (newVal, oldVal) {
        this.ordergoods = { shiped: [], notshiped: [] }
        if (newVal.notshiped) {
          this.choosedNotShipedNumber = 0
          newVal.notshiped.info.forEach(item => {
            this.ordergoods.notshiped.push(`${item.ordergid}-${item.number}`)
            this.choosedNotShipedNumber += parseInt(item.number, 0)
          })
        }
        if (newVal.shiped) {
          this.choosedShipedNumber = 0
          newVal.shiped.forEach(item => {
            item.info.forEach(itemTwo => {
              this.ordergoods.shiped.push(
                `${itemTwo.ordergid}-${itemTwo.number}-${itemTwo.Id}`
              )
              this.choosedShipedNumber += parseInt(itemTwo.number, 0)
            })
          })
        }
      },
      deep: true
    }
  },
  computed: {
    orderid () {
      return this.$route.query.orderid
    }
  },
  methods: {
    ...mapMutations(['forRightLoadingVisible']),
    back () {
      this.$router.go(-1)
    },
    determineReputInStorage () {
      submitReputInStorage({
        orderid: this.orderid,
        reason: this.refundReason,
        ordergoods: this.ordergoods,
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
  },
  created () {
    this.forRightLoadingVisible(true)
    getReputInStoragePageInfo({
      orderid: this.orderid
    }).then(res => {
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
.c-rePutInStorage {
  max-width: 772px;
  margin: auto;
  padding-top: 84px;
  padding-bottom: 104px;
  .content-rePutInStorage {
    .top {
      margin-bottom: 26px;
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
      margin-bottom: 15px;
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
          width: 270px;
          margin-right: 30px;
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
      .if-rePutInStorage {
        padding-left: 30px;
        font-size: 16px;
        padding-top: 20px;
        border-top: 1px solid #eeeeee;
        margin-top: 20px;
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
    .refund-reason {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      padding-left: 36px;
      padding-top: 59px;
      padding-bottom: 49px;
      margin-bottom: 14px;
      .title {
        margin-bottom: 10px;
      }
      /deep/ .el-input {
        width: 601px;
      }
      /deep/ .el-input__inner {
        height: 54px;
      }
    }
    .determine-box {
      padding-left: 37px;
      padding-top: 51px;
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding-bottom: 48px;
      .money {
        margin-bottom: 38px;
        .text1 {
          font-size: 16px;
          margin-right: 20px;
          color: rgba(0, 0, 0, 1);
        }
        .text2 {
          font-size: 16px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
      .instructions {
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 50px;
      }
      .determine-box-btm {
        padding-right: 26px;
        text-align: right;
        .determine-btn {
          font-size: 18px;
          height: 51px;
        }
      }
    }
  }
}
</style>

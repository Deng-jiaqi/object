<template>
  <div class="c-rePutInStorage" v-if="pageInfo">
    <!-- top -->
    <div class="top">
      <span class="title">重新入库</span>
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
      <!-- 退款-原因 -->
      <div class="box box-refund-reason">
        <p class="title">退款原因</p>
        <el-input v-model="refundReason" />
      </div>
      <!-- 重新入库 -->
      <div class="box box-determine-info">
        <p class="text1">授权金额</p>
        <p class="text2">尚未入账：${{pageInfo.totalprice}}</p>
        <p class="text3">已重新入库的商品将不可再发货。</p>
        <div class="c-email-notify">
          <EdgCheckbox v-model="emailNotify" />&nbsp;&nbsp;
          <span class="text1">邮件通知客户</span>
          <!-- <edgButton
            class="determine-btn"
            :type="'primary'"
            :text="'重新入库商品'"
            @click.native="determineReputInStorage"
          />-->
        </div>
      </div>
      <div class="btn-determine" @click="determineReputInStorage">重新入库商品</div>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/administratorPanel/counter'
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
import {
  getReputInStoragePageInfo,
  submitReputInStorage
} from '../../../../common/api/api'
export default {
  components: {
    Counter,
    EdgCheckbox
  },
  data () {
    return {
      // 变量
      refundReason: '',
      emailNotify: true,
      choosedNotShipedNumber: 0,
      choosedShipedNumber: 0,
      deliveryWarehouses: null,
      deliveryWarehouse: null,
      timer: null,
      // data
      pageInfo: {},
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
    back () {
      this.$router.go(-1)
    },
    determineReputInStorage () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        submitReputInStorage({
          orderid: this.orderid,
          reason: this.refundReason,
          ordergoods: this.ordergoods,
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
      }, 1000)
    }
  },
  created () {
    getReputInStoragePageInfo({
      orderid: this.orderid
    }).then(res => {
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
    .box-determine-info {
      p {
        margin-bottom: 22px;
      }
      .text1 {
        color: rgba(51, 51, 51, 1);
      }
      .text2 {
        font-size: 20px;
        color: rgba(102, 102, 102, 1);
      }
      .text3 {
        font-size: 20px;
        color: rgba(102, 102, 102, 1);
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
        border-color: #385ca5;
      }
      /deep/ .el-select .el-input__inner:focus {
        border-color: #385ca5;
      }
      /deep/ .el-select .el-input__inner:hover {
        border-color: #385ca5;
      }
      .el-select-dropdown__item.selected {
        color: #385ca5;
      }
      /deep/ .el-input__inner {
        font-size: 14px;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        border: 1px solid #959595;
        border-radius: 4px;
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
    /deep/ .el-input {
      width: 601px;
    }
    /deep/ .el-input__inner {
      background: #fff;
      border: 1px solid rgba(149, 149, 149, 1);
      border-radius: 4px;
      outline: rgba(56, 92, 165, 1);
      padding-left: 17px;
      height: 54px;
    }
    /deep/ .el-input__inner:focus {
      border: 1px solid rgba(56, 92, 165, 1);
    }
    /deep/ .el-input__inner:hover {
      border-color: rgba(56, 92, 165, 1);
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
      .text1 {
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
      }
      .determine-btn {
        float: right;
        font-size: 18px;
        height: 51px;
        position: relative;
        top: -8px;
      }
      .determine-btn:hover {
        cursor: pointer;
      }
    }
  }
}
p {
  margin: 0;
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
</style>

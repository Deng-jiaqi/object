<template>
  <div class="c-delivery" v-if="pageInfo">
    <div class="top">
      <span class="title">发货</span>
      <span class="order-number">{{pageInfo.headinfo.ordernum}}</span>
    </div>
    <div class="c-boxs">
      <!-- 手动发货框 -->
      <div class="box box-delivery">
        <div class="good" v-for="(item,index) in goodsinfo" :key="index">
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
          <div class="c-weight">
            <span class="title">重量</span>
            <span>{{item.weight}} kg</span>
          </div>
          <div class="c-number">
            <span>购买数量</span>
            <Counter v-model="item.number" />
          </div>
        </div>
        <div class="c-select-couriers">
          <p class="title">选择快递</p>
          <el-select v-model="courier" :placeholder="'选择快递'" class="select-couriers">
            <el-option
              v-for="item in couriers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="c-input-awb">
          <p class="title">运单号</p>
          <el-input v-model="delivernum" class="input-awb" />
        </div>
        <div class="c-email-notify">
          <EdgCheckbox v-model="EmailNotify" class="email-notify" />
          <span class="title">邮件通知客户</span>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="box box-shipping-adress">
        <div class="box-shipping-adress-top">
          <span class="title">收货地址</span>
          <span class="editor" @click="openShippingModalWindow">编辑</span>
        </div>
        <div
          class="adress"
          v-if="pageInfo.shipping_address"
        >{{pageInfo.shipping_address.name}},{{pageInfo.shipping_address.phone}},{{pageInfo.shipping_address.address}},{{pageInfo.shipping_address.city}},{{pageInfo.shipping_address.country}},{{pageInfo.shipping_address.zipcode}}</div>
      </div>
      <!-- 发货地址 -->
      <div class="box box-delivery-adress">
        <div class="delivery-adress-top">
          <span class="title">发货地址</span>
          <el-select v-model="deliveryWarehouse" placeholder="请选择">
            <el-option
              v-for="item in pageInfo.delivery_address"
              :key="item.Id"
              :label="item.name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="btn-determine" @click="determineDelivery">确定发货</div>
    </div>
    <!-- 编辑收货地址模态窗 -->
    <AddressModalWindow :orderid="orderid" :title="'编辑收货地址'" ref="shippingModalWindow" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
import Counter from '@/components/administratorPanel/counter'
import AddressModalWindow from '@/components/administratorPanel/addressModalWindow'
import { getDeliveryPageInfo, submitDeliveryInfo } from '@/common/api/api'
export default {
  components: {
    EdgCheckbox,
    Counter,
    AddressModalWindow
  },
  data () {
    return {
      //   变量
      q: null,
      deliveryWarehouse: null,
      EmailNotify: true,
      courier: null,
      timer: null,
      goodsinfo: [], // 每个仓库的商品信息
      ordergoods: [], // 发货 id-数量组成的数组
      delivernum: null, // 运单号
      // data
      couriers: [
        {
          value: '顺丰',
          label: '顺丰'
        },
        {
          value: '邮政',
          label: '邮政'
        },
        {
          value: '和大家',
          label: '和大家'
        },
        {
          value: '打打',
          label: '打打'
        }
      ],
      pageInfo: null
    }
  },
  watch: {
    editReceivingAndShippingInformation: {
      handler (val) {
        if (val === 1) {
          getDeliveryPageInfo({ orderid: this.$route.query.orderid }).then(
            res => {
              console.log(res)
              this.pageInfo = res.data.data
            }
          )
        }
      }
    },
    deliveryWarehouse: {
      handler (val) {
        this.ajax
          .post('/Shop/public/index.php/Order/Allorder/showlocation', {
            locateid: this.deliveryWarehouse,
            orderid: this.orderid
          })
          .then(res => {
            console.log(res)
            this.goodsinfo = res.data.data
          })
      }
    }
  },
  computed: {
    ...mapState(['editReceivingAndShippingInformation']),
    orderid () {
      // 订单id
      return this.$route.query.orderid
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    openShippingModalWindow () {
      this.$refs.shippingModalWindow.addressModalWindowVisible = true
    },
    determineDelivery () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        console.log(this.pageInfo.goodsinfo)
        this.ordergoods = []
        this.goodsinfo.forEach(item => {
          this.ordergoods.push(`${item.ordergid}-${item.number}`)
        })
        console.log(this.ordergoods)
        submitDeliveryInfo({
          orderid: this.$route.query.orderid,
          delivernum: this.delivernum,
          deliver_method: this.courier,
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
    getDeliveryPageInfo({ orderid: this.$route.query.orderid }).then(res => {
      console.log(res)
      this.pageInfo = res.data.data
      this.deliveryWarehouse = this.pageInfo.delivery_address[0].Id
      console.log(this.deliveryWarehouse)
    })
  }
}
</script>
<style lang="less" scoped>
.c-delivery {
  height: calc(100vh - 78px);
  background-color: rgba(242, 242, 242, 1);
  overflow-y: auto;
  .top {
    padding-left: 22px;
    background-color: #fff;
    .title {
      margin-right: 22px;
      font-size: 26px;
      line-height: 76px;
    }
    .order-number {
      font-size: 22px;
      line-height: 76px;
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
    .box-delivery {
      .good {
        padding-bottom: 28px;
        border-bottom: 2px solid rgba(238, 238, 238, 1);
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
        .c-weight {
          display: flex;
          justify-content: space-between;
          padding-right: 34px;
          margin-top: 49px;
          margin-bottom: 28px;
          .title {
            letter-spacing: 40px;
          }
        }
        .c-number {
          display: flex;
          justify-content: space-between;
        }
      }
      .good:first-child {
        margin-top: 0;
      }
      .c-select-couriers {
        margin-bottom: 36px;
        margin-top: 28px;
        .title {
          font-size: 22px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 24px;
        }
        .select-couriers {
          width: 100%;
          height: 56px;
        }
        /deep/ .el-input {
          width: 100%;
        }
        // select样式修改
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
        .el-select-dropdown__item {
          font-size: 22px;
        }
        .el-select-dropdown__item.selected {
          color: rgba(0, 159, 255, 1);
        }
        /deep/ .el-input__inner {
          height: 56px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          border: 1px solid #959595;
          border-radius: 4px;
        }
      }
      .c-input-awb {
        margin-bottom: 24px;
        .title {
          font-size: 22px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 24px;
        }
        // input样式修改
        /deep/ .el-input {
          width: 100%;
        }
        /deep/ .el-input__inner {
          background: #fff;
          border: 1px solid rgba(149, 149, 149, 1);
          border-radius: 4px;
          outline: rgba(0, 159, 255, 1);
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
      .c-email-notify {
        .email-notify {
          margin-right: 30px;
        }
      }
    }
    .box-shipping-adress {
      margin-top: 24px;
      .box-shipping-adress-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 31px;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .editor {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 159, 255, 1);
          cursor: pointer;
        }
      }
    }
    .box-delivery-adress {
      position: relative;
      margin-top: 24px;
      .delivery-adress-top {
        margin-bottom: 31px;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 20px;
        }
      }
      // select样式修改
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
      .el-select-dropdown__item {
        font-size: 22px;
      }
      .el-select-dropdown__item.selected {
        color: rgba(0, 159, 255, 1);
      }
      /deep/ .el-input__inner {
        height: 56px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        border: 1px solid #959595;
        border-radius: 4px;
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
.clearfix:after {
  display: block;
  clear: both;
  content: "";
}
p {
  margin: 0;
}
</style>

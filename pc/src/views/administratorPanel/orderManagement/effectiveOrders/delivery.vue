<template>
  <div class="c-delivery" v-if="pageInfo">
    <div class="content-delivery">
      <!-- top -->
      <div class="top">
        <div class="left">
          <span class="title">{{$t('lang.delivery.text1')}}</span>
          <span class="order-number">{{pageInfo.headinfo.ordernum}}</span>
        </div>
        <div class="right" @click="back">
          <span class="iconfont icon-fanhui1"></span>
          {{$t('lang.delivery.text2')}}
        </div>
      </div>
      <!-- 手动发货框 -->
      <div class="box-delivery">
        <p class="title">{{$t('lang.delivery.text3')}}</p>
        <div class="c-info">
          <div class="c-title">
            <span class="title-one">{{$t('lang.delivery.text4')}}</span>
            <span class="title-two">{{$t('lang.delivery.text5')}}</span>
            <span class="title-three">{{$t('lang.delivery.text6')}}</span>
          </div>
          <div class="line-top"></div>
          <div
            class="no-goods"
            v-loading="goodsVisible"
            v-show="!goodsinfo.length>0"
          >{{$t('lang.delivery.text16')}}</div>
          <div
            class="info-box"
            v-loading="goodsVisible"
            v-for="(item,index) in goodsinfo"
            :key="index"
          >
            <div class="good">
              <div class="content-one">
                <img :src="item.img" alt />
                <div class="info">
                  <p class="good-title">{{item.goodsname}}</p>
                  <p
                    class="detail"
                    v-for="(itemTwo,indexTwo) in item.attr"
                    :key="indexTwo"
                  >{{itemTwo.attr_name}}: {{itemTwo.attr_value}}</p>
                </div>
              </div>
              <div class="content-two">
                <span class="good-weight">{{item.weight}}{{item.unitid}}</span>
              </div>
              <div class="content-three">
                <Counter v-model="item.number" />
              </div>
            </div>
          </div>
          <div class="line-bottom"></div>
        </div>
        <div class="c-express clearfix">
          <div class="c-select-couriers">
            <span class="text1">{{$t('lang.delivery.text7')}}</span>
            <el-select
              v-model.number="courier"
              :placeholder="$t('lang.delivery.text8')"
              class="select-couriers"
            >
              <el-option
                v-for="item in $i18n.locale==='zh-cn'?couriersZh:couriersEn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="c-input-awb">
            <el-form :model="delivernum" ref="form_delivery" :rules="rule_delivery">
              <span class="text2">{{$t('lang.delivery.text9')}}</span>
              <!-- <input class="input-awb"> -->
              <el-form-item prop="delivernum">
                <el-input v-model="delivernum.delivernum" class="input-awb" />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="c-email-notify">
          <span class="modify-text">{{$t('lang.delivery.text10')}}</span>
          <el-checkbox v-model="emailNotify" class="email-notify"></el-checkbox>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="c-shipping-adress">
        <div class="shipping-adress-top">
          <span class="title">{{$t('lang.delivery.text11')}}</span>
          <span class="editor" @click="openShippingModalWindow">{{$t('lang.delivery.text12')}}</span>
        </div>
        <div
          class="adress"
        >{{pageInfo.shipping_address.firstname}} {{pageInfo.shipping_address.lastname}},{{pageInfo.shipping_address.phone}},{{pageInfo.shipping_address.address}},{{pageInfo.shipping_address.city}},{{pageInfo.shipping_address.province}},{{pageInfo.shipping_address.country}},{{pageInfo.shipping_address.zipcode}}</div>
      </div>
      <!-- 发货地址 -->
      <div class="c-delivery-adress">
        <div class="delivery-adress-top">
          <span class="title">{{$t('lang.delivery.text14')}}</span>
          <el-select v-model="deliveryWarehouse" placeholder="请选择">
            <el-option
              v-for="item in pageInfo.delivery_address"
              :key="item.Id"
              :label="item.name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </div>
        <!-- <div class="adress">{{pageInfo.delivery_address}}</div>
        <div class="adress" v-if="!pageInfo.delivery_address">暂无地址</div>-->
        <el-button
          class="btn"
          type="primary"
          @click="determineDelivery"
        >{{$t('lang.delivery.text15')}}</el-button>
      </div>
    </div>
    <!-- 编辑收货地址模态窗 -->
    <AddressModalWindow
      @addressEdit="addressEditSuccess"
      :addressData="pageInfo.shipping_address"
      :orderid="orderid"
      :title="$t('lang.delivery.text13')"
      ref="shippingModalWindow"
    />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Counter from '@/components/administratorPanel/counter'
import AddressModalWindow from '@/components/administratorPanel/addressModalWindow'
import messageAlert from '@/utils/messageAlert'
import { deliverNumberValidator } from '@/common/validator'
import {
  getDeliveryPageInfo,
  submitDeliveryInfo,
  showlocationOfDelivery
} from '@/common/api/api'

export default {
  components: {
    Counter,
    AddressModalWindow
  },
  data () {
    return {
      rule_delivery: {
        delivernum: [
          {
            validator: deliverNumberValidator,
            trigger: 'blur'
          }
        ]
      },
      // 变量
      deliveryWarehouse: null,
      emailNotify: true,
      courier: 1,
      goodsinfo: [], // 每个仓库的商品信息
      ordergoods: [], // 发货 id-数量组成的数组
      delivernum: {
        delivernum: null
      }, // 运单号
      // data
      couriersZh: [
        {
          value: 1,
          label: '顺丰'
        },
        {
          value: 2,
          label: '邮政'
        }
      ],
      couriersEn: [
        {
          value: 1,
          label: 'Suitable abundant'
        },
        {
          value: 2,
          label: 'The postal'
        }
      ],
      pageInfo: null,
      // ui
      goodsVisible: true
    }
  },
  watch: {
    deliveryWarehouse: {
      handler (val) {
        this.goodsVisible = true
        showlocationOfDelivery({
          locateid: this.deliveryWarehouse,
          orderid: this.orderid
        }).then(res => {
          this.goodsVisible = false
          console.log(res)
          this.goodsinfo = res.data.data
        })
      }
    }
  },
  computed: {
    orderid () {
      // 订单id
      return this.$route.query.orderid
    }
  },
  methods: {
    ...mapMutations(['forRightLoadingVisible']),
    addressEditSuccess (newInfo) {
      this.pageInfo.client = newInfo.client
      this.pageInfo.shipping_address.firstname = newInfo.shipping_address.firstname
      this.pageInfo.shipping_address.lastname = newInfo.shipping_address.lastname
      this.pageInfo.shipping_address.address = newInfo.shipping_address.address
      this.pageInfo.shipping_address.city = newInfo.shipping_address.city
      this.pageInfo.shipping_address.country = newInfo.shipping_address.country
      this.pageInfo.shipping_address.phone = newInfo.shipping_address.phone
      this.pageInfo.shipping_address.province = newInfo.shipping_address.province
      this.pageInfo.shipping_address.zipcode = newInfo.shipping_address.zipcode
    },
    back () {
      this.$router.go(-1)
    },
    openShippingModalWindow () {
      this.$refs.shippingModalWindow.addressModalWindowVisible = true
    },
    determineDelivery () {
      this.$refs['form_delivery'].validate((valid) => {
        if (valid) {
          this.ordergoods = []
          this.goodsinfo.forEach(item => {
            this.ordergoods.push(`${item.ordergid}-${item.number}`)
          })
          submitDeliveryInfo({
            orderid: this.$route.query.orderid,
            delivernum: this.delivernum.delivernum,
            deliver_method: this.courier,
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
      })
    }
  },
  created () {
    this.forRightLoadingVisible(true)
    getDeliveryPageInfo({ orderid: this.$route.query.orderid }).then(res => {
      this.forRightLoadingVisible(false)
      console.log(res)
      this.pageInfo = res.data.data
      this.deliveryWarehouse = this.pageInfo.delivery_address[0].Id
    })
  }
}
</script>
<style lang="less" scoped>
.c-delivery {
  max-width: 772px;
  margin: auto;
  padding-top: 75px;
  padding-bottom: 147px;
  .content-delivery {
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
    .box-delivery {
      padding-top: 37px;
      padding-bottom: 77px;
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 25px;
      .title {
        font-size: 24px;
        padding-left: 37px;
        margin-bottom: 72px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .no-goods {
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: #fcfcfc;
        border: 1px solid #efefef;
        border-radius: 4px;
        font-size: 18px;
        font-weight: bold;
        margin: auto;
        margin-bottom: 66px;
      }
      .c-info {
        margin-bottom: 66px;
        .c-title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding-bottom: 13px;
          .title-one {
            width: calc(49.5% - 101px);
            display: inline-block;
            padding-left: 101px;
          }
          .title-two {
            display: inline-block;
            width: calc(29.8% + 40px);
          }
          .title-three {
          }
        }
        .line-top {
          width: calc(100% - 34px);
          height: 2px;
          background: rgba(238, 238, 238, 1);
          margin-left: 34px;
          margin-bottom: 26px;
        }
        .info-box {
          background: rgba(252, 252, 252, 1);
          border: 1px solid rgba(239, 239, 239, 1);
          border-radius: 4px;
          margin: auto;
          margin-bottom: 50px;
          .good {
            background: rgba(252, 252, 252, 1);
            border: 1px solid rgba(239, 239, 239, 1);
            border-radius: 4px;
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
            .content-one {
              display: flex;
              justify-content: flex-start;
              width: 50%;
              img {
                width: 80px;
                height: 80px;
                margin-left: 24px;
                margin-right: 20px;
              }
              .info {
                flex-grow: 1;
                p {
                  margin-bottom: 13px;
                }
                p:last-child {
                  margin-bottom: 0;
                }
                .good-title {
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
            }
            .content-two {
              width: 29.8%;
              .good-weight {
                font-size: 16px;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
              }
            }
          }
        }
        .line-bottom {
          width: calc(100% - 34px);
          height: 2px;
          background: rgba(238, 238, 238, 1);
          margin-right: 34px;
          margin-bottom: 26px;
        }
      }
      .c-express {
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        padding-left: 34px;
        padding-right: 34px;
        .c-select-couriers {
          float: left;
          width: 300px;
          .text1 {
            margin-bottom: 10px;
            display: block;
          }
          .select-couriers {
            width: 300px;
          }
        }

        .c-input-awb {
          float: right;
          width: 300px;
          .input-awb {
            width: 300px !important;
          }
          .text2 {
            margin-bottom: 10px;
            display: block;
          }
        }
        // input样式修改
        /deep/ .el-input__inner {
          height: 56px;
        }
      }
      .c-email-notify {
        margin-top: 20px;
        padding-left: 34px;
        .modify-text {
          margin-right: 7px;
        }
      }
    }
    .c-shipping-adress {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 24px;
      padding: 30px 25px 39px 40px;
      .shipping-adress-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 31px;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .editor {
          font-size: 16px;
          font-weight: 400;
          color: rgba(66, 103, 178, 1);
        }
        .editor:hover {
          cursor: pointer;
        }
      }
      .adress {
        word-break: break-all;
        word-wrap: break-word;
      }
    }
    .c-delivery-adress {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding: 30px 25px 39px 40px;
      position: relative;
      .delivery-adress-top {
        margin-bottom: 31px;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 20px;
        }
      }
      .btn {
        position: absolute;
        right: 23px;
        bottom: 17px;
        height: 51px;
      }
      .btn:hover {
        cursor: pointer;
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

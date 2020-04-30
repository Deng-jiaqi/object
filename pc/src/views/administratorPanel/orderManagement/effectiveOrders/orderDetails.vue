<template>
  <div class="c-orderDetails" v-if="pageInfo">
    <div class="content-orderDetails">
      <div class="top">
        <span class="title">{{$t('lang.orderDetails.text1')}}</span>
        <span class="order-number">{{pageInfo.headinfo.ordernum}}</span>
        <span class="time">{{pageInfo.headinfo.createtime}}</span>
      </div>
      <div class="c-operation">
        <div class="c-left">
          <div class="font print-order" @click="printOrder">{{$t('lang.orderDetails.text2')}}</div>
          <!-- 退款 -->
          <div
            class="font refund"
            v-show="pageInfo.order_status.pay_status===1||pageInfo.order_status.pay_status===4||pageInfo.order_status.pay_status===5"
            @click="toRefund"
          >{{$t('lang.orderDetails.text3')}}</div>
          <div
            class="font reputin"
            v-show="pageInfo.order_status.pay_status===0"
            @click="toReputin"
          >{{$t('lang.orderDetails.text4')}}</div>
          <el-popover placement="bottom" v-model="cancelOrderVisible">
            <div class="hide" v-show="cancelOrderVisible">
              <!-- 取消订单 -->
              <div
                class="hide-order"
                v-show="pageInfo.order_status.deliver_status===0"
                @click="toCancelOrder"
              >{{$t('lang.orderDetails.text6')}}</div>
            </div>
            <div
              class="font others"
              slot="reference"
              v-show="pageInfo.order_status.deliver_status===0"
            >
              <span>
                {{$t('lang.orderDetails.text5')}}
                <span class="iconfont icon-sanjiaoxing-xia"></span>
              </span>
            </div>
          </el-popover>
        </div>
        <div class="c-right" @click="back">
          <span class="iconfont icon-fanhui1"></span>
          {{$t('lang.orderDetails.text7')}}
        </div>
      </div>
      <!-- 未发货商品信息 -->
      <div class="c-good-info" v-if="pageInfo.notshiped">
        <div class="top">
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
            <span class="good-price">${{item.price}}</span>&nbsp;x&nbsp;
            <span class="good-number">{{item.number}}</span>
            <span class="good-amount">${{item.amount}}</span>
          </div>
        </div>
        <div class="btm clearfix">
          <!-- 订单发货 -->
          <el-button
            v-if="pageInfo.order_status.pay_status!==2"
            class="marked-as-shipped"
            type="primary"
            @click="toDelivery"
          >{{$t('lang.orderDetails.text8')}}</el-button>
        </div>
      </div>
      <!-- 已发货商品信息 -->
      <div class="c-good-info" v-if="pageInfo.shiped">
        <div class="one" v-for="(item,index) in pageInfo.shiped" :key="index">
          <div class="top">
            <div class="c-status clearfix">
              <span class="blue-circle"></span>
              <span class="status">{{item.head}}</span>
              <span class="deliveryWarehouse">{{item.location}}</span>
              <div class="c-Logistics-info">{{item.deliver_method}}:{{item.deliver_order}}</div>
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
              <span class="good-price">${{itemTwo.price}}</span>&nbsp;x&nbsp;
              <span class="good-number">{{itemTwo.number}}</span>
              <span class="good-amount">${{itemTwo.amount}}</span>
            </div>
          </div>
          <div class="btm clearfix">
            <div class="c-paid-and-shipped-operation">
              <el-button
                v-if="pageInfo.order_status.deliver_status!==1||pageInfo.order_status.deliver_status!==2"
                class="add-info"
                type="primary"
                @click="openAddTraceInformationModal(index)"
              >{{$t('lang.orderDetails.text11')}}</el-button>
              <el-popover :ref="'popover-'+index" placement="bottom">
                <div class="hide">
                  <div @click="canceDelivery(index)">{{$t('lang.orderDetails.text10')}}</div>
                </div>
                <div
                  v-show="pageInfo.order_status.pay_status!==2"
                  class="more"
                  slot="reference"
                  :visible-arrow="false"
                >{{$t('lang.orderDetails.text9')}}</div>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
      <!-- 已退款商品信息 -->
      <div class="c-good-info" v-if="pageInfo.refunded">
        <div class="top">
          <div class="c-status">
            <span class="blue-circle"></span>
            <span class="status">{{pageInfo.refunded.head}}</span>
          </div>
          <div class="good clearfix" v-for="(item,index) in pageInfo.refunded.info" :key="index">
            <img :src="item.img" alt />
            <div class="info">
              <p class="title">{{item.goodsname}}</p>
              <p
                class="detail"
                v-for="(itemTwo,indexTwo) in item.attr"
                :key="indexTwo"
              >{{itemTwo.attr_name}}: {{itemTwo.attr_value}}</p>
            </div>
            <span class="good-price">${{item.price}}</span>&nbsp;x&nbsp;
            <span class="good-number">{{item.number}}</span>
            <span class="good-amount">${{item.amount}}</span>
          </div>
        </div>
        <div class="btm clearfix"></div>
      </div>
      <!-- 交易信息 -->
      <div class="c-trading-information">
        <div class="top">
          <div class="c-status">
            <span class="blue-circle"></span>
            <span
              class="status"
              v-show="pageInfo.billinfo.head===0"
            >{{$t('lang.indexofEffectiveOrders.text10')}}</span>
            <span
              class="status"
              v-show="pageInfo.billinfo.head===1"
            >{{$t('lang.indexofEffectiveOrders.text11')}}</span>
            <span
              class="status"
              v-show="pageInfo.billinfo.head===2"
            >{{$t('lang.indexofEffectiveOrders.text12')}}</span>
            <span
              class="status"
              v-show="pageInfo.billinfo.head===3"
            >{{$t('lang.indexofEffectiveOrders.text13')}}</span>
            <span
              class="status"
              v-show="pageInfo.billinfo.head===4"
            >{{$t('lang.indexofEffectiveOrders.text14')}}</span>
            <span
              class="status"
              v-show="pageInfo.billinfo.head===5"
            >{{$t('lang.indexofEffectiveOrders.text15')}}</span>
          </div>
          <div class="discount same" v-show="pageInfo.billinfo.info.discount_code">
            <span class="left">
              {{$t('lang.orderDetails.text26')}}
              <span
                class="discount-code"
              >{{pageInfo.billinfo.info.discount_code}}</span>
            </span>
            <span class="right">-$ {{pageInfo.billinfo.info.discount_amount}}</span>
          </div>
          <div class="info-number same">
            <span class="left">{{$t('lang.orderDetails.text19')}}</span>
            <span class="right">x{{pageInfo.billinfo.info.buynum}}</span>
          </div>
          <div class="info-distribution same">
            <div>
              <span class="left">{{$t('lang.orderDetails.text20')}}</span>
            </div>
            <span class="right">${{pageInfo.billinfo.info.shipping}}</span>
          </div>
          <div class="info-Taxes-and-fees same">
            <div>
              <span class="left">{{$t('lang.orderDetails.text21')}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <span>VAT 17%</span> -->
            </div>
            <span class="right">${{pageInfo.billinfo.info.taxes}}</span>
          </div>
          <div class="info-price same">
            <span class="left">{{$t('lang.orderDetails.text22')}}</span>
            <span class="right">${{pageInfo.billinfo.info.subtotal}}</span>
          </div>
          <div class="info-total-price same last">
            <span class="left">{{$t('lang.orderDetails.text23')}}</span>
            <span class="price">${{pageInfo.billinfo.info.totalprice}}</span>
          </div>
        </div>
        <div class="btm-one">
          <span class="describe">{{$t('lang.orderDetails.text24')}}</span>
          <span class="price">${{pageInfo.billinfo.info.client_paied}}</span>
        </div>
        <div class="btm-two" v-for="(item,index) in pageInfo.billinfo.info.refund" :key="index">
          <div class="row">
            <span>{{$t('lang.orderDetails.refundAmount')}}</span>
            <span>${{item.amount}}</span>
          </div>
          <div class="row">
            <span>{{$t('lang.orderDetails.refundReason')}}</span>
            <span>{{item.reason}}</span>
          </div>
        </div>
        <div class="btm-three">
          <span>{{$t('lang.orderDetails.text25')}}</span>
          <span>${{pageInfo.billinfo.info.netamount}}</span>
        </div>
        <div
          class="btm-four"
          v-show="pageInfo.order_status.paymethod===3&&pageInfo.order_status.pay_status===0"
        >
          <!-- 确认收款 -->
          <el-button
            type="primary"
            class="markedbutton"
            @click="collectionVisible=true"
          >{{$t('lang.orderDetails.text60')}}</el-button>
        </div>
      </div>
      <!-- 备注 -->
      <div class="c-note">
        <div class="top">
          <span class="title">{{$t('lang.orderDetails.text27')}}</span>
          <span class="editor" @click="editorNoteVisible=true">{{$t('lang.orderDetails.text28')}}</span>
        </div>
        <div class="note" v-show="!pageInfo.comment">{{$t('lang.orderDetails.text29')}}</div>
        <div class="note" v-show="pageInfo.comment">{{pageInfo.comment}}</div>
      </div>
      <!-- 用户信息 -->
      <div class="c-user-info clearfix">
        <div class="box-name">
          <p class="title">{{$t('lang.orderDetails.text34')}}</p>
          <p class="name">{{pageInfo.client}}</p>
          <div class="c-img"></div>
        </div>
        <div class="box-contact-information">
          <div class="top">
            <span class="title">{{$t('lang.orderDetails.text35')}}</span>
            <span
              class="editor"
              @click="editorContactInfoVisible=true"
            >{{$t('lang.orderDetails.text36')}}</span>
          </div>
          <div class="email">{{pageInfo.concat_info.email}}</div>
          <div class="phone">{{pageInfo.concat_info.phone}}</div>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="c-shipping-adress">
        <div class="top">
          <span class="title">{{$t('lang.orderDetails.text42')}}</span>
          <span class="editor" @click="openShippingModalWindow">{{$t('lang.orderDetails.text43')}}</span>
        </div>
        <div
          class="adress"
          v-if="pageInfo.shipping_address"
        >{{pageInfo.shipping_address.firstname}} {{pageInfo.shipping_address.lastname}},{{pageInfo.shipping_address.phone}},{{pageInfo.shipping_address.address}},{{pageInfo.shipping_address.city}},{{pageInfo.shipping_address.province}},{{pageInfo.shipping_address.country}},{{pageInfo.shipping_address.zipcode}}</div>
      </div>

      <!-- 发货地址 -->
      <!-- <div class="c-delivery-adress">
        <div class="top">
          <span class="title">发货地址</span>
          <span class="editor" @click="openDeliveryModalWindow">编辑</span>
        </div>
        <div class="adress">{{pageInfo.delivery_address}}</div>
      <div class="adress" v-if="!pageInfo.delivery_address">暂无地址</div>-->
      <!-- </div> -->

      <!-- 时间表 -->
      <div class="c-schedule" v-if="pageInfo.order_history.length">
        <span class="title">{{$t('lang.orderDetails.text57')}} :</span>
        <ul>
          <li v-for="(item,index) in pageInfo.order_history" :key="index" class="myli clearfix">
            <span class="circle clearfix">
              <span></span>
            </span>
            <div class="info clearfix">
              <div class="time">{{item.operate_time}}</div>
              <div class="content clearfix">
                {{item.desc}}
                <!-- <el-button
                  v-show="item.id"
                  @click="resendEmail"
                  plain
                  class="resend-email"
                >{{$t('lang.orderDetails.text58')}}</el-button>-->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 确认收款模态窗 -->
    <el-dialog
      :title="$t('lang.indexofEffectiveOrders.text24')"
      :visible.sync="collectionVisible"
      width="30%"
    >
      <span>{{$t('lang.indexofEffectiveOrders.text23')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="collectionVisible = false">{{$t('lang.indexofEffectiveOrders.text26')}}</el-button>
        <!-- 确认点击 -->
        <el-button
          type="primary"
          @click="confirmReceipt"
        >{{$t('lang.indexofEffectiveOrders.text25')}}</el-button>
      </span>
    </el-dialog>
    <!-- 编辑跟踪信息模态窗 -->
    <div class="c-AddTraceInformation">
      <el-dialog
        :title="$t('lang.orderDetails.text12')"
        :visible.sync="addTraceInformationVisible"
        width="38.5%"
        :show-close="false"
      >
        <el-form
          :model="addTraceInformation"
          ref="form_addTraceInformation"
          :rules="rule_addTraceInformation"
        >
          <p class="text1">{{$t('lang.orderDetails.text13')}}</p>
          <el-form-item prop="deliverNumber">
            <el-input class="input-one" v-model="addTraceInformation.deliverNumber" />
          </el-form-item>
          <p class="text2">{{$t('lang.orderDetails.text14')}}</p>
          <div class="c-courier-select">
            <el-select
              v-model="addTraceInformation.courier"
              :placeholder="$t('lang.orderDetails.text15')"
              class="couriers"
            >
              <el-option
                v-for="item in $i18n.locale==='zh-cn'?couriersZh:couriersEn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="c-notify">
            <el-checkbox v-model="notifyUser" class="email-notify"></el-checkbox>
            <span class="text3">{{$t('lang.orderDetails.text16')}}</span>
          </div>
          <div class="c-btn">
            <el-button
              plain
              @click="addTraceInformationVisible=false"
            >{{$t('lang.orderDetails.text17')}}</el-button>
            <el-button
              type="primary"
              @click="saveTraceInformation"
            >{{$t('lang.orderDetails.text18')}}</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!-- 编辑备注模态窗 -->
    <div class="note-modal-window">
      <el-dialog
        :title="$t('lang.orderDetails.text30')"
        :visible.sync="editorNoteVisible"
        width="30%"
      >
        <p class="title">{{$t('lang.orderDetails.text31')}}</p>
        <el-input
          type="textarea"
          :rows="4"
          :placeholder="$t('lang.orderDetails.text32')"
          v-model="note"
          maxlength="60"
          :show-word-limit="true"
        ></el-input>
        <div class="c-btn">
          <el-button plain @click="editorNoteVisible=false">{{$t('lang.orderDetails.text33')}}</el-button>
          <el-button type="primary" @click="editorNote">{{$t('lang.orderDetails.text59')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 编辑用户联系信息模态窗 -->
    <div class="user-info-modal-window">
      <el-dialog
        :title="$t('lang.orderDetails.text37')"
        :visible.sync="editorContactInfoVisible"
        width="30%"
      >
        <el-form :model="contactInfo" ref="form_contactInfo" :rules="rule_contactInfo">
          <el-form-item prop="email">
            <p class="label-email">{{$t('lang.orderDetails.text38')}}</p>
            <el-input v-model="contactInfo.email" />
          </el-form-item>
          <el-form-item prop="phone">
            <p class="label-phone">{{$t('lang.orderDetails.text39')}}</p>
            <el-input v-model="contactInfo.phone" />
          </el-form-item>
          <div class="c-btn">
            <el-button
              plain
              @click="editorContactInfoVisible=false"
            >{{$t('lang.orderDetails.text40')}}</el-button>
            <el-button
              type="primary"
              @click="editContactInformation"
            >{{$t('lang.orderDetails.text41')}}</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!-- 编辑收货地址模态窗 -->
    <AddressModalWindow
      :addressData="pageInfo.shipping_address"
      @addressEdit="addressEditSuccess"
      :orderid="orderid"
      :title="$t('lang.orderDetails.text44')"
      ref="shippingModalWindow"
    />
  </div>
</template>
<script>
import messageAlert from '@/utils/messageAlert'
import { mapMutations } from 'vuex'
import AddressModalWindow from '@/components/administratorPanel/addressModalWindow'
import {
  getOrderDetailPageInfo,
  submitCancleDelivery,
  saveTraceInformation,
  editContactInformation,
  editorNote,
  receipt
} from '../../../../common/api/api'
import {
  deliverNumberValidator,
  validateEMail,
  phoneNumberValidator
} from '@/common/validator'
export default {
  components: {
    AddressModalWindow
  },
  data () {
    return {
      // 跟踪信息验证
      rule_addTraceInformation: {
        deliverNumber: [
          {
            validator: deliverNumberValidator,
            trigger: 'blur'
          }
        ]
      },
      rule_contactInfo: {
        email: [
          {
            validator: validateEMail,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: phoneNumberValidator,
            trigger: 'blur'
          }
        ]
      },
      // ui
      collectionVisible: false,
      cancelOrderVisible: false,
      addTraceInformationVisible: false,
      editorNoteVisible: false,
      editorContactInfoVisible: false,
      // data
      couriersZh: [
        {
          value: '顺丰',
          label: '顺丰'
        },
        {
          value: '邮政',
          label: '邮政'
        }
      ],
      couriersEn: [
        {
          value: 'S.F. Express',
          label: 'S.F. Express'
        },
        {
          value: 'postal service',
          label: 'postal service'
        }
      ],
      pageInfo: null,
      //   变量
      Id: [], // 要编辑的已发货的商品的Id
      indexOfInEdit: null, // 正在操作的已发货框的下标
      addTraceInformation: {
        courier: '',
        deliverNumber: ''
      },
      contactInfo: {
        email: '',
        phone: ''
      },
      notifyUser: false,
      note: ''
    }
  },
  watch: {},
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
      this.pageInfo.shipping_address.firstname =
        newInfo.shipping_address.firstname
      this.pageInfo.shipping_address.lastname =
        newInfo.shipping_address.lastname
      this.pageInfo.shipping_address.address = newInfo.shipping_address.address
      this.pageInfo.shipping_address.city = newInfo.shipping_address.city
      this.pageInfo.shipping_address.country = newInfo.shipping_address.country
      this.pageInfo.shipping_address.phone = newInfo.shipping_address.phone
      this.pageInfo.shipping_address.province =
        newInfo.shipping_address.province
      this.pageInfo.shipping_address.zipcode = newInfo.shipping_address.zipcode
    },
    toDelivery () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/delivery',
        query: {
          orderid: this.orderid
        }
      })
    },
    toCancelOrder () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/cancelOrders',
        query: {
          orderid: this.orderid,
          orderNum: this.pageInfo.headinfo.ordernum
        }
      })
    },
    canceDelivery (index) {
      this.$refs[`popover-` + index][0].doClose()
      this.pageInfo.shiped[index].info.forEach(item => {
        this.Id.push(item.Id)
      })
      submitCancleDelivery({
        orderid: this.orderid,
        ordergid: this.Id
      })
        .then(res => {
          console.log(res)
          messageAlert(res)
          if (res.data.code === 1) {
            getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
              console.log(res)
              this.pageInfo = res.data.data
            })
          }
        })
        .finally((this.Id = []))
    },
    openAddTraceInformationModal (index) {
      this.Id = []
      this.indexOfInEdit = index
      this.addTraceInformation.courier = this.pageInfo.shiped[
        index
      ].deliver_method
      this.addTraceInformation.deliverNumber = this.pageInfo.shiped[
        index
      ].deliver_order
      this.pageInfo.shiped[index].info.forEach(item => {
        this.Id.push(item.Id)
      })
      this.addTraceInformationVisible = true
    },
    saveTraceInformation () {
      this.$refs['form_addTraceInformation'].validate(valid => {
        if (valid) {
          saveTraceInformation({
            deliver_number: this.addTraceInformation.deliverNumber,
            deliver_method: this.addTraceInformation.courier,
            ordergid: this.Id
          })
            .then(res => {
              messageAlert(res)
              if (res.data.code === 1) {
                this.addTraceInformationVisible = false
                // eslint-disable-next-line standard/computed-property-even-spacing
                this.pageInfo.shiped[
                  this.indexOfInEdit
                ].deliver_method = this.addTraceInformation.courier
                // eslint-disable-next-line standard/computed-property-even-spacing
                this.pageInfo.shiped[
                  this.indexOfInEdit
                ].deliver_order = this.addTraceInformation.deliverNumber
              }
            })
            .finally((this.Id = []))
        }
      })
    },
    editContactInformation () {
      this.$refs['form_contactInfo'].validate(valid => {
        if (valid) {
          editContactInformation({
            orderid: this.orderid,
            email: this.contactInfo.email,
            phone: this.contactInfo.phone
          }).then(res => {
            messageAlert(res)
            if (res.data.code === 1) {
              this.editorContactInfoVisible = false
              this.pageInfo.concat_info.email = this.contactInfo.email
              this.pageInfo.concat_info.phone = this.contactInfo.phone
            }
          })
        }
      })
    },
    editorNote () {
      editorNote({
        orderid: this.orderid,
        comment: this.note
      }).then(res => {
        messageAlert(res)
        if (res.data.code === 1) {
          this.editorNoteVisible = false
          this.pageInfo.comment = this.note
        }
      })
    },
    toRefund () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/refund',
        query: {
          orderid: this.orderid
        }
      })
    },
    toReputin () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/rePutInStorage',
        query: {
          orderid: this.orderid
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    resendEmail () {
      console.log(66)
    },
    openShippingModalWindow () {
      this.$refs.shippingModalWindow.addressModalWindowVisible = true
    },
    // 打印订单跳转
    printOrder () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/printOrder',
        query: {
          id: this.orderid
        }
      })
    },
    async confirmReceipt () {
      let res = await receipt({
        orderid: this.orderid
      })
      messageAlert(res)
      console.log(res)
      if (res.data.code === 1) {
        this.collectionVisible = false
        this.pageInfo.billinfo.info.netamount = res.data.data.paymentAmount
        this.pageInfo.billinfo.info.client_paied = res.data.data.paymentAmount
        this.$set(this.pageInfo.order_status, 'pay_status', res.data.data.order_status.pay_status)
      }
    }
  },
  created () {
    this.forRightLoadingVisible(true)
    getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
      this.forRightLoadingVisible(false)
      this.pageInfo = res.data.data
      console.log(this.pageInfo)
      this.contactInfo.email = this.pageInfo.concat_info.email
      this.contactInfo.phone = this.pageInfo.concat_info.phone
      this.note = this.pageInfo.comment
    })
  }
}
</script>
<style lang="less" scoped>
.c-orderDetails {
  max-width: 772px;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 275px;
  .content-orderDetails {
    .top {
      margin-bottom: 20px;
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
      .time {
        font-size: 17px;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        line-height: 52px;
      }
    }
    .c-operation {
      display: flex;
      justify-content: space-between;
      margin-bottom: 23px;
      .c-left {
        display: flex;
        justify-content: flex-start;
        .font {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .font:hover {
          cursor: pointer;
        }
        .print-order {
          margin-right: 31px;
        }
        .refund {
          margin-right: 37px;
        }
        .reputin {
          margin-right: 37px;
        }
        .others {
          position: relative;
          .icon-sanjiaoxing-xia {
            font-size: 10px;
            margin-left: 5px;
            position: relative;
            top: -2px;
          }
        }
      }
      .c-right {
        font-size: 18px;
        position: relative;
        top: 2px;
        color: rgba(0, 0, 0, 1);
        font-weight: 400;
        .icon-fanhui1 {
          font-size: 14px;
        }
      }
      .c-right:hover {
        cursor: pointer;
      }
    }
    .c-good-info {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 20px;
      .one {
        border-bottom: 1px solid #eeeeee;
      }
      .one:last-child {
        border-bottom: none;
      }
      .top {
        padding: 33px 36px 22px 29px;
        .c-status {
          margin-bottom: 21px;
          .c-Logistics-info {
            font-size: 16px;
            color: #637381;
            margin-top: 20px;
          }
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
            background: #4267b2;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
          .status {
            font-size: 18px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .deliveryWarehouse {
            font-size: 17px;
            float: right;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            margin-right: 10px;
          }
        }
        .good {
          background: rgba(252, 252, 252, 1);
          border: 1px solid rgba(239, 239, 239, 1);
          border-radius: 4px;
          padding-top: 55px;
          padding-bottom: 45px;
          display: flex;
          align-items: center;
          position: relative;
          // padding-top: 20px;
          img {
            width: 80px;
            height: 80px;
            margin-left: 24px;
            margin-right: 20px;
          }
          .info {
            float: left;
            width: 300px;
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
          .good-price {
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .good-number {
            margin-right: 88px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .good-amount {
            font-size: 14px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .btm {
        border-top: 1px solid rgba(238, 238, 238, 1);
        padding-right: 31px;
        padding-top: 17px;
        padding-bottom: 15px;
        .marked-as-shipped {
          font-size: 18px;
          font-weight: bold;
          height: 60px;
          float: right;
        }
        .c-paid-and-shipped-operation {
          .more {
            // padding: 19px 36px 19px 24px;
            width: 100px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border: 1px solid rgba(149, 149, 149, 1);
            box-shadow: 0px 0px 10px 10px rgba(245, 246, 248, 0.5);
            border-radius: 4px;
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            position: relative;
            float: right;
          }
          .more:hover {
            background: linear-gradient(180deg, #f9fafb, #f4f6f8);
          }
          .add-info {
            font-size: 18px;
            font-weight: bold;
            height: 60px;
            float: right;
            margin-left: 16px;
          }
        }
        div:hover {
          cursor: pointer;
        }
      }
    }
    .c-trading-information {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 22px;
      .top {
        padding-left: 38px;
        padding-right: 38px;
        padding-top: 29px;
        .c-status {
          margin-bottom: 35px;
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
        .same {
          display: flex;
          justify-content: space-between;
          margin-bottom: 35px;
          .left {
            font-size: 18px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .right {
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
        }
        .discount {
          position: relative;
          .discount-code {
            font-size: 14px;
            margin-left: 10px;
          }
        }
        .info-total-price {
          .price {
            font-size: 16px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
        .last {
          margin-bottom: 18px;
        }
      }
      .btm-one {
        padding: 21px 37px 36px 37px;
        display: flex;
        justify-content: space-between;
        border-top: 2px solid rgba(238, 238, 238, 1);
        .describe {
          font-size: 18px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .price {
          font-size: 16px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
      .btm-two {
        border-top: 2px solid rgba(238, 238, 238, 1);
        padding: 29px 38px 30px 38px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .row:last-child {
          margin-bottom: 0px;
        }
      }
      .btm-three {
        border-top: 2px solid rgba(238, 238, 238, 1);
        padding: 29px 38px 30px 38px;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }
      .markedbutton {
        width: 130px;
        height: 55px;
        color: #ffffff;
        font-weight: bold;
        font-size: 18px;
        margin-left: 610px;
        margin-bottom: 20px;
      }
    }
    .c-note {
      padding: 38px 28px 45px 34px;
      margin-bottom: 27px;
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 27px;
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
      .note {
        font-size: 20px;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        word-break: break-all;
        word-wrap: break-word;
      }
    }
    .c-user-info {
      margin-bottom: 26px;
      .box-name {
        width: 42%;
        background: rgba(255, 255, 255, 1);
        border: 0px solid rgba(112, 70, 16, 1);
        box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
        border-radius: 10px;
        position: relative;
        padding: 37px 0 68px 36px;
        float: left;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-bottom: 27px;
        }
        .name {
          font-size: 16px;
          font-weight: 400;
          color: rgba(66, 103, 178, 1);
        }
        .c-img {
          position: absolute;
          width: 45px;
          height: 45px;
          background: rgba(238, 238, 238, 1);
          border-radius: 50%;
          right: 19px;
          top: 24px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .box-contact-information {
        width: 44%;
        background: rgba(255, 255, 255, 1);
        border: 0px solid rgba(112, 70, 16, 1);
        box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
        border-radius: 10px;
        padding: 29px 25px 29px 22px;
        float: right;
        .top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 34px;
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
        .email {
          font-size: 16px;
          font-weight: 400;
          color: rgba(66, 103, 178, 1);
          margin-bottom: 23px;
        }
        .phone {
          font-size: 16px;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
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
      .top {
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
    .c-schedule {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding: 57px 0 57px 123px;
      position: relative;
      ul {
        margin: 0;
      }
      .title {
        position: absolute;
        left: 26px;
        top: 53px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .myli {
        padding-bottom: 50px;
        //   border-left:1px solid red;
        position: relative;
        .circle {
          width: 14px;
          height: 14px;
          background: rgba(192, 192, 192, 1);
          opacity: 0.55;
          border-radius: 50%;
          position: relative;
          margin-right: 13px;
          float: left;
          span {
            width: 8px;
            height: 8px;
            background: rgba(113, 113, 113, 1);
            border-radius: 50%;
            display: inline-block;
            margin: auto;
            position: absolute;
            top: 3px;
            left: 3px;
          }
        }
        .info {
          max-width: 490px;
          margin-left: 13px;
          display: flex;
          justify-content: flex-start;
          .time {
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-right: 16px;
            width: 140px;
          }
          .content {
            line-height: 35px;
            font-size: 16px;
            max-width: 370px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            word-wrap: break-word;
            word-break: break-all;
            position: relative;
            top: -10px;
            .resend-email {
              margin-left: 10px;
              color: rgba(66, 103, 178, 1);
            }
          }
        }
      }
      .myli:last-child {
        padding-bottom: 0;
      }
      .myli::after {
        content: "";
        display: block;
        width: 2px;
        height: 65%;
        position: absolute;
        background: rgba(113, 113, 113, 1);
        left: 1%;
        top: calc(14px + (35% - 14px) / 2);
      }
      .myli:last-child::after {
        display: none;
      }
    }
  }
  .c-AddTraceInformation {
    /deep/ .el-dialog {
      border-radius: 6px;
      margin-top: 25vh !important;
      min-width: 600px;
    }
    .el-dialog__wrapper /deep/ .el-dialog__header {
      font-size: 16px;
      font-weight: 400;
      color: rgba(2, 2, 2, 1);
      border-bottom: 2px solid rgba(238, 238, 238, 1);
    }
    .el-dialog__wrapper /deep/ .el-dialog__body {
      .text1 {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 24px;
      }
      .text2 {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
        margin-top: 37px;
      }
      .text3 {
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .el-checkbox {
        margin-right: 14px;
      }
      .c-notify {
        margin-bottom: 15px;
      }
      .c-btn {
        display: flex;
        justify-content: flex-end;
        .btn-cancel {
          margin-right: 20px;
        }
      }
      .input-one {
        // margin-bottom: 21px;
      }
    }
    /deep/ .el-input__inner {
      height: 62px;
    }
    .c-courier-select {
      margin-bottom: 30px;
      .couriers {
        width: 100%;
      }
    }
  }
}
.hide {
  .hide-order {
    text-align: center;
    height: 65px;
    line-height: 65px;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    color: rgba(79, 79, 79, 1);
    cursor: pointer;
  }
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
// 备注模态窗
.note-modal-window {
  /deep/ .el-dialog {
    min-width: 500px;
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    font-size: 20px;
    font-weight: bold;
    color: rgba(1, 1, 1, 1);
  }
  .title {
    margin-bottom: 20px;
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
  .c-btn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    .btn-cancel {
      margin-right: 20px;
    }
  }
}
// 用户信息模态窗
.user-info-modal-window {
  /deep/ .el-dialog {
    min-width: 620px;
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    font-weight: bold;
    color: rgba(1, 1, 1, 1);
  }
  .label-email {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .label-phone {
    font-size: 16px;
  }
  .c-btn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  /deep/ .el-input__inner {
    height: 62px;
  }
}
// 模态窗样式修改
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 28px !important;
  padding-bottom: 36px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
}
p {
  margin: 0;
}
</style>

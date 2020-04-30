<template>
  <div class="c-orderDetails" v-if="pageInfo">
    <!-- 订单状态 -->
    <div class="c-order-status">
      <div>
        <p class="status">{{$t('lang.orderDetails.text1.title')}}</p>
        <img class="toSendTheGoods" :src="$t('lang.orderDetails.text1.imgsrc')" alt />
      </div>
    </div>
    <!-- top信息 -->
    <div class="order-top">
      <span class="title">订单</span>
      <span class="order-number">{{pageInfo.headinfo.ordernum}}</span>
      <span class="time">{{pageInfo.headinfo.createtime}}</span>
    </div>
    <!-- 操作框 -->
    <div class="c-operation">
      <div class="item print-order">打印订单</div>
      <div
        class="item refund"
        v-if="pageInfo.order_status.pay_status==='已支付'||pageInfo.order_status.pay_status==='部分支付'||pageInfo.order_status.pay_status==='部分退款'"
        @click="toRefund"
      >退款</div>
      <div
        class="item reputin"
        v-if="pageInfo.order_status.pay_status==='未支付'"
        @click="toReputin"
      >重新入库</div>
      <div class="item others" @click="cancelOrderVisible=!cancelOrderVisible">
        其他操作
        <el-collapse-transition>
          <div class="hide" v-show="cancelOrderVisible">
            <div v-show="pageInfo.order_status.deliver_status==='未发货'" @click="toCancelOrder">取消订单</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <div class="c-boxs">
      <!-- 未发货商品信息 -->
      <div class="box box-good box-unshipped" v-if="pageInfo.notshiped">
        <div class="top">
          <div class="c-status">
            <span class="yellow-circle"></span>
            <span>{{pageInfo.notshiped.head}}</span>
          </div>
        </div>
        <div v-for="(item,index) in pageInfo.notshiped.info" :key="index">
          <div class="good clearfix">
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
          <div class="btm">
            <span>共{{item.number}}件商品 X ${{item.price}}</span>&nbsp;&nbsp;&nbsp;
            <span>合计: ${{item.amount}}</span>
          </div>
        </div>
        <div
          class="btn-operation"
          @click="toDelivery"
          v-if="pageInfo.order_status.deliver_status!=='已取消'"
        >标记为已发货</div>
      </div>
      <!-- 已发货商品信息 -->
      <div class="box box-good box-shipped" v-if="pageInfo.shiped">
        <div class="one" v-for="(item,index) in pageInfo.shiped" :key="index">
          <div
            class="more"
            v-if="pageInfo.order_status.deliver_status!=='已取消'"
            @click="openMoreOperatingBox(index)"
          >
            更多
            <el-collapse-transition>
              <div class="hide" v-show="moreOperatingBoxVisible[index]">
                <div @click="canceDelivery(index)">取消发货</div>
              </div>
            </el-collapse-transition>
          </div>
          <div class="top">
            <div class="c-status">
              <span class="blue-circle"></span>
              <span>{{item.head}}</span>
            </div>
          </div>
          <div class="logistics-info">
            <span class="location">{{item.location}}</span>
            <span class="courier-name">{{item.deliver_method}}:</span>
            <span class="courier-number">{{item.deliver_order}}</span>
          </div>
          <div v-for="(itemTwo,indexTwo) in item.info" :key="indexTwo">
            <div class="good clearfix">
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
            <div class="btm">
              <span>共{{itemTwo.number}}件商品 X ${{itemTwo.price}}</span>&nbsp;&nbsp;&nbsp;
              <span>合计: ${{itemTwo.amount}}</span>
            </div>
          </div>
          <div
            class="btn-operation"
            v-if="pageInfo.order_status.deliver_status!=='已发货'||pageInfo.order_status.deliver_status!=='部分发货'"
            @click="openAddTraceInformationModal(index)"
          >添加跟踪信息</div>
        </div>
      </div>
      <!-- 已退款商品信息 -->
      <div class="box box-good box-refunded" v-if="pageInfo.refunded">
        <div class="top">
          <div class="c-status">
            <span class="blue-circle"></span>
            <span>{{pageInfo.refunded.head}}</span>
          </div>
        </div>
        <div v-for="(item,index) in pageInfo.refunded.info" :key="index">
          <div class="good clearfix">
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
          <div class="btm">
            <span>共{{item.number}}件商品 X ${{item.price}}</span>&nbsp;&nbsp;&nbsp;
            <span>合计: ${{item.amount}}</span>
          </div>
        </div>
      </div>
      <!-- 交易信息 -->
      <div class="box box-trading-information">
        <div class="top">
          <div class="c-status">
            <span class="blue-circle"></span>
            <span class="status">{{pageInfo.billinfo.head}}</span>
          </div>
          <div class="info-number same">
            <span class="left">数量</span>
            <span class="right">x{{pageInfo.billinfo.info.buynum}}</span>
          </div>
          <div class="info-distribution same">
            <div>
              <span class="left">配送</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>Heavy Goods Shipping (20.0 kg)</span>
            </div>
            <span class="right">${{pageInfo.billinfo.info.shipping}}</span>
          </div>
          <div class="info-Taxes-and-fees same">
            <div>
              <span class="left">税费</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <span>VAT 17%</span> -->
            </div>
            <span class="right">${{pageInfo.billinfo.info.taxes}}</span>
          </div>
          <div class="info-price same">
            <span class="left">价格</span>
            <span class="right">${{pageInfo.billinfo.info.subtotal}}</span>
          </div>
          <div class="info-total-price same last">
            <span class="left">总计</span>
            <span class="price">${{pageInfo.billinfo.info.totalprice}}</span>
          </div>
        </div>
        <div class="btm-one">
          <span class="describe">(客户付款)</span>
          <span class="price">${{pageInfo.billinfo.info.client_paied}}</span>
        </div>
        <div class="btm-two" v-for="(item,index) in pageInfo.billinfo.info.refund" :key="index">
          <div class="row">
            <span>已退款</span>
            <span>${{item.amount}}</span>
          </div>
          <div class="row">
            <span>退款原因</span>
            <span>{{item.reason}}</span>
          </div>
        </div>
        <div class="btm-three">
          <span>净支出</span>
          <span>${{pageInfo.billinfo.info.netamount}}</span>
        </div>
      </div>
      <!-- 备注 -->
      <div class="box box-note">
        <div class="top">
          <span class="title">备注</span>
          <span class="editor" @click="editorNoteVisible=true">编辑</span>
        </div>
        <div class="note">暂时没有备注</div>
      </div>
      <!-- 用户信息 -->
      <div class="box box-user-info">
        <div class="c-name">
          <div class="top">
            <span class="title">客户</span>
            <div class="c-img"></div>
          </div>
          <p class="name">{{pageInfo.client}}</p>
        </div>
        <div class="c-contact-information">
          <div class="top">
            <span class="title">联系信息</span>
            <div class="editor" @click="editorContactInfoVisible=true">编辑</div>
          </div>
          <p class="email">{{pageInfo.concat_info.email}}</p>
          <p class="phone">{{pageInfo.concat_info.phone}}</p>
          <p class="no-phone" v-if="!pageInfo.concat_info.phone">没有电话号码</p>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="box box-shipping-adress">
        <div class="top">
          <span class="title">收货地址</span>
          <span class="editor" @click="openShippingModalWindow">编辑</span>
        </div>
        <div
          class="adress"
          v-if="pageInfo.shipping_address"
        >{{pageInfo.shipping_address.name}},{{pageInfo.shipping_address.phone}},{{pageInfo.shipping_address.address}},{{pageInfo.shipping_address.city}},{{pageInfo.shipping_address.country}},{{pageInfo.shipping_address.zipcode}}</div>
      </div>
      <!-- 时间表 -->
      <div class="box box-schedule">
        <span class="title">时间表 :</span>
        <ul>
          <li v-for="(item,index) in timeLine" :key="index" class="myli clearfix">
            <span class="circle clearfix">
              <span></span>
            </span>
            <div class="info clearfix">
              <div class="time">{{item.time}}</div>
              <div class="content clearfix">
                {{item.content}}
                <div class="resend-email" v-show="item.id">重新发送电子邮件</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--  -->
    </div>
    <!-- 编辑跟踪信息模态窗 -->
    <div class="addTraceInformation-modal-window">
      <el-dialog :title="'编辑跟踪'" :visible.sync="addTraceInformationVisible" width="94%">
        <p class="text1">运单号</p>
        <el-input class="input-one" v-model="deliverNumber" />
        <p class="text2">运输方式</p>
        <div class="c-courier-select">
          <el-select v-model="courier" :placeholder="'选择快递'" class="couriers">
            <el-option
              v-for="item in couriers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="c-notify">
          <EdgCheckbox class="el-checkbox" />
          <span class="text3">向客户发送通知电子邮件</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <edgButton
            @click.native="addTraceInformationVisible=false"
            class="btn-cancel"
            :text="'取消'"
          />
          <edgButton @click.native="saveTraceInformation" :text="'确定'" :type="'primary'" />
        </span>
      </el-dialog>
    </div>
    <!-- 编辑备注模态窗 -->
    <div class="note-modal-window">
      <el-dialog title="添加备注" :visible.sync="editorNoteVisible" width="94%">
        <p class="title">备注</p>
        <el-input type="textarea" :rows="4" placeholder="备注" v-model="note"></el-input>
        <span slot="footer" class="dialog-footer">
          <edgButton @click.native="editorNoteVisible=false" class="btn-cancel" :text="'取消'" />
          <edgButton @click.native="editorNoteVisible=false" :text="'确定'" :type="'primary'" />
        </span>
      </el-dialog>
    </div>
    <!-- 编辑用户联系信息模态窗 -->
    <div class="user-info-modal-window">
      <el-dialog title="编辑联系信息" :visible.sync="editorContactInfoVisible" width="94%">
        <p class="label-email">电子邮件地址</p>
        <el-input v-model="email" />
        <p class="label-phone">电话号码</p>
        <el-input v-model="phone" />
        <span slot="footer" class="dialog-footer">
          <edgButton
            @click.native="editorContactInfoVisible=false"
            class="btn-cancel"
            :text="'取消'"
          />
          <edgButton @click.native="editContactInformation" :text="'确定'" :type="'primary'" />
        </span>
      </el-dialog>
    </div>
    <!-- 编辑收货地址模态窗 -->
    <AddressModalWindow :orderid="orderid" :title="'编辑收货地址'" ref="shippingModalWindow" />
  </div>
</template>
<script>
import {
  getOrderDetailPageInfo,
  saveTraceInformation,
  editContactInformation,
  submitCancleDelivery
} from '@/common/api/api'
import { mapState } from 'vuex'
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
import edgButton from '@/components/administratorPanel/edgButton'
import AddressModalWindow from '@/components/administratorPanel/addressModalWindow'
export default {
  components: {
    EdgCheckbox,
    edgButton,
    AddressModalWindow
  },
  data () {
    return {
      // ui
      cancelOrderVisible: false,
      moreOperatingBoxVisible: [],
      addTraceInformationVisible: false,
      editorNoteVisible: false,
      editorContactInfoVisible: false,
      // 变量
      deliverNumber: '',
      courier: '',
      Id: [], // 要编辑的已发货的商品的Id
      note: '',
      email: '',
      phone: '',
      //   data
      pageInfo: null,
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
      timeLine: [
        {
          content: '111eqeq121',
          time: '2018-04-13'
        },
        {
          id: 1,
          content: '12111111111111111111111111111111111111qeqeqeqeqeq121',
          time: '2018-04-13'
        },
        {
          content: 'wwwwwwwwwwww',
          time: '2018-04-13'
        },
        {
          content: 'wwwwwwwwwwww',
          time: '2018-04-13'
        }
      ]
    }
  },
  computed: {
    ...mapState(['editReceivingAndShippingInformation']),
    orderid () {
      // 订单id
      return this.$route.query.orderid
    }
  },
  watch: {
    editReceivingAndShippingInformation: {
      handler (val) {
        console.log(val)
        if (val === 1) {
          // 调用编辑收货地址的接口成功
          getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
            console.log(res)
            this.pageInfo = res.data.data
            if (this.pageInfo.shiped) {
              this.pageInfo.shiped.forEach(item => {
                this.moreOperatingBoxVisible.push(false)
              })
            }
            console.log(this.moreOperatingBoxVisible)
          })
        }
      }
    }
  },
  methods: {
    openMoreOperatingBox (index) {
      // 更多的操作框
      this.$set(
        this.moreOperatingBoxVisible,
        index,
        !this.moreOperatingBoxVisible[index]
      )
      console.log(this.moreOperatingBoxVisible)
    },
    openAddTraceInformationModal (index) {
      this.Id = []
      console.log()
      this.pageInfo.shiped[index].info.forEach(item => {
        this.Id.push(item.Id)
      })
      this.addTraceInformationVisible = true
    },
    saveTraceInformation () {
      saveTraceInformation({
        deliver_number: this.deliverNumber,
        deliver_method: this.courier,
        ordergid: this.Id
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            this.addTraceInformationVisible = false
            getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
              console.log(res)
              this.pageInfo = res.data.data
            })
          }
        })
        .finally((this.Id = []))
    },
    editContactInformation () {
      editContactInformation({
        orderid: this.orderid,
        email: this.email,
        phone: this.phone
      }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.editorContactInfoVisible = false
          getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
            console.log(res)
            this.pageInfo = res.data.data
          })
        }
      })
    },
    openShippingModalWindow () {
      this.$refs.shippingModalWindow.addressModalWindowVisible = true
    },
    canceDelivery (index) {
      this.pageInfo.shiped[index].info.forEach(item => {
        this.Id.push(item.Id)
      })
      submitCancleDelivery({
        orderid: this.orderid,
        ordergid: this.Id
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
              console.log(res)
              this.pageInfo = res.data.data
            })
          }
        })
        .finally((this.Id = []))
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
    toCancelOrder () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/cancelOrders',
        query: {
          orderid: this.orderid
        }
      })
    },
    toDelivery () {
      this.$router.push({
        path: '/administratorPanel/orderManagement/delivery',
        query: {
          orderid: this.orderid
        }
      })
    }
  },
  created () {
    getOrderDetailPageInfo({ orderid: this.orderid }).then(res => {
      console.log(res)
      this.pageInfo = res.data.data
      this.email = this.pageInfo.concat_info.email
      this.phone = this.pageInfo.concat_info.phone
      if (this.pageInfo.shiped) {
        this.pageInfo.shiped.forEach(item => {
          this.moreOperatingBoxVisible.push(false)
        })
      }
      console.log(this.moreOperatingBoxVisible)
    })
  }
}
</script>
<style lang="less" scoped>
.c-orderDetails {
  .c-order-status {
    height: 196px;
    background: linear-gradient(
      90deg,
      rgba(0, 159, 255, 1) 0%,
      rgba(0, 198, 255, 1) 100%
    );
    box-shadow: 0px 10px 40px -15px rgba(0, 159, 255, 0.65);
    position: relative;
    top: -1px;
    .status {
      padding-left: 100px;
      line-height: 196px;
      font-size: 28px;
      color: rgba(255, 255, 255, 1);
    }
    .toSendTheGoods {
      position: absolute;
      right: 99px;
      bottom: 25px;
      width: 190px;
      height: 152px;
    }
  }
  .order-top {
    padding-top: 25px;
    padding-bottom: 25px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 16px 50px 0px rgba(235, 235, 235, 0.65);
    .title {
      font-size: 26px;
      margin-left: 22px;
      color: rgba(51, 51, 51, 1);
      margin-right: 22px;
    }
    .order-number {
      margin-right: 22px;
      font-size: 22px;
      color: rgba(51, 51, 51, 1);
    }
    .time {
      font-size: 22px;
      color: rgba(153, 153, 153, 1);
    }
  }
  .c-operation {
    font-size: 22px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    padding-top: 35px;
    padding-bottom: 35px;
    .item {
      flex-grow: 1;
      flex-basis: 0%;
      text-align: center;
      position: relative;
    }
    .item::after {
      content: "";
      position: absolute;
      background-color: rgba(204, 204, 204, 1);
      right: 0;
      top: calc(50% - 11px);
      width: 2px;
      height: 22px;
    }
    .item:last-child::after {
      background-color: #fff;
    }
    .others {
      .hide {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 16px 50px 0px rgba(153, 153, 153, 0.65);
        border-radius: 0px 0px 6px 6px;
        position: absolute;
        width: 100%;
        top: 35px;
        left: 0px;
        z-index: 10;
        div {
          font-size: 22px;
          color: rgba(79, 79, 79, 1);
          text-align: center;
          height: 65px;
          line-height: 65px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }
  .c-boxs {
    padding: 24px 22px 100px 22px;
    background-color: rgba(242, 242, 242, 1);
    .box {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 50px 0px rgba(204, 204, 204, 0.65);
      border-radius: 8px;
      font-size: 22px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 24px;
    }
    .box-good {
      .top {
        padding: 28px 21px 0 21px;
        .c-status {
          .yellow-circle {
            width: 16px;
            height: 16px;
            background: rgba(255, 203, 61, 1);
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
          .blue-circle {
            width: 16px;
            height: 16px;
            background: rgba(0, 159, 255, 1);
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
      .good {
        padding: 28px 21px 0 21px;
        margin-top: 35px;
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
      .btm {
        padding: 28px 21px 0 21px;
        text-align: end;
      }
      .btn-operation {
        text-align: center;
        margin-top: 20px;
        line-height: 72px;
        font-size: 24px;
        color: rgba(255, 255, 255, 1);
        height: 72px;
        background: linear-gradient(
          90deg,
          rgba(0, 159, 255, 1) 0%,
          rgba(0, 198, 255, 1) 100%
        );
        border-radius: 8px;
      }
    }
    .box-shipped {
      position: relative;
      .one {
        position: relative;
        .more {
          width: 100px;
          height: 50px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          box-shadow: 0px 8px 50px 0px rgba(204, 204, 204, 0.65);
          border-radius: 8px;
          position: absolute;
          line-height: 50px;
          text-align: center;
          right: 20px;
          font-size: 18px;
          top: 20px;
          .hide {
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            position: absolute;
            width: 100%;
            top: 55px;
            left: 0px;
            z-index: 10;
            div {
              height: 45px;
              box-shadow: 0px 8px 50px 0px rgba(153, 153, 153, 0.65);
            }
          }
        }
      }
      .logistics-info {
        margin-top: 30px;
        padding-left: 22px;
        .location {
          margin-right: 20px;
          font-weight: bold;
        }
      }
    }
    .box-refunded {
      padding-bottom: 30px;
    }
    .box-trading-information {
      .top {
        padding-left: 22px;
        padding-right: 22px;
        padding-top: 28px;
        .c-status {
          margin-bottom: 45px;
          .blue-circle {
            width: 16px;
            height: 16px;
            background: rgba(0, 159, 255, 1);
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
          .status {
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
        }
        .same {
          display: flex;
          justify-content: space-between;
          margin-bottom: 35px;
          .left {
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .right {
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
        }
        .info-total-price {
          .price {
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
        .last {
          margin-bottom: 18px;
        }
      }
      .btm-one {
        padding: 37px 22px 37px 22px;
        display: flex;
        justify-content: space-between;
        border-top: 2px solid rgba(238, 238, 238, 1);
        .describe {
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .price {
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
      .btm-two {
        border-top: 2px solid rgba(238, 238, 238, 1);
        padding: 29px 22px 30px 22px;
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
        padding: 29px 22px 30px 22px;
        display: flex;
        justify-content: space-between;
        font-weight: 400;
        color: #333333;
      }
    }
    .box-note {
      padding: 28px 22px 29px 22px;
      .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 57px;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .editor {
          font-weight: 400;
          color: rgba(0, 159, 255, 1);
        }
        .editor:hover {
          cursor: pointer;
        }
      }
      .note {
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
      }
    }
    .box-user-info {
      padding: 28px 22px 28px 22px;
      .c-name {
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .title {
          }
          .c-img {
            width: 50px;
            height: 50px;
            background: rgba(238, 238, 238, 1);
            border-radius: 50%;
          }
        }
        .name {
          margin-bottom: 35px;
          font-size: 20px;
          color: rgba(0, 159, 255, 1);
        }
      }
      .c-contact-information {
        .top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 36px;
          .editor {
            font-size: 20px;
            color: rgba(0, 159, 255, 1);
          }
        }
        .email {
          font-size: 20px;
          color: rgba(0, 159, 255, 1);
          margin-bottom: 31px;
        }
        .phone {
          font-size: 20px;
          color: rgba(0, 159, 255, 1);
        }
        .no-phone {
          font-size: 20px;
          color: rgba(137, 137, 137, 1);
        }
      }
    }
    .box-shipping-adress {
      padding: 28px 22px 28px 22px;
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
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 159, 255, 1);
          cursor: pointer;
        }
      }
    }
    .box-schedule {
      padding: 33px 22px 30px 140px;
      position: relative;
      ul {
        margin: 0;
      }
      .title {
        position: absolute;
        left: 40px;
        top: 30px;
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
          margin-right: 14px;
          float: left;
          span {
            width: 8px;
            height: 8px;
            background: rgba(113, 113, 113, 1);
            border-radius: 50%;
            display: inline-block;
            margin: auto;
            position: absolute;
            top: 2.8px;
            left: 2.8px;
          }
        }
        .info {
          max-width: 450px;
          margin-left: 13px;
          display: flex;
          justify-content: flex-start;
          .time {
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-right: 16px;
            width: 100px;
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
              padding: 14px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(149, 149, 149, 1);
              border-radius: 4px;
              display: inline-block;
              margin-left: 10px;
              font-size: 16px;
              font-weight: 400;
              color: rgba(0, 159, 255, 1);
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
  .addTraceInformation-modal-window {
    /deep/ .el-dialog {
      margin-top: 30vh !important;
    }
    .el-dialog__wrapper /deep/ .el-dialog__header {
      font-size: 22px;
      padding-bottom: 22px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 2px solid rgba(238, 238, 238, 1);
    }
    .el-dialog__wrapper /deep/ .el-dialog__body {
      .text1 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 24px;
      }
      .text2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 24px;
      }
      .text3 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .el-checkbox {
        margin-right: 14px;
      }
      .c-notify {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }
      .input-one {
        margin-bottom: 41px;
      }
    }
    .el-dialog__footer {
      .btn-cancel {
        margin-right: 24px;
      }
    }
    /deep/ .el-input {
      width: 100%;
    }
    .c-courier-select {
      margin-bottom: 30px;
      .couriers {
        width: 100%;
      }
      /deep/ .el-input__suffix {
        display: none;
      }
      /deep/ .couriers::after {
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
    }
  }
  // 备注模态窗
  .note-modal-window {
    /deep/ .el-dialog {
      margin-top: 30vh !important;
    }
    /deep/ .el-dialog__header {
      font-size: 16px;
      font-weight: 400;
      color: rgba(2, 2, 2, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      font-size: 22px;
      padding-bottom: 22px;
      color: rgba(1, 1, 1, 1);
      padding-top: 36px;
      padding-bottom: 27px;
    }
    .title {
      margin-bottom: 20px;
      color: rgb(51, 51, 51);
      font-size: 20px;
    }
    /deep/ .el-textarea__inner:focus {
      border-color: rgba(0, 159, 255, 1);
    }
    /deep/ .el-textarea__inner {
      border: 1px solid rgba(181, 181, 181, 1);
      border-radius: 4px;
    }
    .dialog-footer {
      .btn-cancel {
        margin-right: 24px;
      }
    }
  }
  // 用户信息模态窗
  .user-info-modal-window {
    /deep/ .el-dialog {
      margin-top: 30vh !important;
    }
    /deep/ .el-dialog__header {
      font-size: 22px;
      font-weight: 400;
      color: rgba(2, 2, 2, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      color: rgba(1, 1, 1, 1);
      padding-top: 36px;
      padding-bottom: 22px;
    }
    .label-email {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .label-phone {
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    .dialog-footer {
      .btn-cancel {
        margin-right: 24px;
      }
    }
    /deep/ .el-input {
      width: 100%;
    }
  }
}
p {
  margin: 0;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
// 模态窗样式修改
/deep/ .el-dialog {
  box-shadow: 0px 8px 50px 0px rgba(204, 204, 204, 0.65);
  border-radius: 8px;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 28px !important;
  padding-bottom: 28px !important;
  padding-left: 22px !important;
  padding-right: 22px !important;
}
// input样式修改
/deep/ .el-input__inner {
  background: #fff;
  border: 1px solid rgba(149, 149, 149, 1);
  border-radius: 4px;
  outline: rgba(0, 159, 255, 1);
  padding-left: 17px;
  height: 62px;
}
/deep/ .el-input__inner:focus {
  border: 1px solid rgba(0, 159, 255, 1);
}
/deep/ .el-input__inner:hover {
  border-color: rgba(0, 159, 255, 1);
}
</style>

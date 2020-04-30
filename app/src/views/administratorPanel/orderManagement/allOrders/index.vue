<template>
  <div class="c-index">
    <!-- 头部订单类型选择导航 -->
    <div class="top-nav">
      <span
        :class="{active:myRoute===item.forActive}"
        @click="orderChoose(item.forActive)"
        v-for="(item,index) in $t('lang.indexOfAllOrders.text1')"
        :key="index"
      >{{item.title}}</span>
      <span class="active" v-if="Object.keys($route.query).length > 0">条件查询</span>
    </div>
    <div class="content">
      <!-- 订单分类选择 -->
      <div class="c-search">
        <input v-model="conditionQuery.searchVal" type="text" placeholder="筛选订单" />
      </div>
      <div class="c-order-choose clearfix">
        <div class="f-hide" @click="state= !state">
          <span class="show">状态</span>
          <el-collapse-transition>
            <div class="hide" v-show="state">
              <div>
                <EdgCheckbox />未结
              </div>
              <div>
                <EdgCheckbox />隐藏
              </div>
              <div>
                <EdgCheckbox />已取消
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <div class="f-hide" @click="paymentStatusVisible= !paymentStatusVisible">
          <span class="show">付款状态</span>
          <el-collapse-transition>
            <div class="hide" v-show="paymentStatusVisible">
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.notPaying" />未付款
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.payment" />已付款
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.cancel" />已取消
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.refunded" />已退款
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.partPayment" />部分付款
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.partRefund" />部分退款
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <div class="f-hide" @click="deliveryStatusStatusVisible= !deliveryStatusStatusVisible">
          <span class="show no-border">发货状态</span>
          <el-collapse-transition>
            <div class="hide" v-show="deliveryStatusStatusVisible">
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.unshipped" />未发货
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.Shipped" />已发货
              </div>
              <div>
                <EdgCheckbox v-model="conditionQuery.Status.partShipment" />部分已发货
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <router-view :key="key" />
    </div>
  </div>
</template>
<script>
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
export default {
  components: {
    EdgCheckbox
  },
  data () {
    return {
      // ui
      state: false,
      paymentStatusVisible: false,
      deliveryStatusStatusVisible: false,
      // 变量
      queryField: {},
      timer: null,
      timer2: null,
      conditionQuery: {
        searchVal: '',
        Status: {
          notPaying: false,
          payment: false,
          cancel: false,
          refunded: false,
          partPayment: false,
          partRefund: false,
          unshipped: false,
          Shipped: false,
          partShipment: false
        }
      }
    }
  },
  computed: {
    myRoute () {
      let arr = this.$route.path.split('/')
      let lenth = arr.length
      return arr[lenth - 1]
    },
    key () {
      return this.$route.name
    }
  },
  watch: {
    conditionQuery: {
      handler (val) {
        // 监听对象变化，不会保存旧值
        this.judgeQueryField(val.Status)
        console.log(this.queryField)
        this.queryField.searchField = val.searchVal
        clearTimeout(this.timer) // 避免操作太快发起请求过多
        this.timer = setTimeout(() => {
          if (
            Object.keys(this.queryField).length > 1 ||
            this.queryField.searchField
          ) {
            this.$router.push({
              path:
                '/administratorPanel/orderManagement/indexOfAllOrders/conditionQueryTable',
              query: this.queryField
            })
          } else {
            this.$router.push({
              path:
                '/administratorPanel/orderManagement/indexOfAllOrders/allOrdersTable'
            })
          }
        }, 1000)
      },
      deep: true
    }
  },
  methods: {
    orderChoose (forActive) {
      clearTimeout(this.timer2)
      this.timer2 = setTimeout(() => {
        this.$router.push({
          path: `/administratorPanel/orderManagement/indexOfAllOrders/${forActive}`
        })
      }, 500)
    },
    judgeQueryField (a) {
      this.queryField = {}
      Object.keys(a).forEach(item => {
        if (a[item] === true) {
          this.queryField[item] = a[item]
        }
      })
    }
  },
  created () {
    // 刷新时候保留刷新前信息
    let query = this.$route.query
    if (Object.keys(this.$route.query).length > 0) {
      if (query.searchField) {
        this.conditionQuery.searchVal = this.$route.query.searchField
      }
      if (query.notPaying) {
        this.conditionQuery.Status.notPaying = true
      }
      if (query.payment) {
        this.conditionQuery.Status.payment = true
      }
      if (query.cancel) {
        this.conditionQuery.Status.cancel = true
      }
      if (query.refunded) {
        this.conditionQuery.Status.refunded = true
      }
      if (query.partPayment) {
        this.conditionQuery.Status.partPayment = true
      }
      if (query.partRefund) {
        this.conditionQuery.Status.partRefund = true
      }
      if (query.unshipped) {
        this.conditionQuery.Status.unshipped = true
      }
      if (query.Shipped) {
        this.conditionQuery.Status.Shipped = true
      }
      if (query.partShipment) {
        this.conditionQuery.Status.partShipment = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.c-index {
  background-color: rgba(242, 242, 242, 1);
  overflow-y: auto;
  height: calc(100vh - 78px);
  .top-nav {
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-around;
    font-size: 24px;
    color: rgba(81, 80, 80, 1);
    .active {
      color: rgba(253, 194, 88, 1);
      position: relative;
    }
    .active:after {
      position: absolute;
      top: 35px;
      left: 0;
      width: 100%;
      content: "";
      height: 2px;
      background-color: rgba(253, 194, 88, 1);
    }
  }
  .content {
    padding-left: 22px;
    padding-right: 22px;
    .c-search {
      input {
        width: calc(100% - 70px);
        height: 66px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 16px 50px 0px rgba(241, 241, 241, 0.65);
        border-radius: 6px;
        outline: none;
        border: none;
        padding-left: 70px;
      }
      input::-ms-clear,
      input::-ms-reveal {
        display: none;
      }
      input::-webkit-input-placeholder {
        font-size: 24px;
        color: rgba(153, 153, 153, 1);
      }
      input::-moz-placeholder {
        font-size: 16px;
        color: rgba(153, 153, 153, 1);
      }
      input::-ms-input-placeholder {
        font-size: 16px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .c-order-choose {
      width: 706px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 16px 50px 0px rgba(241, 241, 241, 0.65);
      border-radius: 6px;
      padding-top: 13px;
      padding-bottom: 13px;
      border-top: 1px solid #dedede;
      margin-bottom: 40px;
      .f-hide {
        position: relative;
        text-align: center;
        font-size: 24px;
        width: 33.33%;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      .show {
        height: 40px;
        line-height: 40px;
        border-right: 1px solid rgba(204, 204, 204, 1);
        width: 100%;
        display: inline-block;
      }
      .no-border {
        border-right: none;
      }
      .hide {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 100%;
        top: 57px;
        left: 0px;
        z-index: 10;
        div {
          text-align: start;
          padding-left: 50px;
          height: 80px;
          line-height: 80px;
          background-color: #fff;
          //   text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
          cursor: pointer;
        }
      }
    }
  }
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
p {
  margin: 0;
}
</style>

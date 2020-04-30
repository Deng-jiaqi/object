<template>
  <div class="c-all-orders">
    <div class="c-top">
      <span class="title">{{$t('lang.indexofEffectiveOrders.text1')}}</span>
      <span class="back" @click="back">
        <span class="iconfont icon-fanhui1"></span>
        {{$t('lang.indexofEffectiveOrders.text2')}}
      </span>
    </div>
    <div class="nav clearfix">
      <span
        v-for="(item,index) in $t('lang.indexofEffectiveOrders.text3')"
        :key="index"
        @click="orderChoose(item.href)"
        :class="{active:myRoute===item.forActive}"
      >{{item.title}}</span>
      <span
        v-if="Object.keys($route.query).length > 0"
        class="active"
      >{{$t('lang.indexofEffectiveOrders.text5')}}</span>
    </div>
    <div class="c-operation">
      <el-input
        prefix-icon="iconfont icon-sousuo4"
        v-model="conditionQuery.searchVal"
        :placeholder="$t('lang.indexofEffectiveOrders.text4')"
      />
      <!-- <div
        class="same operation"
        @mouseenter="operationVisible= true"
        @mouseleave="operationVisible= false"
      >
        <span>{{$t('lang.indexofEffectiveOrders.text6')}}</span>
        <el-collapse-transition>
          <div class="hide-one" v-show="operationVisible">
            <div>{{$t('lang.indexofEffectiveOrders.text7')}}</div>
            <div>{{$t('lang.indexofEffectiveOrders.text8')}}</div>
          </div>
        </el-collapse-transition>
      </div>-->
      <div class="mask" v-show="paymentStatusVisible" @click="paymentStatusVisible=false"></div>
      <div class="same payment-status" @click="paymentStatusVisible=!paymentStatusVisible">
        <span>{{$t('lang.indexofEffectiveOrders.text9')}}</span>
        <el-collapse-transition>
          <div class="hide-two" v-show="paymentStatusVisible">
            <div>
              <el-checkbox v-model="conditionQuery.Status.notPaying" />
              {{$t('lang.indexofEffectiveOrders.text10')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.payment" />
              {{$t('lang.indexofEffectiveOrders.text11')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.cancel" />
              {{$t('lang.indexofEffectiveOrders.text12')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.refunded" />
              {{$t('lang.indexofEffectiveOrders.text13')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.partPayment" />
              {{$t('lang.indexofEffectiveOrders.text14')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.partRefund" />
              {{$t('lang.indexofEffectiveOrders.text15')}}
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="mask" v-show="deliveryStatusStatusVisible" @click="deliveryStatusStatusVisible=false"></div>
      <div class="same delivery-status" @click="deliveryStatusStatusVisible=!deliveryStatusStatusVisible">
        <span>{{$t('lang.indexofEffectiveOrders.text16')}}</span>
        <el-collapse-transition>
          <div class="hide-three" v-show="deliveryStatusStatusVisible">
            <div>
              <el-checkbox v-model="conditionQuery.Status.unshipped" />
              {{$t('lang.indexofEffectiveOrders.text17')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.Shipped" />
              {{$t('lang.indexofEffectiveOrders.text18')}}
            </div>
            <div>
              <el-checkbox v-model="conditionQuery.Status.partShipment" />
              {{$t('lang.indexofEffectiveOrders.text19')}}
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <router-view :key="key" />
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      // 变量
      inConditionQuery: false,
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
      },
      // ui
      operationVisible: false,
      paymentStatusVisible: false,
      deliveryStatusStatusVisible: false
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
            this.inConditionQuery = true
            this.$router.push({
              path:
                '/administratorPanel/orderManagement/effectiveOrders/conditionQueryTable',
              query: this.queryField
            })
          } else {
            if (this.inConditionQuery) {
              this.$router.push({
                path:
                  '/administratorPanel/orderManagement/effectiveOrders/allOrdersTable'
              })
              this.inConditionQuery = false
            }
          }
          this.paymentStatusVisible = false
          this.deliveryStatusStatusVisible = false
        }, 1000)
      },
      deep: true
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
  methods: {
    back () {
      this.$router.go(-1)
    },
    orderChoose (href) {
      this.inConditionQuery = false
      clearTimeout(this.timer2)
      this.timer2 = setTimeout(() => {
        this.conditionQuery = {
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
        this.$router.push({
          path: href
        })
      }, 500)
    },
    judgeQueryField (a) {
      // 判断有哪些字段为true
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
.c-all-orders {
  padding-top: 40px;
  padding-bottom: 75px;
  .c-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 31px;
    padding-right: 12px;
    .title {
      font-size: 30px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .back {
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
      .icon-fanhui1 {
        font-size: 14px;
      }
    }
  }
  .nav {
    padding-left: 36px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    border-radius: 4px;
    padding-right: 36px;
    span {
      font-size: 18px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 70px;
      height: 67px;
      display: block;
      float: left;
      margin-right: 80px;
      cursor: pointer;
    }
    span:last-child {
      margin-right: 0;
    }
  }
  .back:hover {
    cursor: pointer;
  }
  .c-operation {
    padding-top: 18px;
    padding-bottom: 18px;
    border: 1px solid rgba(222, 222, 222, 1);
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding-left: 27px;
    /deep/ .el-input {
      width: 52.6%;
    }
    /deep/ .el-input__inner {
      height: 58px;
    }
    @media (max-width: 1150px) {
      /deep/ .el-input {
        width: calc(100% - 67px);
        display: block;
        margin-bottom: 10px;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0;
    }
    .same {
      background: rgba(248, 248, 248, 1);
      border: 1px solid #dedede;
      padding-left: 40px;
      padding-right: 39px;
      line-height: 58px;
      font-size: 14px;
      height: 56px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      top: 1px;
      display: inline-block;
    }
    .operation {
      border-left: none;
      span:hover {
        cursor: pointer;
      }
      .hide-one {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 100%;
        top: 57px;
        left: 0px;
        z-index: 10;
        div {
          text-align: center;
          height: 50px;
          line-height: 50px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
          cursor: pointer;
        }
      }
    }
    .payment-status {
      border-left: none;
      span:hover {
        cursor: pointer;
      }
      .hide-two {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 90%;
        padding-left: 5%;
        padding-right: 5%;
        top: 57px;
        left: 0px;
        z-index: 3000;
        div {
          // text-align: center;
          text-align: start;
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
        }
        div:hover {
          cursor: pointer;
        }
      }
    }
    .delivery-status {
      border-left: none;
      span:hover {
        cursor: pointer;
      }
      .hide-three {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 90%;
        padding-left: 5%;
        padding-right: 5%;
        top: 57px;
        left: 0px;
        z-index: 3000;
        div {
          text-align: start;
          height: 50px;
          line-height: 50px;
          background-color: #fff;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
        }
        div:hover {
          cursor: pointer;
        }
      }
    }
    .el-checkbox {
      margin-right: 6px;
    }
  }
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
}
.active {
  position: relative;
}
.active::after {
  display: "block";
  content: "";
  background: rgba(253, 165, 6, 1);
  width: 50px;
  height: 7px;
  position: absolute;
  top: 60px;
  left: calc(50% - 25px);
}
</style>

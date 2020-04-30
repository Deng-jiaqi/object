<template>
  <div class="c-all-orders">
    <div class="c-top">
      <span @click="back" class="iconfont icon-fanhui1"></span>
      <span class="title">{{$t('lang.indexofEffectiveOrders.text1')}}</span>
    </div>
    <div class="c-navs">
      <div
        @click="orderChoose($t('lang.indexofEffectiveOrders.text3[0].href'))"
        :class="{active:myRoute===$t('lang.indexofEffectiveOrders.text3[0].forActive')}"
        class="nav"
      >{{$t('lang.indexofEffectiveOrders.text3[0].title')}}</div>
      <div
        v-if="!Object.keys($route.query).length > 0"
        @click="orderChoose($t('lang.indexofEffectiveOrders.text3[1].href'))"
        :class="{active:myRoute===$t('lang.indexofEffectiveOrders.text3[1].forActive')}"
        class="nav"
      >{{$t('lang.indexofEffectiveOrders.text3[1].title')}}</div>
      <div
        v-if="Object.keys($route.query).length > 0"
        class="nav active"
      >{{$t('lang.indexofEffectiveOrders.text5')}}</div>
      <el-popover
        v-model="PopoverVisible"
        :visible-arrow="false"
        placement="bottom"
        popper-class="popper-order-choose"
      >
        <div
          class="list"
          @click="orderChoose($t('lang.indexofEffectiveOrders.text3[2].href'))"
        >{{$t('lang.indexofEffectiveOrders.text3[2].title')}}</div>
        <div
          class="list"
          @click="orderChoose($t('lang.indexofEffectiveOrders.text3[3].href'))"
        >{{$t('lang.indexofEffectiveOrders.text3[3].title')}}</div>
        <div class="nav" slot="reference">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </el-popover>
    </div>
    <div class="c-operation">
      <el-input
        prefix-icon="iconfont icon-sousuo4"
        v-model="conditionQuery.searchVal"
        :placeholder="$t('lang.indexofEffectiveOrders.text4')"
      />
      <div
        class="same"
        @click="screeningVisible=true"
      >{{$t('lang.indexofEffectiveOrders.screening')}}</div>
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
      <!-- <div class="same payment-status" @click="paymentStatusVisible=!paymentStatusVisible">
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
      <div
        class="same delivery-status"
        @click="deliveryStatusStatusVisible=!deliveryStatusStatusVisible"
      >
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
      </div>-->
    </div>
    <router-view :key="key" />
    <!-- 筛选模态窗 -->
    <div class="modal-screening">
      <el-dialog
        :title="$t('lang.indexofEffectiveOrders.screening')"
        :visible.sync="screeningVisible"
        width="100%"
      >
        <el-collapse>
          <el-collapse-item :title="$t('lang.indexofEffectiveOrders.text9')" name="1">
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
          </el-collapse-item>
          <el-collapse-item :title="$t('lang.indexofEffectiveOrders.text16')" name="2">
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
            <div>
              <el-checkbox v-model="conditionQuery.Status.received" />
              {{$t('lang.indexofEffectiveOrders.text27')}}
            </div>
          </el-collapse-item>
        </el-collapse>
        <span slot="footer">
          <el-button
            plain
            @click="screeningVisible=false"
          >{{$t('lang.indexofEffectiveOrders.text20')}}</el-button>
        </span>
      </el-dialog>
    </div>
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
          partShipment: false,
          received: false
        }
      },
      // ui
      operationVisible: false,
      paymentStatusVisible: false,
      deliveryStatusStatusVisible: false,
      PopoverVisible: false,
      screeningVisible: false
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
      this.PopoverVisible = false
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
  padding-top: 32px;
  .c-top {
    margin-bottom: 30px;
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
    }
  }
  .c-navs {
    padding-left: 35px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    border-radius: 4px;
    padding-right: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    .nav {
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      position: relative;
      .circle {
        width: 7px;
        height: 7px;
        background-color: #637381;
        border-radius: 50%;
        display: inline-block;
        margin-right: 4px;
      }
    }
  }
  .back:hover {
    cursor: pointer;
  }
  .c-operation {
    border: 1px solid rgba(222, 222, 222, 1);
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 18px 15px 18px 15px;
    /deep/ .el-input {
      width: calc(100% - 82px);
    }
    /deep/ .el-input__inner {
      height: 58px;
    }
    .same {
      background: rgba(248, 248, 248, 1);
      border: 1px solid #dedede;
      width: 80px;
      text-align: center;
      line-height: 58px;
      font-size: 14px;
      height: 56px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      top: 1px;
      display: inline-block;
      border-left: none;
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
  }
}
.modal-screening {
  /deep/ .el-dialog {
    width: 100% !important;
    position: absolute !important;
    bottom: 0;
    margin: 0;
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
  top: 30px;
  left: calc(50% - 25px);
}
.popper-order-choose {
  .list {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>

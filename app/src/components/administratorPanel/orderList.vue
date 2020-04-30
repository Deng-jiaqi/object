<template>
  <!-- 订单列表 -->
  <ul class="c-orders">
    <li class="order" v-for="(item,index) in tableData" :key="index">
      <div class="c-roundCheckbox">
        <EdgCheckbox :shape="'round'" />
      </div>
      <div class="order-top">
        <div class="left">
          <div class="order-number" @click='toDetail(item.orderid)'>编号:&nbsp;&nbsp;{{item.ordernum}}</div>
          <div>客户:&nbsp;&nbsp;{{item.client_name}}</div>
        </div>
        <div class="right">
          <div class="paymentStatus">{{item.order_status}}</div>
          <div>{{item.post_status}}</div>
        </div>
        <div class="note">备注:{{item.comment}}</div>
      </div>
      <div class="order-btm">
        <div class="left">{{item.createtime}}</div>
        <div class="right">${{item.totalprice}}</div>
      </div>
    </li>
  </ul>
</template>
<script>
import EdgCheckbox from '@/components/administratorPanel/edgCheckbox'
import { getOrdersList } from '@/common/api/api'
export default {
  components: {
    EdgCheckbox
  },
  data () {
    return {
      // 变量
      paymentArray: [], // 付款状态条件组成的数组
      deliveryArray: [], // 发货状态组成的数组
      tableData: []
    }
  },
  computed: {
    myRoute () {
      let arr = this.$route.path.split('/')
      let lenth = arr.length
      return arr[lenth - 1]
    }
  },
  watch: {
    '$route.query': {
      handler (val) {
        console.log(val, 666)
        this.inQueryGetTableList()
      }
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        path: '/administratorPanel/orderManagement/orderDetails',
        query: {
          orderid: id
        }
      })
    },
    getOrdersList (param) {
      getOrdersList(param).then(res => {
        console.log(res)
        this.tableData = res.data.data.data
      })
    },
    getTableList () { // 无查询条件时获取表格数据
      switch (this.myRoute) {
        case 'allOrdersTable':
          this.getOrdersList({ tab_type: 0 })
          break
        case 'notPayingTable':
          this.getOrdersList({ tab_type: 1 })
          break
        case 'paymentNotDeliveredTable':
          this.getOrdersList({ tab_type: 2 })
          break
        case 'paymentAndDeliveredTable':
          this.getOrdersList({ tab_type: 3 })
          break
        default:
          break
      }
    },
    inQueryGetTableList () { // 有查询条件时获取表格数据
      this.paymentArray = []
      this.deliveryArray = []
      let query = this.$route.query
      if (query.notPaying) {
        this.paymentArray.push(0)
      }
      if (query.payment) {
        this.paymentArray.push(1)
      }
      if (query.cancel) {
        this.paymentArray.push(2)
      }
      if (query.refunded) {
        this.paymentArray.push(3)
      }
      if (query.partPayment) {
        this.paymentArray.push(4)
      }
      if (query.partRefund) {
        this.paymentArray.push(5)
      }
      if (query.unshipped) {
        this.deliveryArray.push(0)
      }
      if (query.Shipped) {
        this.deliveryArray.push(1)
      }
      if (query.partShipment) {
        this.deliveryArray.push(2)
      }
      this.getOrdersList({
        pay_status: this.paymentArray,
        deliver_status: this.deliveryArray,
        input_search: this.$route.query.searchField
      })
    }
  },
  created () {
    if (Object.keys(this.$route.query).length > 0) {
      this.inQueryGetTableList()
    } else {
      this.getTableList()
    }
  }
}
</script>
<style  lang="less"  scoped>
.c-orders {
  border-top: 1px solid rgb(234, 236, 239);
  .order {
    padding-top: 60px;
    padding-bottom: 40px;
    background-color: #fff;
    font-size: 22px;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 24px;
    padding-left: 60px;
    padding-right: 20px;
    border-radius: 24px;
    position: relative;
    .c-roundCheckbox {
      position: absolute;
      top: 20px;
      left: 10px;
    }
    .order-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 26px;
      .left {
        .order-number {
          color: #385ca5;
          margin-bottom: 13px;
        }
      }
      .right {
        .paymentStatus {
          margin-bottom: 13px;
        }
      }
      .note {
        width: 100%;
        margin-top: 13px;
      }
    }
    .order-btm {
      display: flex;
      justify-content: space-between;
    }
  }
}
ul {
  margin: 0;
}
</style>

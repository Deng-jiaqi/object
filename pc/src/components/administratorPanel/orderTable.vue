<template>
  <div class="c-orders-table" v-loading="loadingVisible">
    <el-table
      :empty-text="$t('lang.indexofEffectiveOrders.table.text8')"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 订单号 -->
      <el-table-column :label="$t('lang.indexofEffectiveOrders.table.text1')">
        <template slot-scope="scope">
          <span @click="toOrderDetails(scope.row)" class="serialNumber">{{scope.row.ordernum}}</span>
        </template>
      </el-table-column>
      <!-- 日期 -->
      <el-table-column prop="createtime" :label="$t('lang.indexofEffectiveOrders.table.text2')"></el-table-column>
      <!-- 客户 -->
      <el-table-column prop="client_name" :label="$t('lang.indexofEffectiveOrders.table.text3')"></el-table-column>
      <!-- 总金额 -->
      <el-table-column :label="$t('lang.indexofEffectiveOrders.table.text4')">
        <template slot-scope="scope">
          <span class="bold">${{scope.row.totalprice}}</span>
        </template>
      </el-table-column>
      <!-- 付款方式 -->
      <el-table-column :label="$t('lang.indexofEffectiveOrders.table.text12')">
        <template slot-scope="scope">
          <span v-show="scope.row.paymethod===1">{{$t('lang.indexofEffectiveOrders.text20')}}</span>
          <span v-show="scope.row.paymethod===2">{{$t('lang.indexofEffectiveOrders.text21')}}</span>
          <span v-show="scope.row.paymethod===3">{{$t('lang.indexofEffectiveOrders.text22')}}</span>
        </template>
      </el-table-column>
      <!-- 付款状态下拉框 -->
      <el-table-column :label="$t('lang.indexofEffectiveOrders.table.text5')">
        <template slot-scope="scope">
          <span v-show="scope.row.pay_status===0">{{$t('lang.indexofEffectiveOrders.text10')}}</span>
          <span v-show="scope.row.pay_status===1">{{$t('lang.indexofEffectiveOrders.text11')}}</span>
          <span v-show="scope.row.pay_status===2">{{$t('lang.indexofEffectiveOrders.text12')}}</span>
          <span v-show="scope.row.pay_status===3">{{$t('lang.indexofEffectiveOrders.text13')}}</span>
          <span v-show="scope.row.pay_status===4">{{$t('lang.indexofEffectiveOrders.text14')}}</span>
          <span v-show="scope.row.pay_status===5">{{$t('lang.indexofEffectiveOrders.text15')}}</span>
        </template>
      </el-table-column>
      <!-- 交易状态 -->
      <el-table-column :label="$t('lang.indexofEffectiveOrders.table.text6')">
        <template slot-scope="scope">
          <span v-show="scope.row.deliver_status===0">{{$t('lang.indexofEffectiveOrders.text17')}}</span>
          <span v-show="scope.row.deliver_status===1">{{$t('lang.indexofEffectiveOrders.text18')}}</span>
          <span v-show="scope.row.deliver_status===2">{{$t('lang.indexofEffectiveOrders.text19')}}</span>
        </template>
      </el-table-column>
      <!-- 确认收款按钮 -->
      <el-table-column :label="$t('lang.indexofEffectiveOrders.table.text10')">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.pay_status===0&&scope.row.paymethod===3"
            class="queren"
            type="text"
            @click="openConfirmReceiptModalWindow(scope.row,scope.$index)"
          >{{$t('lang.indexofEffectiveOrders.table.text11')}}</el-button>
        </template>
      </el-table-column>
      <!-- 备注 -->
      <el-table-column prop="comment" :label="$t('lang.indexofEffectiveOrders.table.text7')"></el-table-column>
    </el-table>

    <div class="c-pagination">
      <el-pagination
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-count="pagenum"
      ></el-pagination>
    </div>
    <!-- 确定收款模态窗 -->
    <el-dialog
      :title="$t('lang.indexofEffectiveOrders.text24')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{$t('lang.indexofEffectiveOrders.text23')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('lang.indexofEffectiveOrders.text26')}}</el-button>
        <!-- 确认点击 -->
        <el-button
          type="primary"
          @click="confirmReceipt"
        >{{$t('lang.indexofEffectiveOrders.text25')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getOrdersList, receipt } from '../../common/api/api'
import messageAlert from '@/utils/messageAlert'
export default {
  name: 'Table',
  inject: ['reload'],
  data () {
    return {
      // 变量
      paymethod: '',
      operationalOrderid: '', // 获取正在操作的当前订单id
      operationalOrderidIndex: 0,
      paymentArray: [], // 付款状态条件组成的数组
      deliveryArray: [], // 发货状态组成的数组
      // confirmObj: {},
      tableData: [],
      currentPage: 1,
      pagenum: 1, // 页码总数
      // ui
      loadingVisible: true,
      dialogVisible: false

    }
  },
  watch: {
    '$route.query': {
      handler (val) {
        this.inQueryGetTableList()
      }
    }

  },
  computed: {
    routerInfo () {
      let arr = this.$route.path.split('/')
      let lenth = arr.length
      return arr[lenth - 1]
    }
  },
  methods: {
    getOrdersList (param) {
      this.loadingVisible = true
      getOrdersList(param).then(res => {
        console.log(res)
        this.loadingVisible = false
        this.tableData = res.data.data.data
        this.currentPage = parseInt(res.data.data.page.currentpage, 0)
        this.pagenum = res.data.data.page.pagenum
      })
    },
    handleSelectionChange (val) {
      // console.log(val)
    },
    toOrderDetails (info) {
      this.$router.push({
        path: '/administratorPanel/orderManagement/orderDetails',
        query: {
          orderid: info.orderid
        }
      })
    },
    getTableList () {
      // 无查询条件时获取表格数据
      switch (this.routerInfo) {
        case 'allOrdersTable':
          this.getOrdersList({
            pagasize: 5,
            tab_type: 0,
            page: this.currentPage
          })
          break
        case 'notPayingTable':
          this.getOrdersList({
            pagasize: 5,
            tab_type: 1,
            page: this.currentPage
          })
          break
        case 'paymentNotDeliveredTable':
          this.getOrdersList({
            pagasize: 5,
            tab_type: 2,
            page: this.currentPage
          })
          break
        case 'paymentAndDeliveredTable':
          this.getOrdersList({
            pagasize: 5,
            tab_type: 3,
            page: this.currentPage
          })
          break
        default:
          break
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (Object.keys(this.$route.query).length > 0) {
        this.inQueryGetTableList()
      } else {
        this.getTableList()
      }
    },
    inQueryGetTableList () {
      // 有查询条件时获取表格数据
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
        pagasize: 1,
        page: this.currentPage,
        pay_status: this.paymentArray,
        deliver_status: this.deliveryArray,
        input_search: this.$route.query.searchField
      })
    },
    openConfirmReceiptModalWindow (rowData, rowIndex) {
      this.dialogVisible = true
      console.log(rowData)
      this.operationalOrderid = rowData.orderid
      this.operationalOrderidIndex = rowIndex
    },
    // 确认收款
    async  confirmReceipt () {
      let res = await receipt({
        orderid: this.operationalOrderid
      })
      messageAlert(res)
      if (res.data.code === 1) {
        this.dialogVisible = false
        this.$set(this.tableData[this.operationalOrderidIndex], 'pay_status', res.data.data.order_status.pay_status)
      }
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
<style lang="less" scoped>
.c-orders-table {
  margin-top: 18px;
  .el-table {
    .bold {
      font-weight: bold;
    }
  }
}
.serialNumber:hover {
  cursor: pointer;
}
.serialNumber {
  font-size: 16px;
  font-weight: 400;
  color: rgba(56, 92, 165, 1);
}
p {
  margin: 0;
}
.queren {
  border: none;
  background-color: rgba(66, 103, 178);
  color: #ffffff;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 6px;
}
.not-exist {
  display: inline-block;
  width: 13px;
  height: 2px;
  background-color: rgba(51, 51, 51, 1);
}
.c-pagination {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
}
// 表格样式修改
.el-table /deep/ .has-gutter th {
  text-align: center;
  background-color: rgba(238, 238, 238, 1);
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.el-table /deep/ .el-table__body-wrapper .el-table__body tbody td {
  text-align: center;
  font-size: 16px;
  line-height: 60px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.el-table--enable-row-hover /deep/ .el-table__body tr:hover > td {
  background-color: #f4f4f4 !important;
}
// 分页样式修改
/deep/ .el-pagination button:disabled {
  background: #f5f6f8;
}
/deep/ .el-pagination button {
  background-color: #f5f6f8;
}
/deep/ .el-pager li {
  background-color: #f5f6f8;
}
/deep/ .el-pager li:hover {
  color: #4267b2;
}
</style>

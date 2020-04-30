<template>
  <div>
    <el-table
      :empty-text="$t('lang.indexofEffectiveOrders.table.text8')"
      v-loading="tableVisible"
      :data="tableData"
      :class="tableVisible?'loadingHeight':''"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="table-expand">
            <el-form-item :label="$t('lang.indexOfDiscount.text26')">
              <span>{{ scope.row.code}}</span>
            </el-form-item>
            <el-form-item :label="$t('lang.indexOfDiscount.text27')">
              <span v-show="scope.row.status===0">{{$t('lang.indexOfDiscount.text24')}}</span>
              <span v-show="scope.row.status===1">{{$t('lang.indexOfDiscount.text25')}}</span>
            </el-form-item>
            <el-form-item :label="$t('lang.indexOfDiscount.text28')">
              <span>{{ scope.row.desc}}</span>
            </el-form-item>
            <el-form-item :label="$t('lang.indexOfDiscount.text29')">
              <span>{{ scope.row.usenum}}</span>
            </el-form-item>
            <el-form-item :label="$t('lang.indexOfDiscount.text30')">
              <span>{{ scope.row.start_time}}</span>
            </el-form-item>
            <el-form-item :label="$t('lang.indexOfDiscount.text31')">
              <span>{{ scope.row.end_time}}</span>
              <span v-show='!scope.row.end_time'>{{$t('lang.indexOfDiscount.text32')}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div class="discount-code" @click="toDetail(scope.row.Id)">{{scope.row.code}}</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div v-show="scope.row.status===0">
            <span class="blue-circle"></span>
            {{$t('lang.indexOfDiscount.text24')}}
          </div>
          <div v-show="scope.row.status===1">
            <span class="yellow-circle"></span>
            {{$t('lang.indexOfDiscount.text25')}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getDiscountsList } from '@/common/api/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 变量
      type: null,
      status: null,
      timer: null,
      timer2: null,
      // data
      tableData: [],
      // ui
      tableVisible: false
    }
  },
  watch: {
    '$route.query': {
      handler (val) {
        if (val.status) {
          console.log('状态变了')
          this.judgeStatus(val)
          clearTimeout(this.timer) // 防止切换过快
          this.timer = setTimeout(() => {
            this.getDiscountsList({
              total_type: this.type,
              status: this.status
            })
          }, 1000)
        }
        if (val.searchVal) {
          clearTimeout(this.timer2)
          this.timer2 = setTimeout(() => {
            this.getDiscountsList({
              total_type: this.type,
              input_code: val.searchVal
            })
          }, 1000)
        }
      },
      deep: true
    },
    afterDiscountOperation: {
      // 折扣操作完成之后刷新数据
      handler (val) {
        console.log(val)
        if (val) {
          console.log(666)
          if (this.$route.query.searchVal) {
            this.getDiscountsList({
              total_type: this.type,
              input_code: this.$route.query.searchVal
            })
          }
          if (this.$route.query.status) {
            this.getDiscountsList({
              total_type: this.type,
              status: this.status
            })
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['afterDiscountOperation']),
    myRouter () {
      let arr = this.$route.path.split('/')
      let lenth = arr.length
      return arr[lenth - 1].split('?')[0]
    }
  },
  methods: {
    ...mapMutations(['forSelectedRows']),
    handleSelectionChange (val) {
      console.log(val)
      this.forSelectedRows(val)
    },
    getDiscountsList (param) {
      this.tableVisible = true
      getDiscountsList(param).then(res => {
        console.log(res)
        this.tableVisible = false
        this.tableData = res.data.data
      })
    },
    toDetail (id) {
      console.log(this.myRouter)
      switch (this.myRouter) {
        case 'discountCode':
          this.$router.push({
            path: '/administratorPanel/discount/discountCode',
            query: {
              id: id
            }
          })
          break
        case 'automaticDiscount':
          this.$router.push({
            path: '/administratorPanel/discount/automaticDiscount',
            query: {
              id: id
            }
          })
          break

        default:
          break
      }
    },
    judgeType () {
      switch (this.myRouter) {
        case 'discountCode':
          this.type = 0
          break
        case 'automaticDiscount':
          this.type = 1
          break
        default:
          break
      }
    },
    judgeStatus (val) {
      switch (val.status) {
        case 'all':
          this.status = null
          break
        case 'active':
          this.status = 1
          break
        case 'haveArranged':
          this.status = 10
          break
        case 'expired':
          this.status = 0
          break
        default:
          break
      }
    }
  },
  created () {
    this.judgeType()
    console.log(this.type)
    if (this.$route.query.searchVal) {
      console.log('搜索ing')
      this.getDiscountsList({
        total_type: this.type,
        input_code: this.searchVal
      })
    }
    if (this.$route.query.status) {
      console.log('选择ing')
      this.judgeStatus(this.$route.query)
      this.getDiscountsList({
        total_type: this.type,
        status: this.status
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .table-expand {
  .el-form-item__label {
    color: #99a9bf;
  }
}
.loadingHeight {
  height: 300px;
}
.discount-code {
  color: #4267b2;
  cursor: pointer;
}
.blue-circle {
  width: 10px;
  height: 10px;
  background: #4267b2;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.yellow-circle {
  width: 10px;
  height: 10px;
  background: rgba(255, 203, 61, 1);
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
// 表格样式修改
/deep/ .el-table__header-wrapper {
  display: none;
}
.el-table /deep/ .has-gutter th {
  text-align: center;
  background-color: rgba(238, 238, 238, 1);
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.el-table /deep/ .el-table__body-wrapper .el-table__body tbody td {
  //   text-align: center;
  font-size: 16px;
  line-height: 60px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-top: 40px;
  padding-bottom: 40px;
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

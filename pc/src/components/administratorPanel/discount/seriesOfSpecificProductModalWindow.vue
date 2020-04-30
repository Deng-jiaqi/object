<template>
  <el-dialog
    :show-close="true"
    :title="$t('lang.discountcode.text75')"
    :visible.sync="modalWindowVisible"
    class="adress-window"
    width="40%"
  >
    <div class="c-search">
      <el-input v-model="mySearch" :placeholder="$t('lang.discountcode.text76')"></el-input>
    </div>
    <div class="c-products" v-loading="loading">
      <!-- 非搜索界面的数据 -->
      <ul v-show="!inSearch&&tableData.length">
        <li v-for="(item,index) in tableData" :key="index">
          <div class="product-info">
            <div class="left">
              <el-checkbox v-model="item.isSelect" @change='handlerCheckboxChange'/>
              <img :src="item.img" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- 搜索界面的数据 -->
      <ul v-show="inSearch&&searchedtableData.length">
        <li v-for="(item,index) in searchedtableData" :key="index">
          <div class="product-info">
            <div class="left">
              <el-checkbox v-model="item.isSelect" />
              <img :src="item.img" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="none"
        v-show="!tableData.length&&!searchedtableData.length"
      >{{$t('lang.discountcode.text77')}}</div>
    </div>
    <span slot="footer">
      <div
        class="selected-num"
        v-show="selectedNum"
      >{{$t('lang.discountcode.text124')}}&nbsp;&nbsp;{{selectedNum}}</div>
      <el-button
        plain
        @click="modalWindowVisible=false"
        v-show="!inSearch"
      >{{$t('lang.discountcode.text78')}}</el-button>
      <el-button type="primary" v-show="!inSearch" @click="save">{{$t('lang.discountcode.text79')}}</el-button>
      <el-button plain @click="inSearch=false" v-show="inSearch">{{$t('lang.discountcode.text78')}}</el-button>
      <el-button
        type="primary"
        v-show="inSearch"
        @click="saveSearchTerms"
      >{{$t('lang.discountcode.text123')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getSeriedOfSpecificProductInformation } from '@/common/api/api.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'SeriesOfSpecificProductModalWindow',
  components: {},
  data () {
    return {
      // 变量
      timer: null,
      inSearch: false,
      selectedNum: 0,
      // data
      tableData: [],
      searchedtableData: [],
      // ui
      modalWindowVisible: false,
      loading: false
    }
  },
  computed: {
    ...mapState(['clickTime']),
    ...mapState(['seriesOfSpecific_modal_search']),
    ...mapState(['percent_selectedSeriesOfSpecificProducts']),
    ...mapState(['fixed_selectedSeriesOfSpecificProducts']),
    ...mapState(['buy_selectedSeriesOfSpecificProducts']),
    ...mapState(['get_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_percent_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_fixed_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_buy_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_get_selectedSeriesOfSpecificProducts']),
    // v-model绑定vuex的值
    mySearch: {
      get () {
        return this.$store.state.seriesOfSpecific_modal_search
      },
      set (newval) {
        this.$store.commit('forSeriesOfSpecific_modal_search', newval)
      }
    }
  },
  watch: {
    seriesOfSpecific_modal_search: {
      handler (val) {
        clearTimeout(this.timer)
        this.loading = true
        this.inSearch = true
        this.searchedtableData = []
        this.timer = setTimeout(async () => {
          if (!this.tableData.length) {
            let res1 = await getSeriedOfSpecificProductInformation()
            this.tableData = res1.data.data
            this.initializeTableData(this.tableData)
          }
          let res2 = await getSeriedOfSpecificProductInformation({
            collect_name: val
          })
          console.log(res2)
          this.loading = false
          this.searchedtableData = res2.data.data
          this.initializeTableData(this.searchedtableData)
        }, 1000)
      }
    },
    modalWindowVisible: {
      async handler (val) {
        this.loading = true
        this.tableData = []
        if (val && !this.seriesOfSpecific_modal_search) {
          let res = await getSeriedOfSpecificProductInformation()
          this.loading = false
          console.log(res)
          this.tableData = res.data.data
          this.initializeTableData(this.tableData)
        }
        if (!val) {
          this.forSeriesOfSpecific_modal_search(null)
        }
      }
    }
  },
  methods: {
    handlerCheckboxChange () {
      this.selectedNum = 0
      this.tableData.forEach(item => {
        if (item.isSelect) {
          this.selectedNum += 1
        }
      })
    },
    // 初始化tableData
    initializeTableData (initializeTarget) {
      switch (this.clickTime) {
        case 'percent':
          if (this.percent_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.percent_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'fixed':
          if (this.fixed_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.fixed_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'buy':
          if (this.buy_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.buy_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'get':
          if (this.get_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.get_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_percent':
          if (this.auto_percent_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_percent_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_fixed':
          if (this.auto_fixed_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_fixed_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_buy':
          if (this.auto_buy_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_buy_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_get':
          if (this.auto_get_selectedSeriesOfSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_get_selectedSeriesOfSpecificProducts,
              initializeTarget
            )
          }
          break
        default:
          break
      }
    },
    // 还原选中项
    estoreSelectedItem (selectedArr, theTotalArr) {
      let selectedIdArr = []
      selectedArr.forEach(item => {
        selectedIdArr.push(item.Id)
      })
      selectedIdArr.forEach(itemTwo => {
        theTotalArr.forEach(itemThree => {
          if (itemTwo === itemThree.Id) {
            itemThree.isSelect = true
          }
        })
      })
    },
    ...mapMutations(['forSeriesOfSpecific_modal_search']),
    ...mapMutations(['percent_addSeriesOfSpecificProducts']),
    ...mapMutations(['fixed_addSeriesOfSpecificProducts']),
    ...mapMutations(['buy_addSeriesOfSpecificProducts']),
    ...mapMutations(['get_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_percent_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_fixed_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_buy_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_get_addSeriesOfSpecificProducts']),
    saveSearchTerms () {
      this.searchedtableData.forEach(item => {
        if (item.isSelect) {
          // 产品系列被选中了
          // 找出被选中的是现在tableData中的第几项
          let index
          this.tableData.forEach((itemTwo, indexTwo) => {
            if (item.Id === itemTwo.Id) {
              index = indexTwo
            }
          })
          this.$set(this.tableData, index, item)
        }
      })
      this.inSearch = false
    },
    save () {
      let arr = []
      this.tableData.forEach((item, index) => {
        // 判断是哪部分的已选择数据，增加一个属性辨别，删除时候用
        switch (this.clickTime) {
          case 'percent':
            item.type = 'percent'
            break
          case 'fixed':
            item.type = 'fixed'
            break
          case 'buy':
            item.type = 'buy'
            break
          case 'get':
            item.type = 'get'
            break
          case 'auto_percent':
            item.type = 'auto_percent'
            break
          case 'auto_fixed':
            item.type = 'auto_fixed'
            break
          case 'auto_buy':
            item.type = 'auto_buy'
            break
          case 'auto_get':
            item.type = 'auto_get'
            break
          default:
            break
        }
        if (item.isSelect) {
          arr.push(item)
        }
      })
      console.log(arr, this.clickTime)
      // 把选中的赋值到vuex
      switch (this.clickTime) {
        case 'percent':
          this.percent_addSeriesOfSpecificProducts(arr)
          break
        case 'fixed':
          this.fixed_addSeriesOfSpecificProducts(arr)
          break
        case 'buy':
          this.buy_addSeriesOfSpecificProducts(arr)
          break
        case 'get':
          this.get_addSeriesOfSpecificProducts(arr)
          break
        case 'auto_percent':
          this.auto_percent_addSeriesOfSpecificProducts(arr)
          break
        case 'auto_fixed':
          this.auto_fixed_addSeriesOfSpecificProducts(arr)
          break
        case 'auto_buy':
          this.auto_buy_addSeriesOfSpecificProducts(arr)
          break
        case 'auto_get':
          this.auto_get_addSeriesOfSpecificProducts(arr)
          break
        default:
          break
      }
      this.modalWindowVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.c-search {
  padding: 20px;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
}
.c-products {
  height: 436px;
  overflow-y: auto;
  li:first-child {
    border-top: 1px solid rgba(229, 229, 229, 1);
  }
  li {
    .product-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding-left: 19px;
      padding-right: 19px;
      img {
        width: 49px;
        height: 49px;
        margin-left: 20px;
        margin-right: 20px;
      }
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        .number {
          margin-right: 80px;
        }
      }
    }
  }
  .product-info:hover {
    cursor: pointer;
    background-color: #f4f6f8;
  }
  .none {
    text-align: center;
    height: 57px;
    font-size: 16px;
    line-height: 57px;
    border-bottom: 1px solid #e5e5e5;
  }
}
// dialog样式修改
.selected-num {
  float: left;
  line-height: 40px;
  font-weight: bold;
  font-size: 16px;
}
/deep/ .el-dialog {
  min-width: 620px;
  border-radius: 6px;
}
/deep/ .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  font-size: 20px;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
  padding-top: 36px;
  padding-bottom: 27px;
}
/deep/ .el-dialog__body {
  padding: 0;
  font-size: 15px;
  color: rgb(51, 51, 51);
}
.el-checkbox {
  margin-right: 6px;
}
ul {
  margin: 0;
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

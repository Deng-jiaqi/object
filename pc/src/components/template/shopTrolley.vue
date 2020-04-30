<template>
  <div class="trolley">
    <div class="trolley-header">
      <h1>{{$t('shopTrolley.header.title')}}</h1>
      <p class="blackShop" @click="continueShopping">
        {{$t('shopTrolley.header.text')}}
        <span class="el-icon-arrow-right"></span>
      </p>
    </div>
    <div v-show="shoppingCartInformation.length">
      <el-table
        :empty-text="$t('lang.indexofEffectiveOrders.table.text8')"
        :data="shoppingCartInformation"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="shopping-cart-table"
        ref="shoppingCartTable"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="selection" width="55" :label="$t('shopTrolley.table.thead.th1')"></el-table-column>
        <el-table-column width="350" :label="$t('shopTrolley.table.thead.th2')">
          <template slot-scope="scope">
            <div class="goods-information">
              <img :src="scope.row.img" alt />
              <span class="goods-name">{{scope.row.goodsname}}</span>
              <div>
                <p
                  class="attr"
                  v-for="(item,index) in scope.row.attr"
                  :key="index"
                >{{item.name}}: {{item.value}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('shopTrolley.table.thead.th3')">
          <template slot-scope="scope">$ {{scope.row.price}}</template>
        </el-table-column>
        <el-table-column width="280" :label="$t('shopTrolley.table.thead.th4')">
          <template slot-scope="scope">
            <el-input-number
              :step="1"
              :step-strictly="true"
              @blur="buyNumBlur(scope)"
              @change="handleBuyNumChange(scope)"
              v-model="scope.row.buynum"
              :min="1"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('shopTrolley.table.thead.th5')">
          <template slot-scope="scope">$ {{scope.row.price*scope.row.buynum}}</template>
        </el-table-column>
        <el-table-column :label="$t('shopTrolley.table.thead.th6')">
          <template slot-scope="scope">
            <span class="iconfont iconlajitong1" @click="deleteGoods(scope.row,scope.$index)"></span>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="c-operation"
        :style="!selectedShoppingCartInformation.length?'justifyContent:flex-end':''"
      >
        <div
          class="delete-selected"
          @click="deleteSelectedGoods"
          v-show="selectedShoppingCartInformation.length"
        >{{$t('shopTrolley.content.text1')}}</div>
        <div class="c-operation-right">
          {{selectedShoppingCartInformation.length}} {{$t('shopTrolley.content.text2')}}&nbsp;&nbsp;
          <span
            class="total-price"
          >$ {{totalPrice}}</span>
          <el-button
            @click="settlement"
            :disabled="!selectedShoppingCartInformation.length"
            type="primary"
          >{{$t('shopTrolley.content.btn')}}</el-button>
        </div>
      </div>
    </div>
    <div class="flexCss" v-show="!shoppingCartInformation.length">
      <div>
        <div>
          <img src="../../assets/product/shoppingNo.png" alt />
        </div>
        <h1 class="img-h1">{{$t('shopTrolley.content.hint')}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { lookCart, deleteCartItem, selectorder, updateShoppingCartQuantity } from '@/common/api/api'
import messageAlert from '@/utils/messageAlert'
import { remove, cloneDeep, isEqual } from 'lodash'
export default {
  name: 'shopTrolley',
  data () {
    return {
      // 变量
      timer: null,
      // data
      underStockRowMixidArrIndex: [], // 库存不足的商品的下标组成的数组
      shoppingCartInformation: [],
      selectedShoppingCartInformation: []
    }
  },
  methods: {
    // 计数器输入不为0或空
    buyNumBlur (scope) {
      if (scope.row.buynum === undefined) {
        scope.row.buynum = 1
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (this.underStockRowMixidArrIndex.indexOf(rowIndex) !== -1) {
        return 'warning-row'
      }
    },
    handleSelectionChange (val) {
      console.log(val)
      this.selectedShoppingCartInformation = val
    },
    deleteGoods (item, index) {
      let arr = [] // 传的数据id
      arr.push(item.mixid)
      this.$confirm(
        this.$t('shopTrolley.hint.text1'),
        this.$t('shopTrolley.hint.text2'),
        {
          confirmButtonText: this.$t('shopTrolley.hint.btn1'),
          cancelButtonText: this.$t('shopTrolley.hint.btn2'),
          type: 'warning'
        }
      )
        .then(() => {
          deleteCartItem({
            mixid: arr
          }).then(res => {
            messageAlert(res)
            if (res.data.code === 1) {
              let cloneSelectedShoppingCartInformation = cloneDeep(this.selectedShoppingCartInformation)
              this.shoppingCartInformation = remove(
                this.shoppingCartInformation,
                (value, idx) => {
                  return idx !== index
                }
              )
              //  还原选中项(删除之后之前的选中状态消失)
              this.$nextTick(() => {
                this.shoppingCartInformation.forEach((item, index) => {
                  cloneSelectedShoppingCartInformation.forEach(itemTwo => {
                    if (isEqual(item, itemTwo)) {
                      this.$refs.shoppingCartTable.toggleRowSelection(
                        item,
                        true
                      )
                    }
                  })
                })
              })
              console.log(cloneSelectedShoppingCartInformation)
              this.$emit('getMessage', res.data.data)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('shopTrolley.hint.text3')
          })
        })
    },
    deleteSelectedGoods () {
      if (!this.selectedShoppingCartInformation.length) {
        return
      }
      let arr = [] // 传的数据id
      this.selectedShoppingCartInformation.forEach(item => {
        arr.push(item.mixid)
      })
      this.$confirm(
        this.$t('shopTrolley.hint.text4'),
        this.$t('shopTrolley.hint.text2'),
        {
          confirmButtonText: this.$t('shopTrolley.hint.btn1'),
          cancelButtonText: this.$t('shopTrolley.hint.btn2'),
          type: 'warning'
        }
      )
        .then(() => {
          deleteCartItem({
            mixid: arr
          }).then(res => {
            messageAlert(res)
            this.$emit('getMessage', res.data.data)
            console.log(res)
            // 删除选中的项
            if (res.data.code === 1) {
              this.selectedShoppingCartInformation.forEach(itemTwo => {
                this.shoppingCartInformation.forEach(
                  (itemThree, indexThree) => {
                    if (itemTwo.mixid === itemThree.mixid) {
                      this.shoppingCartInformation = remove(
                        this.shoppingCartInformation,
                        (value, idx) => {
                          return idx !== indexThree
                        }
                      )
                    }
                  }
                )
              })
              console.log(this.shoppingCartInformation)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('shopTrolley.hint.text3')
          })
        })
    },
    continueShopping () {
      this.$router.push({
        path: '/templateFiveContent'
      })
    },
    handleBuyNumChange (rowInfo) {
      if (!rowInfo.row.buynum) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        let res = await updateShoppingCartQuantity({
          mixed: `${rowInfo.row.mixid}:${rowInfo.row.buynum}`
        })
        console.log(res)
        if (res.data.code === 1) {
          this.$emit('getMessage', res.data.data)
        }
      }, 1000)
    },
    // 结算
    async settlement () {
      if (!this.selectedShoppingCartInformation.length) {
        return
      }
      let selectedGoodsIdArr = []
      this.selectedShoppingCartInformation.forEach(item => {
        selectedGoodsIdArr.push(item.mixid)
      })
      let res = await selectorder({
        mixid: selectedGoodsIdArr
      })
      console.log(res)
      if (res.data.code === 1) {
        this.$router.push({
          path: '/submitOrder',
          query: {
            shopCartGoods: JSON.stringify(selectedGoodsIdArr)
          }
        })
      } else {
        messageAlert(res)
        let underStockRowMixidArr = res.data.data
        underStockRowMixidArr.forEach((item, index) => {
          this.shoppingCartInformation.forEach((itemTwo, indexTwo) => {
            if (item === itemTwo.mixid) {
              this.underStockRowMixidArrIndex.push(indexTwo)
            }
          })
        })
      }
    }
  },
  computed: {
    totalPrice () {
      let totalPrice = 0
      this.selectedShoppingCartInformation.forEach((item, index) => {
        totalPrice += parseFloat(item.price) * item.buynum
      })
      return totalPrice
    }
  },
  mounted () {
    lookCart({}).then(res => {
      console.log(res)
      this.shoppingCartInformation = res.data.data
      this.$nextTick(() => {
        // 设置全选
        this.shoppingCartInformation.forEach((item, index) => {
          this.$refs.shoppingCartTable.toggleRowSelection(
            item,
            true
          )
        })
      })
    })
  }
}
</script>
<style scoped lang="less">
@import "../../common/css/common";
.flexCss {
  display: flex;
  justify-content: center;
  align-items: center;
}
.shopping-cart-table {
  th {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  th:nth-child(6) {
    color: #fda506;
  }
  .goods-information {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border: 1px solid #d5d5d5;
    }
    .goods-name {
      margin-left: 12px;
      margin-right: 12px;
    }
    .attr {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  // /deep/ .current-row {
  //   td {
  //     background-color: rgb(175, 189, 209);
  //   }
  // }
  /deep/ .warning-row {
    background: oldlace;
  }
}
.c-operation {
  background-color: #f8f8f8;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  height: 68px;
  font-size: 16px;
  .delete-selected {
    cursor: pointer;
  }
  .c-operation-right {
    height: 100%;
    .total {
      font-size: 20px;
      color: #333;
    }
    .total-price {
      color: #4267b2;
      font-size: 20px;
      font-weight: bold;
    }
    .el-button {
      height: 100% !important;
      border-radius: 0;
      margin-left: 20px;
      padding-left: 33px;
      padding-right: 33px;
    }
  }
}
.trolley {
  padding: 62px 30px 180px 30px;
  max-width: 1140px;
  margin: auto;
}
.trolley-header {
  display: flex;
  justify-content: space-between;
  > h1 {
    text-align: center;
  }
  .blackShop {
    color: #4267b2;
    font-size: 20px;
    cursor: pointer;
  }
}
.iconlajitong1 {
  font-size: 28px;
  cursor: pointer;
}
.img-h1 {
  text-align: center;
}
</style>

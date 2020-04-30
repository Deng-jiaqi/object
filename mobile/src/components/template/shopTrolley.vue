<template>
  <div class="trolley">
    <div class="trolley-header">
      <!-- 继续购物 -->
      <p class="blackShop" @click="continueShopping">
        {{$t('shopTrolley.header.text')}}
        <span class="el-icon-arrow-right"></span>
      </p>
      <p>
        <span
          @click="inManagement=true"
          v-show="!inManagement"
        >{{$t('shopTrolley.table.thead.th7')}}</span>
        <span
          @click="inManagement=false"
          v-show="inManagement"
        >{{$t('shopTrolley.table.thead.th8')}}</span>
      </p>
    </div>
    <!-- 购物车列表 -->
    <div class="trolley-table" v-if="shopData.length>0">
      <!--      购物车列表-->
      <!-- <div class="table-box" v-for="(item, index) in shopData" :key="index">
        <el-row class="flexCss checkBox1" type="flex">
          <el-col :span="2">
            <input
              type="checkBox"
              class="check_box tui-checkbox"
              v-bind:checked="item.isSelect"
              @click="item.isSelect=!item.isSelect"
            />
          </el-col>
          <el-col :span="6">
            <div class="table-box-imgBox">
              <img :src="item.img" alt />
            </div>
          </el-col>
          <el-col :span="11">
            <p class="goodsName text-hideThree">{{item.goodsname}}</p>
          </el-col>
          <el-row class="tolPrice-box">
            <el-col :span="24" class="flexBetween el-colinput">
              <div class="tolPrice">
                $
                <span>{{(item.price*item.buynum).toFixed(2)}}</span>
              </div>
              <div class="box-total">
                <el-input-number
                  v-model="item.buynum"
                  :class="item.errNum === true ? numberCss[0] : 'el-input-number'"
                  @change="handleChange(item.buynum, item)"
                  :step="1"
                  :min="1"
                  :max="9999"
                  step-strictly
                  size="mini"
                ></el-input-number>
              </div>
            </el-col>
          </el-row>
        </el-row>
      </div>-->
      <div class="trolley-box" ref="trolleyBox" v-for="(item, index) in shopData" :key="index">
        <span @click="deleteGoods(item,index)" class="iconfont iconlajitong1"></span>
        <div class="trolley-box-top">
          <el-checkbox v-model="item.isSelect" @change="handelSelectGoodsChange"></el-checkbox>
          <el-image class="goodsimg" :src="item.img" lazy></el-image>
          <p class="good-info">{{item.goodsname}}</p>
        </div>
        <div class="trolley-box-bottom">
          <span class="good-price">$ {{item.price}}</span>
          <el-input-number
            v-model="item.buynum"
            @blur="buyNumBlur()"
            @change="handleBuyNumChange(item)"
            :min="1"
            :max="9999"
            :step="1"
            :step-strictly="true"
            size="mini"
          ></el-input-number>
        </div>
      </div>
      <!-- <div class="bottom">
        <div class="footerbottom">
          <div class="footerbottom-box">
            <input
              id="allPitch"
              type="checkBox"
              class="check_box tui-checkbox"
              @click="selectProduct(isSelectAll)"
              v-bind:checked="isSelectAll"
            />
            <label for="allPitch">{{$t('shopTrolley.table.thead.th1')}}</label>
          </div>
          <div class="footerbottom-span">
            <span>
              {{getTotal.totalNum}}
              {{$t('shopTrolley.content.text2')}}
              <span
                class="sumPrice"
              >${{getTotal.totalPrice}}</span>
            </span>
            &nbsp;&nbsp;
            <button
              class="buttonTotal"
              :class="getTotal.toData.length>0 ? btnCss[0] : btnCss[1]"
              @click="jieSuan"
            >{{$t('shopTrolley.content.btn')}}</button>
          </div>
        </div>
      </div>-->
      <div class="bottom-operation">
        <el-checkbox v-model="checkAll">{{$t('shopTrolley.table.thead.th1')}}</el-checkbox>
        <div class="bottom-operation-right" v-show="!inManagement">
          <span class="total-num">1 {{$t('shopTrolley.content.text2')}}</span>
          <span class="good-price">$ xxx</span>
          <el-button @click="settlement" type="primary">{{$t('shopTrolley.content.btn')}}</el-button>
        </div>
        <div class="bottom-operation-right" v-show="inManagement">
          <el-button
            @click="deteleSelectedGoods"
            type="danger"
          >{{$t('shopTrolley.table.thead.th9')}}</el-button>
        </div>
      </div>
    </div>
    <div class="c-nogoods" v-else>
      <div class="nogoods-content">
        <img src="../../assets/product/shoppingNo.png" alt />
        <h2>{{$t('shopTrolley.content.hint')}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import {
  lookCart,
  deleteCartItem,
  updateShoppingCartQuantity,
  selectorder
} from '../../common/api/api'
import { cloneDeep, remove } from 'lodash'
import messageAlert from '@/utils/messageAlert'
export default {
  name: 'shopTrolley',
  data () {
    return {
      // 变量
      inManagement: false, // 是否点击了管理（操作商品）
      checkAll: false,
      timer: '', // 定时器
      // data
      selectedShopData: [], // 选中的数据
      shopData: []
    }
  },
  watch: {
    checkAll: {
      handler (val) {
        if (val) {
          this.shopData.forEach(item => {
            item.isSelect = true
          })
          this.selectedShopData = cloneDeep(this.shopData)
        } else {
          this.shopData.forEach(item => {
            item.isSelect = false
          })
          this.selectedShopData = []
        }
      }
    }
  },
  methods: {
    // 计数器输入不为0或空
    buyNumBlur () {
      if (this.item.buynum === undefined) {
        this.item.buynum = 1
      }
    },
    handelSelectGoodsChange (from) {
      this.selectedShopData = []
      let totalLenth = this.shopData.length
      let selectedLenth = 0
      this.shopData.forEach(item => {
        if (item.isSelect) {
          this.selectedShopData.push(item)
          selectedLenth += 1
        }
      })
      if (totalLenth === selectedLenth) {
        this.checkAll = true
      }
    },
    continueShopping () {
      this.$router.push({
        path: '/templateFiveContent'
      })
    },
    // 删除单行商品
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
      ).then(() => {
        deleteCartItem({
          mixid: arr
        }).then(res => {
          messageAlert(res)
          if (res.data.code === 1) {
            this.shopData = remove(this.shopData, (value, idx) => {
              return idx !== index
            })
            this.$emit('getMessage', res.data.data)
          }
        })
      })
    },
    // 删除选中的商品
    deteleSelectedGoods () {
      if (!this.selectedShopData.length) {
        return
      }
      let arr = [] // 传的数据id
      this.selectedShopData.forEach(item => {
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
      ).then(() => {
        deleteCartItem({
          mixid: arr
        }).then(res => {
          messageAlert(res)
          this.$emit('getMessage', res.data.data)
          // 删除选中的项
          if (res.data.code === 1) {
            this.selectedShopData.forEach(itemTwo => {
              this.shopData.forEach((itemThree, indexThree) => {
                if (itemTwo.mixid === itemThree.mixid) {
                  this.shopData = remove(this.shopData, (value, idx) => {
                    return idx !== indexThree
                  })
                }
              })
            })
          }
        })
      })
    },
    // 设置选中
    selectProduct (isSelect) {
      for (var i = 0; i < this.shopData.length; i++) {
        this.shopData[i].isSelect = !isSelect
      }
    },
    // 计数加减
    handleBuyNumChange (item) {
      if (!item.buynum) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        let res = await updateShoppingCartQuantity({
          mixed: `${item.mixid}:${item.buynum}`
        })
        console.log(res)
        if (res.data.code === 1) {
          this.$emit('getMessage', res.data.data)
        }
      }, 1000)
    },
    // 结算
    async settlement () {
      if (!this.selectedShopData.length) {
        return
      }
      let selectedShopDataIdArr = []
      this.selectedShopData.forEach(item => {
        selectedShopDataIdArr.push(item.mixid)
      })
      let res = await selectorder({
        mixid: selectedShopDataIdArr
      })
      console.log(res)
      if (res.data.code === 1) {
        this.$router.push({
          path: '/submitOrder',
          query: {
            shopCartGoods: JSON.stringify(selectedShopDataIdArr)
          }
        })
      } else {
        messageAlert(res)
        // 给超出库存的项增加提示
        let underStockRowMixidArr = res.data.data
        underStockRowMixidArr.forEach((item, index) => {
          this.shopData.forEach((itemTwo, indexTwo) => {
            if (item === itemTwo.mixid) {
              this.$refs.trolleyBox[indexTwo].classList.add('underStockRow')
            } else {
              this.$refs.trolleyBox[indexTwo].classList.remove('underStockRow')
            }
          })
        })
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  async created () {
    let res = await lookCart({})
    this.shopData = res.data.data
    this.shopData.forEach(item => {
      this.$set(item, 'isSelect', false)
    })
  }
}
</script>
<style scoped lang="less">
.trolley {
  margin: 0 auto 60px auto;
  .trolley-header {
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .blackShop {
      color: #4267b2;
      font-size: 18px;
      cursor: pointer;
      .el-icon-arrow-right {
        position: relative;
        top: 3px;
      }
    }
  }
  .trolley-table {
    position: relative;
    .good-price {
      color: #4267b2;
    }
    .trolley-box {
      position: relative;
      padding: 12px;
      width: calc(94%-30px);
      margin: auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 25px 0px rgba(204, 204, 204, 0.65);
      border-radius: 4px;
      margin-bottom: 20px;
      .iconlajitong1 {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        cursor: pointer;
      }
      .trolley-box-top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .goodsimg {
          width: 100px;
          height: 100px;
          margin-left: 15px;
          margin-right: 15px;
          flex-shrink: 0;
        }
        .good-info {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .trolley-box-bottom {
        padding-left: 150px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /deep/ .el-input-number--mini {
          width: 3.0625rem;
        }
      }
    }
    .underStockRow {
      background: oldlace;
      transform: all 0.2s ease;
    }
    .bottom-operation {
      box-shadow: 0px -1px 2px 0px rgba(87, 85, 82, 0.1);
      position: fixed;
      z-index: 1000;
      width: calc(100%- 25px);
      bottom: 0;
      background: rgba(255, 255, 255, 1);
      padding-left: 25px;
      height: 49px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/ .el-checkbox__label {
        position: relative;
        top: 2px;
      }
      .bottom-operation-right {
        height: 100%;
        .total-num {
          margin-right: 10px;
        }
        .el-button {
          border-radius: 0;
          height: 100%;
          margin-left: 22px;
        }
      }
    }
  }
  .c-nogoods {
    width: 260px;
    margin: auto;
    height: calc(100vh - 113px);
    display: flex;
    align-items: center;
    .nogoods-content {
      img {
        width: 100%;
        height: 100%;
      }
      h2 {
        text-align: center;
      }
    }
  }
}
</style>

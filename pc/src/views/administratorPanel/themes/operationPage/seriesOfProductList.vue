<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-seriesOfProductList" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customSeriesOfProductList.text1')}}
      </p>
      <p class="title-content">{{$t('customSeriesOfProductList.text2')}}</p>
      <ul>
        <li v-for="(item,index) in seriesOfProductList" :key="index">
          <div
            class="product-edit-item"
            @click="productListVisible[index].hideVisible=!productListVisible[index].hideVisible"
          >
            <span class="iconfont icon-sanjiaoxing-xia"></span>
            <div class="c-img"></div>
            <span>{{$t('customSeriesOfProductList.text3')}}</span>
          </div>
          <el-collapse-transition>
            <div v-if="productListVisible.length>0">
              <div class="product-edit-item-hide" v-show="productListVisible[index].hideVisible">
                <div class="linkandtitle">
                  <span>{{$t('customSeriesOfProductList.text4')}}</span>
                  <router-link to>{{$t('customSeriesOfProductList.text5')}}</router-link>
                </div>
                <!-- 选择 -->
                <div class="c-select-seriesOfProduct-btn" v-show="!item.Id">
                  <el-button @click="openSeriesOfProductList(index)" type="primary">{{$t('customSeriesOfProductList.text6')}}</el-button>
                </div>
                <!-- 选择的商品展示 -->
                <div class="c-item-seriesOfProduct" v-show="item.Id">
                  <div class="box-seriesOfProduct">
                    <div class="c-seriesOfProduct-img">
                      <img :src="item.imgsrc" alt />
                    </div>
                    <p>{{item.name}}</p>
                  </div>
                  <div class="btn-operation">
                    <el-button plain @click="openSeriesOfProductList(index)">{{$t('customSeriesOfProductList.text7')}}</el-button>
                    <el-button plain @click="removeSeriesOfProduct(index)" class="btn-delete">{{$t('customSeriesOfProductList.text8')}}</el-button>
                  </div>
                </div>
                <div
                  class="delete-seriesOfProduct"
                  @click="deleteSeriesOfProduct(index)"
                  v-show="seriesOfProductList.length>1"
                >
                  <span class="iconfont icon-shanchu2"></span>{{$t('customSeriesOfProductList.text9')}}
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </li>
      </ul>
      <div class="addSeriesOfProduct" @click="addSeriesOfProduct" v-show="seriesOfProductList.length<6">
        <span class="iconfont icon-jiahao"></span>{{$t('customSeriesOfProductList.text10')}}
      </div>
      <!-- 选择特定产品 -->
      <SelectSeriesOfProduct ref="selectSeriesOfProduct" @selectSuccess="selectSuccess" />
    </div>
  </transition>
</template>
<script>
import SelectSeriesOfProduct from '@/views/administratorPanel/themes/operationPage/selectSeriesOfProduct'
import { cloneDeep, isEqual, remove } from 'lodash'
export default {
  name: 'SeriesOfProductList',
  components: {
    SelectSeriesOfProduct
  },
  data () {
    return {
      // 变量
      compId: null,
      indexofInEditSeriesOfProduct: null, // 正在编辑的产品系列的下标
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      // data
      seriesOfProductList: [], // 模板现有的产品系列列表
      //   ui
      optionVisible: false,
      loading: true,
      productListVisible: []
    }
  },
  watch: {
    seriesOfProductList: {
      handler (newValue, oldValue) {
        if (this.initializeChange) {
          this.initializeChange = false
          this.originalSettings = cloneDeep(newValue)
        } else {
          if (!isEqual(this.originalSettings, newValue)) {
            this.$emit('customSettingsChange', 'change', this.compId, newValue)
          } else {
            this.$emit('customSettingsChange', 'delete', this.compId)
          }
        }
      },
      deep: true
    }
  },
  methods: {
    selectSuccess (choosedSeriesOfProduct) {
      console.log(choosedSeriesOfProduct)
      let inEditSeriesOfProduct = this.seriesOfProductList[this.indexofInEditSeriesOfProduct]
      this.$set(inEditSeriesOfProduct, 'Id', choosedSeriesOfProduct.Id)
      this.$set(inEditSeriesOfProduct, 'imgsrc', choosedSeriesOfProduct.imgsrc)
      this.$set(inEditSeriesOfProduct, 'name', choosedSeriesOfProduct.name)
      this.$emit('operationSuccess', {
        cmd: 'modifySeriesOfProductList',
        params: {
          choosedSeriesOfProduct: choosedSeriesOfProduct,
          index: this.indexofInEditSeriesOfProduct
        }
      })
    },
    openSeriesOfProductList (index) {
      this.$refs.selectSeriesOfProduct.visible = true
      this.$refs.selectSeriesOfProduct.indexOfSeriesOfProduct = index
      // 产品系列列表
      this.indexofInEditSeriesOfProduct = index
    },
    addSeriesOfProduct () {
      this.seriesOfProductList.push({ Id: null, imgsrc: '', name: '' })
      this.productListVisible.push({ hideVisible: false })
    },
    deleteSeriesOfProduct (index) {
      // 删除产品系列
      this.seriesOfProductList = remove(
        this.seriesOfProductList,
        (value, idx) => {
          return idx !== index
        }
      )
      this.productListVisible = remove(
        this.productListVisible,
        (value, idx) => {
          return idx !== index
        }
      )
      this.$emit('operationSuccess', {
        cmd: 'cutSeriesOfProductList',
        params: {
          index: index
        }
      })
    },
    removeSeriesOfProduct (index) {
      // 移除产品系列
      this.$set(this.seriesOfProductList[index], 'Id', null)
      this.$set(this.seriesOfProductList[index], 'name', '')
      this.$set(this.seriesOfProductList[index], 'imgsrc', '')
      this.$emit('operationSuccess', {
        cmd: 'modifySeriesOfProductList',
        params: {
          choosedSeriesOfProduct: { Id: null, imgsrc: '', name: '' },
          index: index
        }
      })
    },
    pushSomeTimes () {
      let length = this.seriesOfProductList.length
      for (let i = 0; i < length; i++) {
        this.productListVisible.push({ hideVisible: false })
      }
    },
    getParentComponentData (parentComponentData, compId) {
      this.seriesOfProductList = parentComponentData.seriesOfProductList
      this.compId = compId
      this.pushSomeTimes()
      if (this.seriesOfProductList.length === 0) {
        this.seriesOfProductList = [
          { Id: null, imgsrc: '', name: '' },
          { Id: null, imgsrc: '', name: '' }
        ]
        this.productListVisible = [{ hideVisible: false }, { hideVisible: false }]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.option-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 250, 251, 1);
  z-index: 10;
  .option-page-title {
    font-size: 19px;
    line-height: 67px;
    height: 67px;
    padding-left: 15px;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    .icon-fanhui1 {
      font-size: 16px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
.option-page-seriesOfProductList {
  .title-content {
    line-height: 67px;
    height: 67px;
    padding-left: 32px;
    border-bottom: 1px solid rgb(232, 233, 234);
  }
  .product-edit-item {
    height: 60px;
    border-bottom: 1px solid rgb(232, 233, 234);
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 9px;
    padding-right: 29px;
    cursor: pointer;
    .icon-sanjiaoxing-xia {
      transform: rotate(-90deg);
      margin-right: 10px;
      color: #798c9c;
      font-size: 8px;
    }
  }
  .product-edit-item-hide {
    padding: 0 29px 0 29px;
    background-color: #fff;
    border-bottom: 1px solid rgb(232, 233, 234);
    .linkandtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-top: 25px;
      a {
        color: #007ace;
        font-size: 13px;
      }
    }
    .c-select-seriesOfProduct-btn {
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(249, 250, 251);
      border-radius: 0 0 3px 3px;
      border: 1px solid #dfe3e8;
    }
    .c-item-seriesOfProduct {
      background: rgb(249, 250, 251);
      .box-seriesOfProduct {
        padding: 19px;
        display: flex;
        justify-content: flex-start;
        border-radius: 0 0 3px 3px;
        border: 1px solid #dfe3e8;
        .c-seriesOfProduct-img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          flex-grow: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          line-height: 50px;
          font-size: 14px;
        }
      }
      .btn-operation {
        display: flex;
        justify-content: flex-start;
        /deep/ .el-button {
          margin: 0;
          width: 50%;
          border-top: none;
          border-radius: 0;
        }
        .btn-delete {
          border-left: none;
        }
        /deep/ .el-button.is-plain:focus,
        .el-button.is-plain:hover {
          background: linear-gradient(to bottom, #f4f6f8, #f4f6f8);
          border-color: #dcdfe6;
          color: rgb(96, 98, 102);
        }
      }
    }
    .delete-seriesOfProduct {
      color: #007ace;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-top: 15px;
      padding-bottom: 25px;
      .icon-shanchu2 {
        font-size: 8px;
        margin-right: 10px;
      }
    }
  }
  .addSeriesOfProduct {
    height: 64px;
    display: flex;
    align-items: center;
    color: #5c6ac4;
    padding-left: 60px;
    border-bottom: 1px solid #dfe3e8;
    cursor: pointer;
    background: #fff;
    .icon-jiahao {
      font-size: 14px;
      margin-right: 10px;
      font-weight: bold;
    }
  }
}
p {
  margin: 0;
}
ul {
  margin: 0;
}
</style>

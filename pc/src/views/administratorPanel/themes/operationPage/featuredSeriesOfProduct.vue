<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-featuredSeriesOfProduct" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customFeaturedSeriesOfProduct.text1')}}
      </p>
      <p class="title-content">{{$t('customFeaturedSeriesOfProduct.text2')}}</p>
      <div class="featuredSeriesOfProduct-content">
        <div class="c-content-input">
          <p class="label-content-input">{{$t('customFeaturedSeriesOfProduct.text3')}}</p>
          <el-input @blur='modifyfeatureTitle' v-model="set.featured_title"></el-input>
        </div>
        <!-- 选择 -->
        <div class="c-select-featuredSeriesOfProduct-btn" v-show="!set.featuredSeriesOfProduct.Id">
          <el-button @click="openSeriesOfProductList" type="primary">{{$t('customFeaturedSeriesOfProduct.text4')}}</el-button>
        </div>
        <!-- 选择的商品展示 -->
        <div class="c-item-featuredSeriesOfProduct" v-show="set.featuredSeriesOfProduct.Id">
          <div class="box-featuredSeriesOfProduct">
            <div class="c-featuredSeriesOfProduct-img">
              <img :src="set.featuredSeriesOfProduct.imgsrc" alt />
            </div>
            <p>{{set.featuredSeriesOfProduct.name}}</p>
          </div>
          <div class="btn-operation">
            <el-button plain @click='openSeriesOfProductList'>{{$t('customFeaturedSeriesOfProduct.text5')}}</el-button>
            <el-button plain class="btn-delete" @click='removeSeriesOfProduct'>{{$t('customFeaturedSeriesOfProduct.text6')}}</el-button>
          </div>
        </div>
        <div class="c-content-input">
          <p class="label-content-input">{{$t('customFeaturedSeriesOfProduct.text7')}} (2-5)</p>
          <el-input @blur='modifyProductArrangement' v-model="set.numberOfProductsPerRow"></el-input>
        </div>
        <div class="c-content-input">
          <p class="label-content-input">{{$t('customFeaturedSeriesOfProduct.text8')}} (1-5)</p>
          <el-input @blur='modifyProductArrangement' v-model="set.numberOfRows"></el-input>
        </div>
        <div>
          <el-checkbox @change='modifyPriceDisplay' v-model="set.WhetherToDisplayPrice">{{$t('customFeaturedSeriesOfProduct.text9')}}</el-checkbox>
        </div>
        <!-- 选择特定产品系列 -->
        <SelectSeriesOfProduct ref='selectSeriesOfProduct' @selectSuccess='selectSuccess'/>
      </div>
    </div>
  </transition>
</template>
<script>
import { cloneDeep, isEqual } from 'lodash'
import SelectSeriesOfProduct from '@/views/administratorPanel/themes/operationPage/selectSeriesOfProduct'
export default {
  name: 'FeaturedSeriesOfProduct',
  components: {
    SelectSeriesOfProduct
  },
  data () {
    return {
      set: {
        featured_title: null,
        featuredSeriesOfProduct: {
          Id: '',
          imgsrc: '',
          name: '',
          specificProducts: []
        },
        numberOfProductsPerRow: 4, // 每行产品数
        numberOfRows: 1, // 产品行数
        WhetherToDisplayPrice: true // 是否显示价格
      },
      // 变量
      compId: null,
      indexOfFeatureInList: null, // 编辑的特色产品系列的下标
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      //   ui
      optionVisible: false
    }
  },
  watch: {
    set: {
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
  computed: {
    itemPercentage () {
      return (100 / parseInt(this.set.numberOfProductsPerRow)) + '%'
    },
    interval () { // 间距
      return 0.9375 * parseInt(this.set.numberOfProductsPerRow - 1) / parseInt(this.set.numberOfProductsPerRow)
    }
  },
  methods: {
    modifyPriceDisplay () {
      this.$emit('operationSuccess', {
        cmd: 'modifyPriceDisplay',
        params: {
          WhetherToDisplayPrice: this.set.WhetherToDisplayPrice,
          index: this.indexOfFeatureInList,
          featuredSeriesOfProduct: this.set.featuredSeriesOfProduct
        }
      })
    },
    openSeriesOfProductList (index) { // 打开选择产品系列
      this.$refs.selectSeriesOfProduct.visible = true
    },
    modifyfeatureTitle () { // 修改标题
      this.$emit('operationSuccess', {
        cmd: 'modifyFeatureTitle',
        params: {
          featured_title: this.set.featured_title,
          index: this.indexOfFeatureInList,
          featuredSeriesOfProduct: this.set.featuredSeriesOfProduct
        }
      })
    },
    modifyProductArrangement () { // 修改产品排列
      this.$emit('operationSuccess', {
        cmd: 'modifyProductArrangement',
        params: {
          index: this.indexOfFeatureInList,
          numberOfProductsPerRow: this.set.numberOfProductsPerRow,
          numberOfRows: this.set.numberOfRows,
          featuredSeriesOfProduct: this.set.featuredSeriesOfProduct
        }
      })
    },
    removeSeriesOfProduct () {
      this.set.featuredSeriesOfProduct = { Id: '',
        imgsrc: '',
        name: '',
        specificProducts: []
      }
    },
    getParentComponentData (parentComponentData, compId) {
      if (parentComponentData) { // if后端改了数据之后删除
        this.compId = compId
        this.set = parentComponentData
        switch (compId) {
          case '5':
            this.indexOfFeatureInList = 0
            break
          case '6':
            this.indexOfFeatureInList = 1
            break
          case '7':
            this.indexOfFeatureInList = 2
            break
          default:
            break
        }
      }
    },
    selectSuccess (choosedSeriesOfProduct) {
      console.log(choosedSeriesOfProduct)
      this.set.featuredSeriesOfProduct = choosedSeriesOfProduct
      this.$emit('operationSuccess', {
        cmd: 'modifyFeaturedSeriesOfProduct',
        params: {
          index: this.indexOfFeatureInList,
          set: this.set
        }
      })
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
.option-page-featuredSeriesOfProduct {
  .title-content {
    line-height: 67px;
    height: 67px;
    padding-left: 32px;
    border-bottom: 1px solid rgb(232, 233, 234);
  }
  .featuredSeriesOfProduct-content {
    padding: 25px 29px 25px 29px;
    background: #fff;
    .c-content-input {
      margin-bottom: 20px;
      .label-content-input {
        margin-bottom: 10px;
      }
    }
    .c-select-featuredSeriesOfProduct-btn {
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(249, 250, 251);
      border-radius: 0 0 3px 3px;
      border: 1px solid #dfe3e8;
      margin-bottom: 20px;
    }
    .c-item-featuredSeriesOfProduct {
      background: rgb(249, 250, 251);
      margin-bottom: 20px;
      .box-featuredSeriesOfProduct {
        padding: 19px;
        display: flex;
        justify-content: flex-start;
        border-radius: 0 0 3px 3px;
        border: 1px solid #dfe3e8;
        .c-featuredSeriesOfProduct-img {
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
  }
}
p {
  margin: 0;
}
ul {
  margin: 0;
}
</style>

<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-productDetails" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customProductDetails.text1')}}
      </p>
      <p class="title-content">{{$t('customProductDetails.text2')}}</p>
      <div class="productDetails-content">
        <div class="c-checkbox">
          <el-checkbox @change='modifyPriceDisplay_productDetails' v-model="set.WhetherToDisplayOriginalPrice">{{$t('customProductDetails.text3')}}</el-checkbox>
        </div>
        <div class="c-checkbox">
          <el-checkbox @change='modifyAddToCartDisplay_productDetails' v-model="set.WhetherToDisplayAddToCart">{{$t('customProductDetails.text4')}}</el-checkbox>
        </div>
                <div class="c-checkbox">
          <el-checkbox @change='modifyTheNumberOfChoices_productDetails' v-model="set.WhetherToDisplayTheNumberOfChoices">{{$t('customProductDetails.text5')}}</el-checkbox>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { cloneDeep, isEqual } from 'lodash'
export default {
  name: 'ProductDetails',
  data () {
    return {
      set: {
        WhetherToDisplayOriginalPrice: true,
        WhetherToDisplayAddToCart: true,
        WhetherToDisplayTheNumberOfChoices: true
      },
      // 变量
      compId: null,
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      // ui
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
  methods: {
    modifyPriceDisplay_productDetails () {
      this.$emit('operationSuccess', {
        cmd: 'modifyPriceDisplay_productDetails',
        params: {
          WhetherToDisplayOriginalPrice: this.set.WhetherToDisplayOriginalPrice
        }
      })
    },
    modifyAddToCartDisplay_productDetails () {
      this.$emit('operationSuccess', {
        cmd: 'modifyAddToCartDisplay_productDetails',
        params: {
          WhetherToDisplayAddToCart: this.set.WhetherToDisplayAddToCart
        }
      })
    },
    modifyTheNumberOfChoices_productDetails () {
      this.$emit('operationSuccess', {
        cmd: 'modifyTheNumberOfChoices_productDetails',
        params: {
          WhetherToDisplayTheNumberOfChoices: this.set.WhetherToDisplayTheNumberOfChoices
        }
      })
    },
    getParentComponentData (parentComponentData, compId, defaultProductid) {
      this.compId = compId
      this.set = parentComponentData
      console.log(typeof defaultProductid)
      if (!defaultProductid) { // 还没有产品时候 使页面初始化数据和左边侧边栏相同
        this.$emit('operationSuccess', {
          cmd: 'passingDefaultData_productDetails',
          params: {
            defaultSet: this.set
          }
        })
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
.option-page-productDetails {
  .title-content {
    line-height: 67px;
    height: 67px;
    padding-left: 32px;
    border-bottom: 1px solid rgb(232, 233, 234);
  }
  .productDetails-content {
    padding: 25px 29px 25px 29px;
    background: #fff;
    .c-checkbox {
        margin-bottom: 15px;
    }
    .c-checkbox:last-child {
        margin-bottom: 0;
    }
  }
}
</style>

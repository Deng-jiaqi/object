<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-allSeriesOfProductList" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customAllSeriesOfProductList.text1')}}
      </p>
      <p class="title-content">{{$t('customAllSeriesOfProductList.text2')}}</p>
      <div class="allSeriesOfProductList-content">
        <!-- 选择 -->
        <div class="c-content-input">
          <p class="label-content-input">{{$t('customAllSeriesOfProductList.text3')}} (2-5)</p>
          <el-input @blur="modifyProductArrangement" v-model="set.numberOfProductsPerRow"></el-input>
        </div>
        <div class="c-content-input">
          <p class="label-content-input">{{$t('customAllSeriesOfProductList.text4')}} (1-5)</p>
          <el-input @blur="modifyProductArrangement" v-model="set.numberOfRows"></el-input>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { cloneDeep, isEqual } from 'lodash'
export default {
  name: 'allSeriesOfProductList',
  data () {
    return {
      set: {
        numberOfProductsPerRow: 4, // 每行产品数
        numberOfRows: 1 // 产品行数
      },
      // 变量
      compId: null,
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      // ui
      optionVisible: false
    }
  },
  methods: {
    modifyProductArrangement () { // 修改产品排列
      this.$emit('operationSuccess', {
        cmd: 'modifyProductArrangement_allSeriesOfProductList',
        params: {
          numberOfProductsPerRow: this.set.numberOfProductsPerRow,
          numberOfRows: this.set.numberOfRows
        }
      })
    },
    getParentComponentData (parentComponentData, compId) {
      this.compId = compId
      this.set = parentComponentData
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
.option-page-allSeriesOfProductList {
  .title-content {
    line-height: 67px;
    height: 67px;
    padding-left: 32px;
    border-bottom: 1px solid rgb(232, 233, 234);
  }
  .allSeriesOfProductList-content {
    padding: 25px 29px 25px 29px;
    background: #fff;
    .c-content-input {
      margin-bottom: 20px;
      .label-content-input {
        margin-bottom: 10px;
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

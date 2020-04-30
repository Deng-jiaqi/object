<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-seriesOfProduct" v-show="seriesOfProductOptionVisible">
      <p class="option-page-title">
        <span @click="seriesOfProductOptionVisible=false" class="iconfont icon-fanhui1"></span>产品系列列表
      </p>
      <p class="title-content">内容</p>
      <div class="seriesOfProduct-content">
        <div class="c-content-input">
          <p class="label-content-input">标题</p>
          <el-input></el-input>
        </div>
        <!-- 选择 -->
        <div class="c-select-seriesOfProduct-btn" v-show="!selectedSeriesOfProduct.name">
          <el-button @click="openSeriesOfProductList" type="primary">选择产品系列</el-button>
        </div>
        <!-- 选择的商品展示 -->
        <div class="c-item-seriesOfProduct" v-show="selectedSeriesOfProduct.name">
          <div class="box-seriesOfProduct">
            <div class="c-seriesOfProduct-img">
              <img :src="selectedSeriesOfProduct.img" alt />
            </div>
            <p>{{selectedSeriesOfProduct.name}}</p>
          </div>
          <div class="btn-operation">
            <el-button plain @click='openSeriesOfProductList'>更改</el-button>
            <el-button plain class="btn-delete" @click='removeSeriesOfProduct'>删除</el-button>
          </div>
        </div>
        <div class="c-content-input">
          <p class="label-content-input">每行产品数</p>
          <el-input></el-input>
        </div>
        <div class="c-content-input">
          <p class="label-content-input">行数</p>
          <el-input></el-input>
        </div>
        <div>
          <el-checkbox>是否显示价格</el-checkbox>
        </div>
        <!-- 选择特定产品 -->
        <SelectSeriesProduct ref='selectSeriesProduct' @selectSuccess='selectSuccess'/>
      </div>
    </div>
  </transition>
</template>
<script>
import SelectSeriesProduct from '@/views/administratorPanel/themes/operationPage/selectSeriesProduct'
export default {
  name: 'SeriesOfProduct',
  components: {
    SelectSeriesProduct
  },
  data () {
    return {
      //   ui
      seriesOfProductOptionVisible: false,
      selectedSeriesOfProduct: {}
    }
  },
  methods: {
    openSeriesOfProductList (index) {
      this.$refs.selectSeriesProduct.visible = true
    },
    removeSeriesOfProduct () {
      this.selectedSeriesOfProduct = {}
    },
    selectSuccess (choosedSeriesOfProduct) {
      this.$set(this.selectedSeriesOfProduct, 'id', choosedSeriesOfProduct.Id)
      this.$set(this.selectedSeriesOfProduct, 'img', choosedSeriesOfProduct.img)
      this.$set(this.selectedSeriesOfProduct, 'name', choosedSeriesOfProduct.name)
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
.option-page-seriesOfProduct {
  .title-content {
    line-height: 67px;
    height: 67px;
    padding-left: 32px;
    border-bottom: 1px solid rgb(232, 233, 234);
  }
  .seriesOfProduct-content {
    padding: 25px 29px 25px 29px;
    background: #fff;
    .c-content-input {
      margin-bottom: 20px;
      .label-content-input {
        margin-bottom: 10px;
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
      margin-bottom: 20px;
    }
    .c-item-seriesOfProduct {
      background: rgb(249, 250, 251);
      margin-bottom: 20px;
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
  }
}
p {
  margin: 0;
}
ul {
  margin: 0;
}
</style>

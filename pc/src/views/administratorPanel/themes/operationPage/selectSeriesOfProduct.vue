<template>
  <transition name="el-zoom-in-top">
    <div class="c-select-SeriesOfProduct" v-show="visible">
      <p class="c-select-SeriesOfProduct-title">
        {{$t('customSelectSeriesOfProduct.text1')}}
        <span class="iconfont icon-guanbi" @click="visible=false"></span>
      </p>
      <div class="c-search-SeriesOfProduct">
        <el-input prefix-icon="iconfont icon-sousuo4" v-model="search_SeriesOfProduct"></el-input>
      </div>
      <div class="c-add-SeriesOfProduct" v-show="!allSeriesOfProduct.length">
        <span class="iconfont icon-icon-test-copy"></span>
        <router-link to="/administratorPanel/productInventory/addProductLine">{{$t('customSelectSeriesOfProduct.text2')}}</router-link>
      </div>
      <div v-show='loading'>
      <div v-loading="loading" class="loading"></div>
      </div>
      <ul class="c-seriesOfProduct">
        <li class="seriesOfProduct" v-for="(item,index) in allSeriesOfProduct" :key="index">
          <el-radio v-model="indexofCurrentlySelectedSeriesOfProduct" :label="index">{{item.name}}</el-radio>
          <div class="c-product-pic">
            <img :src="item.imgsrc" alt />
          </div>
        </li>
      </ul>
      <div class="seriesOfProduct-none" v-show="!loading&&allSeriesOfProduct.length===0">{{$t('customSelectSeriesOfProduct.text3')}}</div>
      <div class="c-btn-determine">
        <el-button class="btn-save" type="primary" @click="saveChoose">{{$t('customSelectSeriesOfProduct.text4')}}</el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import { getSeriesOfProduct } from '@/common/api/api.js'
export default {
  name: 'SelectSeriesOfProduct',
  data () {
    return {
      //   变量
      indexofCurrentlySelectedSeriesOfProduct: 0, // 产品系列radio选中产品系列的下标
      search_SeriesOfProduct: '',
      timer: null,
      // data
      allSeriesOfProduct: [], // 店铺所有的产品系列
      //   ui
      visible: false,
      loading: true
    }
  },
  watch: {
    search_SeriesOfProduct: {
      handler (val) {
        this.loading = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          getSeriesOfProduct({ collect_name: val }).then(res => {
            this.loading = false
            this.allSeriesOfProduct = res.data.data
          })
        }, 1000)
      }
    },
    visible: {
      async handler (val) {
        if (val) {
          this.loading = true
          this.allSeriesOfProduct = []
          let res = await getSeriesOfProduct()
          this.loading = false
          console.log(res)
          this.allSeriesOfProduct = res.data.data
        }
      }
    }
  },
  methods: {
    saveChoose () {
      // 确定选择的产品系列
      let choosedSeriesOfProduct = this.allSeriesOfProduct[this.indexofCurrentlySelectedSeriesOfProduct]
      this.$emit('selectSuccess', choosedSeriesOfProduct)
      console.log(choosedSeriesOfProduct)
      this.visible = false
    }
  }
}
</script>
<style lang="less">
.c-select-SeriesOfProduct {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 250, 251, 1);
  z-index: 11;
  .c-select-SeriesOfProduct-title {
    font-size: 19px;
    line-height: 67px;
    height: 67px;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    position: relative;
    .icon-guanbi {
      font-size: 16px;
      margin-right: 5px;
      cursor: pointer;
      color: rgb(149, 167, 183);
      top: 0;
      bottom: 0;
      margin-left: 20px;
    }
    .icon-guanbi:hover {
      color: rgb(0, 0, 0);
    }
  }
  .c-search-SeriesOfProduct {
    padding: 19px 10px;
  }
  .c-add-SeriesOfProduct {
    padding-left: 29px;
    padding-right: 29px;
    background-color: rgb(235, 245, 250);
    height: 50px;
    transition: background-color 0.5s ease;
    line-height: 50px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8e9ea;
    border-top: 1px solid #e8e9ea;
    .icon-icon-test-copy {
      color: #385ca5;
      font-size: 18px;
      font-weight: 800;
      margin-right: 15px;
    }

    a {
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
  }
  .c-add-SeriesOfProduct:hover {
    background-color: #fff;
  }
  .loading {
    min-height: 60px;
  }
  .c-seriesOfProduct {
    .seriesOfProduct {
      transition: background-color 0.25s ease;
      border-bottom: 1px solid #e8e9ea;
      height: 60px;
      padding-left: 29px;
      padding-right: 29px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      .c-product-pic {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .seriesOfProduct:hover {
      background-color: #f9fafb;
    }
  }
  .seriesOfProduct-none {
    transition: background-color 0.25s ease;
    border-bottom: 1px solid #e8e9ea;
    height: 60px;
    padding-left: 29px;
    padding-right: 29px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
  }
  .c-btn-determine {
    height: 60px;
    border-bottom: 1px solid #e8e9ea;
    border-top: 1px solid #e8e9ea;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 280px;
    line-height: 60px;
    z-index: 13;
    background: #fff;
    text-align: right;
    .btn-save {
      margin-right: 15px;
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

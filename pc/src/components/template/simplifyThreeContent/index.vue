<template>
  <main>
    <nav>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in bannerData" :key="item">
          <img :src="item.picture" alt="">
        </el-carousel-item>
      </el-carousel>
    </nav>
<!--    // 模板静态-->
    <template v-if="featured.length < 1">
      <div class="main-content">
        <h2>{{$t('simplifyThree.main.text1')}}</h2>
        <el-row :gutter="20" class="main-content-row">
          <el-col :span="6" v-for="(item, index) in $t('simplifyThree.setData')" :key="index">
            <div class="col-div">
              <div>
                <img :src="item.src" alt="">
              </div>
              <p>{{item.text}}</p>
              <p>{{item.price}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
<!--    // 模板数据-->
    <template v-else  v-for="(item, index) in featured">
      <div class="main-content" v-if="item.goodsinfo.length > 0" :key="index">
        <div class="main-content-title"><span>{{item.name}}</span>
          <span @click="moreSeries(item)" class="col-div-box">{{$t('simplifyThree.main.text2')}}</span></div>
        <el-row :gutter="20" class="main-content-row">
          <el-col :span="6" v-for="(item1, idx) in item.goodsinfo" :key="idx">
            <div class="col-div">
              <div @click="particulars(item1,idx)" class="col-div-box">
                <img :src="item1.imgs" alt="">
              </div>
              <p>{{item1.goodsname}}</p>
              <p>{{item1.price}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <template v-if="shopData.length < 1">
      <div class="main-footer">
        <div>
          <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
        </div>
        <div class="main-footer-div2">
          <p>{{$t('simplifyThree.main.text3')}}</p>
          <p><span class="main-footer-span">¥ 19.99</span>&nbsp;&nbsp;&nbsp;<span>¥ 29.99</span></p>
          <el-button>{{$t('simplifyThree.main.text4')}}</el-button>
          <p class="main-footer-span">{{$t('simplifyThree.main.text5')}}</p>
        </div>
      </div>
    </template>
    <template  v-for="(item, index) in shopData" v-else>
      <div class="main-footer" v-if="index < 1" :key="index">
        <div @click="routerProduct(item)" class="col-div-box">
          <img :src="item.imgs" alt="">
        </div>
        <div class="main-footer-div2">
          <p>{{item.goodsname}}</p>
          <p><span class="main-footer-span">¥ {{item.price}}</span>&nbsp;&nbsp;&nbsp;<span v-if="item.oldprice > 0">¥ {{item.oldprice}}</span></p>
          <el-button @click="addGouWu(item)">{{$t('simplifyThree.main.text6')}}</el-button>
          <p class="main-footer-span" @click="moreProduct">{{$t('simplifyThree.main.text7')}}</p>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import { ShopExhibition, bannerList, collectlist, addCart } from '../../../common/api/api'
export default {
  name: 'index',
  data () {
    return {
      bannerData: this.$t('lang.templete.templeteFive.main.imgs'), // 轮播数据
      shopData: [], // 产品数据
      featured: [], // 产品系列
      featuredOne: [], // 产品系列第一个
      skip: ''
    }
  },
  methods: {
    // 产品系列跳转到购物页面
    particulars (item) {
      this.$router.push({
        path: 'shopDetailsThree/page3',
        query: {
          productid: item.id
        }
      })
    },
    // 产品跳转到购物页面
    routerProduct (item) {
      this.$router.push({
        path: 'shopDetailsThree/page3',
        query: {
          productid: item.id
        }
      })
    },
    // 更多产品
    moreProduct () {
      this.$emit('getIndex', 1)
      this.$router.push({
        path: '/shopProductThree/page3'
      })
    },
    // 更多系列
    moreSeries (item) {
      this.$router.push({
        path: '/listDetailsThree/page3',
        query: {
          collectid: item.collectid
        }
      })
    },
    // 添加商品到购物车
    addGouWu (item) {
      addCart({
        productid: item.id,
        attrid: []
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$emit('getMessage', resp.data.data)
          this.$message.success(resp.data.msg)
        } else {
          this.$message.error(resp.data.msg)
        }
      })
    }
  },
  created () {
    // 获取轮播图数据
    bannerList({
    }).then(resp => {
      if (resp.data.data.length > 0) {
        this.bannerData = resp.data.data
      } else {
        this.bannerData = this.$t('lang.templete.templeteFive.main.imgs')
      }
    })
    // 获取选购商品数据
    ShopExhibition({}).then(resp => {
      this.shopData = resp.data.data
    })
    // 获取产品系列数据
    collectlist({
    }).then(resp => {
      this.featured = resp.data.data
    })
  }
}
</script>

<style scoped lang="less">
  @import '../../../common/css/common';
  .el-carousel__item{
    .flexCss;
    img{
      max-height: 100%;
      max-width: 100%;
    }
  }
  .imgBoxCss{
    background: #F0F1F1;
    border:2px solid rgba(212,215,216,1);
    .flexCss;
    img{
      max-height: 100%;
      max-width: 100%;
    }
  }
  main{
    width: 41rem;
    margin: auto;
    .main-content{
      .main-content-row{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .col-div{
          margin-top: 20px;
          >div{
            width:9.25rem;
            height:9.25rem;
            .imgBoxCss;
          }
        }
      }
    }
    .main-footer{
      display: flex;
      margin: 148px auto 100px auto;
      >div:nth-child(1) {
        width:19.8125rem;
        height:19.8125rem;
        margin-right: 42px;
        .imgBoxCss;
      }
      .main-footer-div2{
        >p:nth-child(1){
          font-size: 1.25rem;
          margin-top: 0;
          color: #333333;
        }
        >p:nth-child(2){
          >span:nth-child(2){
            color: black;
            font-size: 0.75rem;
            text-decoration:line-through;
          }
        }
      }
      .main-footer-span{
        color: #FF9999;
        font-size: 0.75rem;
        cursor: pointer;
      }
    }
  }
  .col-div-box{
    cursor: pointer;
  }
  .main-content-title{
    .flexBetween;
    margin-top: 55px;
    >span:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      color: black;
    }
    >span:nth-child(2){
      color: black;
    }
  }
</style>

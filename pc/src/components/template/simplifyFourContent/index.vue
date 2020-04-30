<template>
  <main>
    <div class="nav-box">
      <el-carousel trigger="click" height="430px">
        <el-carousel-item v-for="item in bannerData" :key="item">
          <img :src="item.picture" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <template v-if="shopData.length < 1">
    <el-row class="main-content">
      <el-col :span="14">
        <p>图像与文本</p>
        <p>将大文本与图像配对，以便将焦点放在所选产品，集合或博客文章上。添加有关可用性，样式的详 细信息，甚至提供评论。</p>
        <el-button>阅读更多</el-button>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="6" class="product-img">
        <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
      </el-col>
    </el-row>
    </template>
    <template v-else>
      <div  v-for="(item, index) in shopData"  :key="index">
      <el-row class="main-content" v-if="index < 1">
        <el-col :span="14">
          <p>{{item.goodsname}}</p>
          <p>将大文本与图像配对，以便将焦点放在所选产品，集合或博客文章上。添加有关可用性，样式的详 细信息，甚至提供评论。</p>
          <el-button>阅读更多</el-button>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="6" class="product-img" @click.native="routerProduct(item)">
          <img :src="item.imgs" alt="">
        </el-col>
      </el-row>
      </div>
    </template>
    <template>
    </template>
    <div class="main-footer">
      <p>精选系列</p>
      <p>查看全部</p>
      <div>
        <el-row :gutter="20" class="main-content-row">
          <el-col :span="4" v-for="(item, index) in setData" :key="index">
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
    </div>
  </main>
</template>

<script>
import { ShopExhibition, bannerList, collectlist } from '../../../common/api/api'
export default {
  name: 'index',
  data () {
    return {
      setData: [
        {
          src: require('../../../assets/administratorPanel/templateImg/198.png'),
          text: this.$t('sampleProductTitle'),
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/252.png'),
          text: this.$t('sampleProductTitle'),
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/26.png'),
          text: this.$t('sampleProductTitle'),
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/1.png'),
          text: this.$t('sampleProductTitle'),
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/198.png'),
          text: this.$t('sampleProductTitle'),
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/252.png'),
          text: this.$t('sampleProductTitle'),
          price: '$ 19.99'
        }
      ],
      bannerData: [], // 轮播数据
      shopData: [], // 产品数据
      featured: [] // 产品系列
    }
  },
  methods: {
    particulars (item) {
      this.$router.push({
        path: 'shopDetailsOne/page1',
        query: {
          productid: item.id
        }
      })
    },
    routerProduct (item) { // 产品详情
      console.log(item)
      this.$router.push({
        path: 'shopDetailsOne/page1',
        query: {
          productid: item.id
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
  .main-footer{
    background: #F5F5F5;
    margin: 59px auto 37px auto;
    .flexCss;
    flex-direction: column;
    .main-content-row{
      width:50.625rem;
      .flexCss;
      flex-wrap: wrap;
      .col-div{
        margin-top: 20px;
        >div{
          width:8.03125rem;
          height:8.03125rem;
          .imgBoxCss;
          border: none;
          background: white;
        }
      }
    }
  }
  main{
    overflow: hidden;
    background:#F2F2F2;
    .nav-box{
      width: 100%;
      height:456px;
    }
    .main-content{
      width: 42rem;
      margin: 60px auto auto auto;
      .flexBetween;
    }
    .product-img{
      width:11.34375rem;
      height:11.34375rem;
      .imgBoxCss;
      border: none;
      background: white;
    }
  }
</style>

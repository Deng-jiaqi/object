<template>
  <div>
    <nav>
      <div  class="banner-div" v-if="bannerData.length < 1">
        <p>{{$t('simplifyOne.nav.text1')}}</p>
        <p>{{$t('simplifyOne.nav.text2')}}</p>
      </div>
      <el-carousel indicator-position="outside" v-else>
        <el-carousel-item v-for="item in bannerData" :key="item">
          <img :src="item.picture" alt="">
        </el-carousel-item>
      </el-carousel>
    </nav>
    <main>
      <div class="content-list">
<!--        // 静态产品系列-->
        <template v-if="featured.length < 1">
          <p>{{$t('slideShow.main.text1')}}</p>
          <el-row>
            <el-col :span="12" v-for="(item, index) in listData" :key="index">
              <div class="img-box">
                <div>
                  <img :src="item.img" alt="">
                </div>
                <p>{{item.text1}}</p>
                <p>{{item.price}}</p>
              </div>
            </el-col>
          </el-row>
        </template>
<!--        // 数据产品系列-->
        <template v-else>
          <el-row>
            <template  v-for="(item, index) in featured">
              <div  v-if="item.goodsinfo.length > 0"  :key="index">
                <div>
                  <p class="content-list-text">
                    <span>{{item.name}}</span>
                    <span @click="moreSeries(item)" class="more-text2">{{$t('simplifyOne.main.text1')}}</span></p>
                  <el-col :span="12" v-for="(item1, idx) in item.goodsinfo" :key="idx">
                      <div class="img-box">
                        <div  @click="particulars(item1,idx)">
                          <img :src="item1.imgs" alt="">
                        </div>
                        <p>{{item1.goodsname}}</p>
                        <p>$ {{item1.price}}</p>
                      </div>
                  </el-col>
                </div>
              </div>
            </template>
          </el-row>
        </template>
<!--        静态产品-->
        <template v-if="shopData.length < 1">
          <el-row class="main-content2">
            <el-col :span="24">
              <div>
                <img src="../../../assets/administratorPanel/templateImg/50.png" alt="">
              </div>
            </el-col>
            <el-col :span="24">
              <p>{{$t('simplifyOne.main.text2')}}</p>
              <p>{{$t('simplifyOne.main.text3')}}</p>
            </el-col>
          </el-row>
        </template>
<!--        数据产品-->
        <template v-else>
          <div  v-for="(item, index) in shopData"  :key="index">
            <el-row class="main-content2" v-if="index < 1">
              <el-col :span="24">
                <div @click="routerProduct(item)" style="cursor: pointer">
                  <img :src="item.imgs" alt="">
                </div>
              </el-col>
              <el-col :span="24">
                <p>{{item.goodsname}}</p>
                <p>{{$t('simplifyOne.main.text3')}}</p>
                <p @click="moreProduct" class="more-text">{{$t('simplifyOne.main.text4')}}</p>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { ShopExhibition, bannerList, collectlist } from '../../../common/api/api'
export default {
  name: 'index',
  data () {
    return {
      bannerShow: false,
      bannerData: [], // 轮播数据
      shopData: [], // 产品数据
      featured: [], // 产品系列
      featuredOne: [], // 产品系列第一个
      listData: [
        {
          img: require('../../../assets/administratorPanel/templateImg/198.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/252.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/27.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/198.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/252.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/27.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        }
      ]
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
    routerProduct (item) {
      console.log(item)
      this.$router.push({
        path: 'shopDetailsOne/page1',
        query: {
          productid: item.id
        }
      })
    },
    // 更多产品
    moreProduct () {
      this.$emit('getIndex', 1)
      this.$router.push({
        path: '/shopProductOne/page1'
      })
    },
    // 更多系列
    moreSeries (item) {
      this.$router.push({
        path: '/listDetailsOne/page1',
        query: {
          collectid: item.collectid
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
<style lang="less">
  .menu-box{
    height: 50%;
  }
  .menu-box-search{
    padding: 0 16px;
  }
</style>
<style scoped lang="less">
  @import "../../../common/css/common";
  .el-carousel__item{
    .flexCss;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .content-list-text{
    text-align: center;
    font-weight: bold;
    font-size: 21px;
    position: relative;
    .flexBetween;
    padding: 0 20px;
  }
  .content-list {
    .flexCss;
    flex-wrap: wrap;
    > p:nth-child(1) {
      .content-list-text;
    }
    .img-box {
      .flexCss;
      flex-direction: column;
      p{
        width: 140px;
        margin: 6px auto;
        white-space: nowrap; /*文本不换行*/
        overflow:hidden; /*溢出的部分隐藏*/
        text-overflow:ellipsis;
      }
      p:nth-child(3){
        color: black;
        font-weight: bold;
      }
      > div {
        border: 1px solid #e3e3e3;
        background: #F0F1F1;
        width:152px;
        height:152px;
        cursor: pointer;
        .flexCss;
        >img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .main-content2{
    .flexCss;
    flex-wrap: wrap;
    margin-top: 80px;
    >div:nth-child(1) {
      >div{
        width:327px;
        height:324px;
        background: #F0F1F1;
        .flexCss;
        border:1px solid rgba(212,215,216,1);
        margin: auto;
        >img{
          width: 100%;
          height: 100%;
        }
      }
    }
    >div:nth-child(2){
      width:327px;
      margin: auto;
      >p:nth-child(1){
        font-size: 20px;
        color: #333333;
        font-weight: bold;
      }
      >p:nth-child(2){
        color: #999999;
        line-height: 20px;
      }
    }
  }
  nav{
    background: #F0F1F1;
    .banner-div{
      width: 100%;
      height: 375px;
      background-image: url("../../../assets/administratorPanel/templateImg/27rectangle.png");
      .flexCss;
      flex-direction: column;
      >p{
        font-weight: bold;
        text-align: center;
        margin: 15px;
      }
      >p:nth-child(1) {
       font-size: 34px;
        color: white;
      }
      >p:nth-child(2){
        font-size: 16px;
        color: white;
      }
    }
  }
  .more-text{
    cursor: pointer;
  }
  .more-text2{
    cursor: pointer;
    font-size: 16px;
  }
</style>

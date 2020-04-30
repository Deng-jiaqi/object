<template>
  <div>
    <nav>
      <div class="banner-div" v-if="bannerData.length < 1">
        <p>{{$t('simplifyOne.nav.text1')}}</p>
        <p>{{$t('simplifyOne.nav.text2')}}</p>
      </div>
      <el-carousel indicator-position="outside" v-else>
        <el-carousel-item v-for="item in bannerData" :key="item">
          <img :src="item.picture" alt />
        </el-carousel-item>
      </el-carousel>
    </nav>
    <main>
      <div class="content-list">
        <!--        // 静态产品系列-->
        <template v-if="featured.length < 1">
          <p>{{$t('slideShow.main.text1')}}</p>
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item, index) in listData" :key="index">
              <div class="img-box">
                <div>
                  <img :src="item.img" alt />
                </div>
                <p>{{item.text1}}</p>
                <p>{{item.price}}</p>
              </div>
            </el-col>
          </el-row>
        </template>
        <!--        // 数据产品系列-->
        <template v-else>
          <el-row :gutter="20">
            <template v-for="(item, index) in featured">
              <div v-if="item.goodsinfo.length > 0" :key="index">
                <div>
                  <div class="content-list-text">
                    {{item.name}}
                    <span
                      @click="moreSeries(item)"
                      class="more-text2"
                    >{{$t('simplifyOne.main.text1')}} ></span>
                  </div>
                  <el-row>
                    <el-col :span="8" v-for="(item1, idx) in item.goodsinfo" :key="idx">
                      <div class="img-box">
                        <div @click="particulars(item1,idx)">
                          <img :src="item1.imgs" alt />
                        </div>
                        <p>{{item1.goodsname}}</p>
                        <p>{{item1.price}}</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </template>
          </el-row>
        </template>
        <!--        静态产品-->
        <template v-if="shopData.length < 1">
          <el-row class="main-content2">
            <el-col :span="11">
              <div>
                <img src="../../../assets/administratorPanel/templateImg/50.png" alt />
              </div>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <p>{{$t('simplifyOne.main.text2')}}</p>
              <p>{{$t('simplifyOne.main.text3')}}</p>
            </el-col>
          </el-row>
        </template>
        <!--        数据产品-->
        <template v-else>
          <div v-for="(item, index) in shopData" :key="index">
            <el-row class="main-content2" v-if="index < 1">
              <el-col :span="11">
                <div @click="routerProduct(item)" style="cursor: pointer">
                  <img :src="item.imgs" alt />
                </div>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="11">
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
    routerProduct (item) { // 产品详情
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

<style scoped lang="less">
@import "../../../common/css/common";
.el-carousel__item {
  .flexCss;
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
.content-list-text {
  margin: 40px auto;
  text-align: center;
  font-weight: bold;
  font-size: 21px;
  position: relative;
}
.content-list {
  padding: 0 7rem 2.5rem 7rem;
  margin-top: 126px;
  > p:nth-child(1) {
    .content-list-text;
  }
  .img-box {
    > div {
      border: 1px solid #e3e3e3;
      background: #f0f1f1;
      height: 11.8125rem;
      width: 11.8125rem;
      cursor: pointer;
      .flexCss;
      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
.main-content2 {
  .flexCss;
  margin-top: 4.875rem;
  > div:nth-child(1) {
    > div {
      width: 23rem;
      height: 23rem;
      background: #f0f1f1;
      .flexCss;
      border: 2px solid rgba(212, 215, 216, 1);
      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  > div:nth-child(3) {
    > p:nth-child(1) {
      font-size: 34px;
      color: #333333;
      font-weight: bold;
    }
    > p:nth-child(2) {
      color: #999999;
      line-height: 20px;
    }
  }
}
nav {
  background: #f0f1f1;
  .banner-div {
    height: 20.0625rem;
    background-image: url("../../../assets/administratorPanel/templateImg/27rectangle.png");
    .flexCss;
    flex-direction: column;
    > p {
      color: #333333;
      font-weight: bold;
      width: 34.375rem;
      text-align: center;
      margin: 15px;
    }
    > p:nth-child(1) {
      font-size: 2.75rem;
    }
    > p:nth-child(2) {
      font-size: 1rem;
    }
  }
}
.more-text {
  cursor: pointer;
}
.more-text2 {
  position: absolute;
  right: 80px;
  cursor: pointer;
  font-size: 16px;
}
</style>

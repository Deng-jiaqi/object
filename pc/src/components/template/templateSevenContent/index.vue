<template>
  <main>
    <div>
      <!--      有数据渲染banner-->
      <template v-if="bannerData.length > 0">
        <div class="block">
          <el-carousel trigger="click" height="450px">
            <el-carousel-item v-for="item in bannerData" :key="item">
              <img :src="item.picture" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
      <!--      静态数据-->
      <template v-else>
        <div class="header-img-box">
          <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
          <div>
            <p>{{$t('lang.templete.templeteSeven.header.text8')}}</p>
            <p>{{$t('lang.templete.templeteSeven.header.text9')}}</p>
          </div>
        </div>
      </template>
    </div>
    <div class="main-box1">
      <div class="box1-content1">
        <p>{{$t('lang.templete.templeteSeven.main.content1.text1')}}</p>
        <p>{{$t('lang.templete.templeteSeven.main.content1.text2')}}</p>
      </div>
<!--      // 产品渲染-->
      <template v-if="shopData.length > 0">
        <template v-for="(item, index) in shopData">
          <div class="box1-content2" :key="index" v-if="index < 1">
            <div @click="particulars(item,index)" style="cursor: pointer">
              <img :src=item.imgs alt="">
            </div>
            <div>
              <p>{{item.goodsname}}</p>
              <p>{{$t('lang.templete.templeteSeven.main.content1.text4')}}</p>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="box1-content2">
          <div>
            <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
          </div>
          <div>
            <p>{{$t('lang.templete.templeteSeven.main.content1.text3')}}</p>
            <p>{{$t('lang.templete.templeteSeven.main.content1.text4')}}</p>
          </div>
        </div>
      </template>
      <template v-if="featured.length > 0">
        <div class="box1-content3" v-for="(item, index) in featured" :key="index">
          <template v-if="item.goodsinfo.length > 0">
            <div class="content3-box" v-for="(v, i) in item.goodsinfo" :key="i">
              <div class="content3-img-box" @click="particulars(v,i)">
                <img :src=v.imgs alt="">
              </div>
              <p>{{v.goodsname}}</p>
              <p class="content3-img-box-price">{{v.price}}</p>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="box1-content3">
          <div class="content3-box" v-for="(item, index) in $t('lang.templete.templeteSeven.main.imgData')" :key="index">
            <div class="content3-img-box">
              <img :src=item.src alt="">
            </div>
            <p>{{item.text1}}</p>
            <p class="content3-img-box-price">{{item.price}}</p>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import { ShopExhibition, collectlist, bannerList } from '../../../common/api/api'
export default {
  name: 'index',
  data () {
    return {
      shopData: [],
      featured: [],
      bannerData: [] // 轮播数据
    }
  },
  methods: {
    // 跳转到商品的详情页面
    particulars (item) {
      this.$router.push({
        path: 'shopDetailsSeven/page7',
        query: { productid: item.id }
      })
    }
  },
  created () {
    ShopExhibition({}).then(resp => {
      this.shopData = resp.data.data
    })
    // 获取轮播图数据
    bannerList({
    }).then(resp => {
      if (resp.data.data.length > 0) {
        this.bannerData = resp.data.data
      } else {
        this.bannerData = this.$t('lang.templete.templeteFive.main.imgs')
      }
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
  .el-carousel__item{
    background-color: #e3e3e3;
    .flexCss;
    img{
      max-height: 100%;
      max-width: 100%;
    }
  }
  .header-img-box {
    .flexCss;
    position: relative;
    margin: 110px auto 150px auto;
    div {
      position: absolute;
      right: 88px;
      top: 40%;
      p:nth-child(1) {
        font-size: 27px;
        font-weight: bold;
        margin-bottom: 13px;
      }
      p:nth-child(2) {
        font-size: 18px;
        margin-top: 0;
      }
    }
  }
  .pCss {
    font-size: 24px;
    font-weight: bold;
  }
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween {
    display: flex;
    justify-content: space-between;
  }
  main {
    .main-box1 {
      padding: 1rem 4.5625rem 2.5rem 4.5625rem;
      .box1-content1 {
        margin: 0 auto 56px auto;
        text-align: center;
        p:nth-child(1) {
          .pCss
        }
      }
      .box1-content2 {
        .flexBetween;
        align-items: center;
        > div:nth-child(1) {
          width:19.75rem;
          height:19.75rem;
          background: rgba(241, 242, 243, 1);
          .flexCss;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        > div:nth-child(2) {
          width:25.4375rem;
          background: rgba(248, 248, 248, 1);
          text-align: center;
          p:nth-child(1) {
            .pCss;
          }
          p:nth-child(2) {
            line-height: 30px;
          }
        }
      }
      .box1-content3 {
        margin-top: 60px;
        .flexBetween;
        flex-wrap: wrap;
        .content3-box {
          text-align: center;
          margin-top: 50px;
          .content3-img-box-price {
            color: black;
            font-weight: bold;
          }
          .content3-img-box {
            cursor:pointer;
            width: 16rem;
            height: 16rem;
            background: rgba(241, 242, 243, 1);
            .flexCss;
            >img{
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }
</style>

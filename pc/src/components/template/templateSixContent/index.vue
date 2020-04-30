<template>
  <main>
    <div class="main-box">
      <p class="main-title">{{$t('lang.templete.templeteSix.main.content1.text1')}}</p>
      <div class="main-content-box">
        <div>
          <div class="main-content-img-box">
            <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
          </div>
          <p class="content-img-text">{{$t('lang.templete.templeteSix.main.content1.text2')}}</p>
        </div>
        <div class="main-content-img-box2">
          <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
        </div>
      </div>
      <div style="position: relative">
        <swiper :options="swiperOption" v-if="bannerData.length>0">
          <swiper-slide v-for="(slide, index) in bannerData" :key="index">
            <img :src="slide.picture" alt="">
          </swiper-slide>
        </swiper>
        <div class="swiper-button-next" style="outline: none;"></div>
      </div>
      <div class="main3-box3">
        <p class="main3-box3-text1">{{$t('lang.templete.templeteSix.main.content3.text1')}}</p>
        <div class="main3-box3-box" v-if="shopData.length < 1">
          <div>
            <div class="main3-box3-img-box">
              <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
            </div>
            <p>{{$t('lang.templete.templeteSix.main.content3.text2')}}</p>
            <p>{{$t('lang.templete.templeteSix.main.content3.price')}}</p>
          </div>
          <div>
            <div class="main3-box3-img-box2">
              <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
            </div>
            <p>{{$t('lang.templete.templeteSix.main.content3.text2')}}</p>
            <p>{{$t('lang.templete.templeteSix.main.content3.price')}}</p>
          </div>
        </div>
        <div class="main3-box3-box" v-else>
          <template v-for="(item, index) in shopData">
            <div :key="index" v-if="index < 1">
              <div class="main3-box3-img-box">
                <img :src="item.imgs" alt="">
              </div>
              <p>{{item.goodsname}}</p>
              <p>{{item.price}}</p>
            </div>
          </template>
          <template v-for="(item, index) in shopData.slice(1)">
            <div :key="index+2" v-if="index < 1">
              <div class="main3-box3-img-box2">
                <img :src="item.imgs" alt="">
              </div>
              <p>{{item.goodsname}}</p>
              <p>{{item.price}}</p>
            </div>
          </template>
        </div>
      </div>
      <div class="main4-box4" v-for="(item, index) in $t('lang.templete.templeteSix.main.box4Data')" :key="index">
        <div>
          <p>{{item.text1}}</p>
          <p>{{item.text2}}</p>
          <p>{{item.text3}}</p>
        </div>
        <div v-for="(i, idx) in item.box4Img" :key="idx">
          <div :class="idx===0 ? boxClass[0] : idx===1? boxClass[1] :boxClass[2]">
            <img :src=i.src alt="">
          </div>
          <p>{{i.text1}}</p>
          <p>{{i.text2}}</p>
        </div>
      </div>
    </div>
    <div class="content2-box">
      <div>
        <p class="content2-box2-p">{{$t('lang.templete.templeteSix.main.content5.text1')}}</p>
      </div>
      <div class="content2-box2">
        <div>
          <div class="content2-box2-img-box1">
            <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
          </div>
        </div>
        <div>
          <div class="content2-box2-img-box2">
            <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
          </div>
          <p class="content2-box2-text">{{$t('lang.templete.templeteSix.main.content5.text2')}}</p>
        </div>
      </div>
      <div class="content2-box3">
        <div class="content2-box2-box">
          <div class="content2-box2-img-box3">
            <img src="../../../assets/administratorPanel/templateImg/50.png" alt="">
          </div>
        </div>
        <div class="content2-box2-text-box">
          <p>{{$t('lang.templete.templeteSix.main.content5.text3')}}</p>
          <div>{{$t('lang.templete.templeteSix.main.content5.btn')}}</div>
        </div>
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
      swiperOption: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        notNextTick: true,
        speed: 1000,
        // loop: true,
        navigation: {
          nextEl: '.swiper-button-next'
        }
      },
      bannerData: [],
      featured: [],
      boxClass: [
        'main4-box4-box1',
        'main4-box4-box2',
        'main4-box4-box3'
      ],
      shopData: []
    }
  },
  methods: {
    QhImg () {
      let lunbo = document.getElementsByClassName('main2-box2')[0]
      let imgLength = document.getElementsByClassName('main-content2-box')
      lunbo.appendChild(imgLength[0])
    },
    // 跳转到商品的详情页面
    particulars (item) {
      this.$router.push({
        path: 'shopDetailsSix/page6',
        query: {
          storeid: 1,
          productid: item.id
        }
      })
    }
  },
  created () {
    ShopExhibition({}).then(resp => {
      console.log(resp)
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
  .swiper-slide {
    width: 80%;
  }
  .swiper-slide:nth-child(2n) {
    width: 80%;
  }
  .swiper-slide:nth-child(3n) {
    width: 80%;
  }
  .swiper-button-prev {
    transition: all 0.3s linear;
    top: 6.25rem;
  }
  .swiper-button-next {
    top: 6.25rem;
    transition: all 0.3s linear;
  }
  .swiper-slide {
    .flexCss;
    height: 15.625rem;
    background-color: #DBE2D9;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-title {
    font-size: 45px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  .main-box {
    background: rgba(244, 251, 242, 1);
    overflow: hidden;
  }
  .main-content-img-box {
    width: 25.9375rem;
    height: 17.25rem;
    background: rgba(219, 226, 217, 1);
  .flexCss;
  }
  .main-content-img-box2 {
  .flexCss;
    width: 25.9375rem;
    height: 28.625rem;
    background: rgba(219, 226, 217, 1);
    margin-top: 3.8125rem;
  }
  .main-content-box {
    display: flex;
    justify-content: space-between;
    padding: 2.3125rem;
  }
  .content-img-text {
    margin: 4.0625rem auto auto auto;
    width: 17rem;
    color: black;
    line-height: 1.0625rem;
  }
  .ClickImg {
    font-size: 40px;
    text-align: right;
    cursor: pointer;
  }
  .main3-box3-img-box {
    width: 21.625rem;
    height: 28.875rem;
    margin-top: 4.125rem;
    background: rgba(219, 226, 217, 1);
  .flexCss;
    >img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .main3-box3-img-box2 {
    width: 21.5625rem;
    height: 14.375rem;
    background: rgba(219, 226, 217, 1);
  .flexCss;
    >img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .main3-box3-box {
    display: flex;
    justify-content: space-between;
  }
  .main3-box3 {
    padding: 3.5625rem;
  }
  .main3-box3-text1 {
    color: rgba(51, 51, 51, 1);
    font-size: 32px;
  }
  .main4Css {
    background: rgba(219, 226, 217, 1);
  .flexCss;
  }
  .main4-box4-box1 {
    width: 11.9375rem;
    height: 7.875rem;
    .main4Css;
  }
  .main4-box4-box2 {
    width: 11.9375rem;
    height: 15.875rem;
    .main4Css;
  }
  .main4-box4-box3 {
    width: 11.9375rem;
    height: 11.875rem;
    .main4Css;
  }
  .main4-box4 {
    padding: 74px;
    display: flex;
    justify-content: space-between;
  }
  .content2-box2-img-box1 {
    width: 25.9375rem;
    height: 34.625rem;
    background: rgba(229, 229, 229, 1);
  .flexCss;
    margin-top: 4.125rem;
  }
  .content2-box2-img-box2 {
    width: 25.9375rem;
    height: 17.3125rem;
    background: rgba(229, 229, 229, 1);
  .flexCss;
  }
  .content2-box2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.9375rem;
  }
  .content2-box3 {
    display: flex;
    margin-bottom: 3.9375rem;
  }
  .content2-box2-text {
    margin: 4.0625rem auto auto auto;
    width: 17rem;
    color: black;
    line-height: 1.0625rem;
  }
  .content2-box {
    padding: 2.3125rem;
  }
  .content2-box2-p {
    font-size: 1.34375rem;
    color: rgba(51, 51, 51, 1);
    width: 16.5625rem;
    margin-left: 12%;
  }
  .content2-box2-img-box3 {
    width: 19.0625rem;
    height: 25.4375rem;
    background: rgba(229, 229, 229, 1);
  .flexCss;
  }
  .content2-box2-box {
    width: 25.9375rem;
    display: flex;
    justify-content: flex-end;
  }
  .content2-box2-text-box {
    margin-left: 6.25rem;
  p {
    font-size: 24px;
    color: black;
  }
  div {
    width: 9.625rem;
    height: 1.4375rem;
    background: black;
    line-height: 1.4375rem;
    text-align: center;
    color: white;
    margin-top: 1.5625rem;
  }
  }
</style>

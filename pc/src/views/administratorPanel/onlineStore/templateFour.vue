<template>
  <div class="t4-container">
    <header>
      <span class="left">{{$t('lang.templeteFour.text1')}}</span>
      <span class="mid">{{$t('lang.templeteFour.text2')}}</span>
      <span class="right">{{$t('lang.templeteFour.text3')}}({{number}})</span>
    </header>
    <!-- nav -->
    <div class="nav">
      <router-link :to="$t('lang.templeteFour.text4.href')">{{$t('lang.templeteFour.text4.title')}}</router-link>
      <div class="block"></div>
      <router-link :to="$t('lang.templeteFour.text4.href')">{{$t('lang.templeteFour.text5.title')}}</router-link>
    </div>
    <!-- 送货 -->
    <div class="delivery">
      <div class="content">
        <div class="left">
          <p>{{$t('lang.templeteFour.text6')}}</p>
          <p>{{$t('lang.templeteFour.text7')}}</p>
        </div>
        <div class="line"></div>
        <div class="right">
          <p>{{$t('lang.templeteFour.text8')}}</p>
          <p>{{$t('lang.templeteFour.text9')}}</p>
        </div>
      </div>
    </div>
    <!-- 轮播占位 -->
    <div class="c-lunbo-placeholder" v-if="!storyImgs">
      <div class="box">
        <p class="text1">{{$t('lang.templeteFour.text10')}}</p>
        <p class="text2">{{$t('lang.templeteFour.text11')}}</p>
      </div>
    </div>
    <!-- 轮播图 -->
    <div v-if="storyImgs" class="c-lunbo">
      <swiper :options="swiperOptionOne" ref="mySwiper" class="slideshow">
        <swiper-slide v-for="(item,index) in storyImgs" :key="index">
          <img class="one" :src="item" alt />
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </div>
    <!-- 图像和文本 -->
    <div class="imagestext clearfix">
      <div class="left">
        <p class="title">{{$t('lang.templeteFour.text12')}}</p>
        <p class="text">{{$t('lang.templeteFour.text13')}}</p>
        <div class="more">{{$t('lang.templeteFour.text14')}}</div>
      </div>
      <div class="right">
        <PlaceholderFigure
          :width="'11.34375rem'"
          :height="'11.34375rem'"
          :imgWidth="'4.0625rem'"
          :imgHeight="'3.15625rem'"
          :imgsrc="$t('lang.templeteFour.textimg')"
          :backgroundColor="'#fff'"
        />
      </div>
    </div>
    <!-- 精选系列 -->
    <div class="select">
      <p class="title">
        <span @click="preImg">←</span>
        {{$t('lang.templeteFour.text15')}}
        <span @click="nextImg">→</span>
      </p>
      <p class="all">{{$t('lang.templeteFour.text16')}}</p>
      <ul class="goods">
        <!-- <swiper :options="swiperOptionTwo" ref="featuredSwiper">
          <swiper-slide class="collection">
            <PlaceholderFigure
              :width="'16.5rem'"
              :height="'15.0625rem'"
              :imgsrc="$t('lang.templeteFour.text10.imgsrc')"
              :imgWidth="$t('lang.templeteFour.text10.imgWidth')"
              :imgHeight="$t('lang.templeteFour.text10.imgHeight')"
              :backgroundColor="'#fff'"
            />
          </swiper-slide>
          <swiper-slide>
            <PlaceholderFigure
              class="collection"
              :width="'16.5rem'"
              :height="'15.0625rem'"
              :imgsrc="$t('lang.templeteFour.text10.imgsrc')"
              :imgWidth="$t('lang.templeteFour.text10.imgWidth')"
              :imgHeight="$t('lang.templeteFour.text10.imgHeight')"
              :backgroundColor="'#fff'"
            />
          </swiper-slide>
        </swiper>-->
        <li>
          <swiper v-if="!featuredGoods" :options="swiperOptionTwo" ref="featuredSwiper">
            <swiper-slide v-for="(item,index) in $t('lang.templeteFour.text17')" :key="index">
              <PlaceholderFigure
                class="good"
                :width="'8.03125rem'"
                :height="'8.03125rem'"
                :imgsrc="item.imgsrc"
                :imgWidth="item.imgWidth"
                :imgHeight="item.imgHeight"
                :backgroundColor="'#fff'"
              />
              <p class="goodtitle">{{item.title}}</p>
              <p>{{item.price}}</p>
            </swiper-slide>
          </swiper>
          <swiper :options="swiperOptionTwo" ref="featuredSwiper">
            <swiper-slide v-for="(item,index) in featuredGoods" :key="index">
              <img :src="item.imgsrc" class="featuredGood" />
              <p class="goodtitle">{{item.title}}</p>
              <p>{{item.price}}</p>
            </swiper-slide>
          </swiper>
        </li>
      </ul>
    </div>
    <!-- 博客文章 -->
    <div class="blogarticle">
      <p class="title">{{$t('lang.templeteFour.text18')}}</p>
      <ul class="blogs">
        <li v-for="(item,index) in $t('lang.templeteFour.text19')" :key="index">
          <PlaceholderFigure
            class="blog"
            :width="'10.46875rem'"
            :height="'10.46875rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :backgroundColor="'#fff'"
          />
          <p class="blogtitle">{{item.title}}</p>
          <p class="blogtext1">{{item.text1}}</p>
          <p class="blogtextInfo">{{item.textInfo}}</p>
        </li>
      </ul>
    </div>
    <!-- 图 -->
    <PlaceholderFigure
      :width="'100%'"
      :height="'15rem'"
      :imgsrc="$t('lang.templeteFour.img')"
      :imgWidth="'36.6875rem'"
      :imgHeight="'12.375rem'"
      :backgroundColor="'#fff'"
    />
    <!-- ins -->
    <div class="ins">
      <p class="title">{{$t('lang.templeteFour.text20')}}</p>
      <ul class="insGoodsone">
        <li v-for="(item,index) in $t('lang.templeteFour.text28')" :key="index">
          <PlaceholderFigure
            class="insGood"
            :width="'11.25rem'"
            :height="'11.25rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :backgroundColor="'#fff'"
          />
        </li>
      </ul>
      <ul class="insGoodstwo">
        <li v-for="(item,index) in $t('lang.templeteFour.text29')" :key="index">
          <PlaceholderFigure
            class="insGood"
            :width="'11.25rem'"
            :height="'11.25rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :backgroundColor="'#fff'"
          />
        </li>
      </ul>
    </div>
    <!-- 注册我们的通讯 -->
    <div class="communication">
      <p class="title">{{$t('lang.templeteFour.text21')}}</p>
      <div class="c-input">
        <input type="text" class="emailInput" :placeholder="$t('lang.templeteFour.text22')" />
        <span class="button"></span>
      </div>
    </div>
    <!-- toOther -->
    <div class="toOther">
      <ul class="toOtherContent">
        <li v-for="(item,index) in $t('lang.templeteFour.text23')" :key="index">
          <router-link :to="item.href">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <router-link
        :to="$t('lang.templeteFour.text24.href')"
      >{{$t('lang.templeteFour.text24.title')}}</router-link>
    </div>
    <!-- footer -->
    <footer>{{$t('lang.templeteFour.text27')}}</footer>
  </div>
</template>

<script>
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
export default {
  name: 'TemplateFour',
  data () {
    return {
      swiperOptionOne: {
        // some swiper options/callbacks
        notNextTick: false,
        loop: true,
        // swiper configs 所有的配置同swiper官方api配置
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionTwo: {
        // 精选轮播配置
        notNextTick: false,
        loop: true,
        loopAdditionalSlides: 5,
        // swiper configs 所有的配置同swiper官方api配置
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: true
        // },
        width: 300, // 一个slide的大小
        coverflowEffect: {
          stretch: 0
        }
      },
      //   变量
      number: 0, // 购物车物品数量
      // data
      storyImgs: [
        require('../../../assets/addShop/imgMa.png'),
        require('../../../assets/loginAndRegister/admin-login-image.png'),
        require('../../../assets/loginAndRegister/forImg.png')
      ],
      featuredGoods: [
        {
          imgsrc: require('../../../assets/addShop/imgMa.png'),
          title: 111,
          price: 123
        },
        {
          imgsrc: require('../../../assets/loginAndRegister/admin-login-image.png'),
          title: 111,
          price: 123
        },
        {
          imgsrc: require('../../../assets/loginAndRegister/forImg.png'),
          title: 111,
          price: 123
        },
        {
          imgsrc: require('../../../assets/addShop/imgMa.png'),
          name: 111,
          price: 123
        },
        {
          imgsrc: require('../../../assets/loginAndRegister/admin-login-image.png'),
          title: 111,
          price: 123
        },
        {
          imgsrc: require('../../../assets/loginAndRegister/forImg.png'),
          title: 111,
          price: 123
        }
      ]
    }
  },
  components: {
    PlaceholderFigure
  },
  methods: {
    preImg () {
      this.$refs.featuredSwiper.swiper.slidePrev()
    },
    nextImg () {
      this.$refs.featuredSwiper.swiper.slideNext()
    }
  }
}
</script>

<style scoped lang='less'>
.t4-container {
  header {
    padding-left: 79px;
    padding-right: 79px;
    display: flex;
    justify-content: space-between;
    height: 83px;
    background: rgba(242, 242, 242, 1);
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    .left {
      font-size: 13px;
      font-weight: 400;
      line-height: 83px;
      color: rgba(51, 51, 51, 1);
    }
    .mid {
      font-size: 27px;
      line-height: 83px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .right {
      font-size: 13px;
      line-height: 83px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .nav {
    height: 57px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(242, 242, 242, 1);
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    .block {
      width: 123px;
      height: 100%;
    }
    a {
      font-size: 12px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .delivery {
    height: 70px;
    background: rgba(242, 242, 242, 1);
    .content {
      width: 661px;
      margin-left: 661px;
      height: 70px;
      display: flex;
      justify-content: space-between;
      .line {
        width: 1px;
        height: 29px;
        background: rgba(51, 51, 51, 1);
        margin-top: 20px;
      }
      .left p:nth-child(1) {
        margin-top: 14px;
        margin-bottom: 9px;
      }
      .left p:nth-child(2) {
        margin: 0;
      }
      .right p:nth-child(1) {
        margin-top: 14px;
        margin-bottom: 9px;
      }
      .right p:nth-child(2) {
        margin: 0;
      }
      p {
        font-size: 13px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .c-lunbo-placeholder {
    height: 456px;
    background-color: rgba(198, 199, 200, 1);
    background-image: url("../../../assets/administratorPanel/templateImg/48.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 58% 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      background-color: rgba(102, 102, 102, 1);
      width: 390px;
      .text1 {
        font-size: 54px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin: 0;
        padding-top: 20px;
        padding-bottom: 10px;
      }
      .text2 {
        margin: 0;
        padding-bottom: 16px;
        text-align: center;
        font-size: 32px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .c-lunbo {
    .slideshow {
      width: 100%;
      height: 456px;
      .one {
        // background-color: red;
        width: 100%;
        height: 100%;
      }
    }
    .slideshow /deep/ .swiper-button-prev {
      left: 39px !important;
    }
    .slideshow /deep/ .swiper-button-next {
      right: 39px !important;
    }
  }
  .imagestext {
    background: rgba(242, 242, 242, 1);
    height: 483px;
    padding-left: 415px;
    padding-right: 415px;
    .left {
      float: left;
      margin-top: 162px;
      width: 651px;
      line-height: 24px;
      .title {
        font-size: 31px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 17px;
      }
      .text {
        font-size: 15px;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 46px;
      }
      .more {
        width: 103px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(0, 0, 0, 1);
        text-align: center;
        line-height: 40px;
      }
    }
    .right {
      float: right;
      margin-top: 61px;
    }
    p {
      margin: 0;
    }
  }
  .select {
    background: rgba(245, 245, 245, 1);
    height: 454px;
    p {
      margin: 0;
    }
    .title {
      padding-top: 38px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
    .all {
      margin-bottom: 18px;
      font-size: 13px;

      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      text-align: center;
    }
    .goods {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      width: 1625px;
      margin: 0;
      margin: auto;
      .good {
      }
      p {
        text-align: center;
        margin: 0;
        font-size: 13px;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
      }
      .goodtitle {
        margin-top: 10px;
        margin-bottom: 7px;
      }
      .featuredGood {
        width: 257px;
        height: 257px;
      }
    }
  }
  .blogarticle {
    height: 723px;
    background: rgba(242, 242, 242, 1);
    p {
      margin: 0;
    }
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 300;
      padding-top: 37px;
      margin-bottom: 20px;
      color: rgba(51, 51, 51, 1);
    }
    .blogs {
      width: 1089px;
      margin: 0;
      margin: auto;
      display: flex;
      justify-content: space-between;
      .blogtitle {
        margin-top: 17px;
        margin-bottom: 18px;
        font-size: 24px;
        font-weight: 400;
        max-width: 335px;
        color: rgba(51, 51, 51, 1);
      }
      .blogtext1 {
        font-size: 13px;
        margin-bottom: 53px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        max-width: 335px;
      }
      .blogtextInfo {
        max-width: 335px;
        font-size: 11px;
        font-weight: 400;
        font-style: italic;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .ins {
    height: 916px;
    background: rgba(242, 242, 242, 1);
    padding-left: 26px;
    padding-right: 26px;
    .title {
      padding-top: 41px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 21px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
    .insGoodsone {
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      margin-bottom: 81px;
    }
    .insGoodstwo {
      width: 1120px;
      margin: 0;
      margin: auto;
      display: flex;
      justify-content: space-between;
    }
  }
  .communication {
    height: 248px;
    .title {
      padding-top: 80px;
      margin: 0;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 21px;
    }
    .c-input {
      text-align: center;
      position: relative;
      input {
        padding-left: 18px;
        width: 288px;
        height: 38px;
        outline: none;
        background: rgba(242, 242, 242, 1);
        border: 1px solid rgba(230, 230, 231, 1);
        border-radius: 4px;
      }
      input::-ms-clear,
      input::-ms-reveal {
        display: none;
      }
      input::-webkit-input-placeholder {
        font-size: 19px;
        color: rgba(204, 204, 204, 1);
      }
      input::-moz-placeholder {
        font-size: 19px;
        color: rgba(204, 204, 204, 1);
      }
      input::-ms-input-placeholder {
        font-size: 19px;
        color: rgba(204, 204, 204, 1);
      }
      .button {
        width: 51px;
        height: 42px;
        background: rgba(0, 162, 225, 1);
        position: absolute;
        right: calc(50% - 205px);
        top: 0;
      }
    }
  }
  .toOther {
    background-color: rgba(28, 34, 63, 1);
    .toOtherContent {
      width: 911px;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      margin: auto;
      a {
        display: block;
        padding-top: 35px;
        font-size: 19px;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .search {
    text-align: center;
    a {
      font-size: 12px;
      font-weight: 300;
      line-height: 60px;
      color: rgba(51, 51, 51, 1);
    }
  }
  footer {
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-size: 13px;
    font-weight: 300;
    color: rgba(153, 153, 153, 1);
  }
}
</style>

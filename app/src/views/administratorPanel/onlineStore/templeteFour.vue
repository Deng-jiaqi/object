<template>
  <div class="page" ref="page">
    <div class="t4-container" :class="toRight?'toRight':''">
      <!-- 点击后灰色背景 -->
      <div class="c-gray-nav" v-if="forshowNav" @click="closeNav"></div>
      <!-- header -->
      <header class="temp-four-header">
        <span @click="openNav" class="iconfont icongengduo1"></span>
        <span class="text">{{$t('lang.templeteFour.text1')}}</span>
        <div class="right">
          <span class="number">({{number}})</span>
          <span class="iconfont icongouwudai"></span>
        </div>
      </header>
      <!-- 轮播图 -->
      <div class="c-lunbo">
        <div class="lunbo">
          <swiper :options="swiperOptionOne" ref="StorySwiper">
            <swiper-slide class="slide" v-for="(item,index) in storyImgs" :key="index">
              <img :src="item" alt />
            </swiper-slide>
          </swiper>
        </div>
        <p class="text1">{{$t('lang.templeteFour.text2')}}</p>
        <p class="text2">{{$t('lang.templeteFour.text3')}}</p>
        <div class="point">
          <span
            v-for="(item,index) in storyImgs"
            :key="index"
            :class="index===storyActiveIndex?'special':''"
          ></span>
        </div>
      </div>
      <!-- 图像与文本 -->
      <div class="c-image-with-text">
        <p class="text1">{{$t('lang.templeteFour.text4')}}</p>
        <p class="text2">{{$t('lang.templeteFour.text5')}}</p>
        <div class="more">{{$t('lang.templeteFour.text6')}}</div>
        <PlaceholderFigure
          :width="'21.1875rem'"
          :height="'21.1875rem'"
          :imgsrc="$t('lang.templeteFour.text7.imgsrc')"
          :imgWidth="$t('lang.templeteFour.text7.imgWidth')"
          :imgHeight="$t('lang.templeteFour.text7.imgHeight')"
          :backgroundColor="'#fff'"
        />
      </div>
      <!-- 精选 -->
      <div class="c-featured-collection">
        <h4 class="title">
          <span @click="preImg" class="iconfont iconyoujiantou rotate"></span>
          {{$t('lang.templeteFour.text8')}}
          <span
            @click="nextImg"
            class="iconfont iconyoujiantou"
          ></span>
        </h4>
        <p class="all">{{$t('lang.templeteFour.text9')}}</p>
        <div class="c-collection-lunbo">
          <swiper :options="swiperOptionTwo" ref="featuredSwiper">
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
          </swiper>
        </div>
      </div>
      <!-- 文章 -->
      <div class="c-blog">
        <p class="title">{{$t('lang.templeteFour.text11')}}</p>
        <div class="c-posts">
          <div class="post" v-for="(item,index) in $t('lang.templeteFour.text12')" :key="index">
            <PlaceholderFigure
              :width="'20.5625rem'"
              :height="'20.5625rem'"
              :imgsrc="item.imgsrc"
              :imgWidth="item.imgWidth"
              :imgHeight="item.imgHeight"
              :backgroundColor="'#fff'"
            />
            <p class="post-title">{{item.title}}</p>
            <p class="post-detail">{{item.detail}}</p>
            <p class="other">{{item.other}}</p>
          </div>
        </div>
      </div>
      <!-- 图 -->
      <PlaceholderFigure
        class="mimg"
        :width="'100%'"
        :height="'11.625rem'"
        :imgsrc="$t('lang.templeteFour.text13.imgsrc')"
        :imgWidth="$t('lang.templeteFour.text13.imgWidth')"
        :imgHeight="$t('lang.templeteFour.text13.imgHeight')"
        :backgroundColor="'#fff'"
      />
      <!-- ins -->
      <div class="c-ins">
        <p class="title">{{$t('lang.templeteFour.text14')}}</p>
        <ul class="goods">
          <li class="good" v-for="(item,index) in $t('lang.templeteFour.text15')" :key="index">
            <PlaceholderFigure
              :width="item.width"
              :height="item.height"
              :imgsrc="item.imgsrc"
              :imgWidth="item.imgWidth"
              :imgHeight="item.imgHeight"
              :backgroundColor="'#fff'"
            />
          </li>
        </ul>
      </div>
      <!-- 邮箱订阅 -->
      <div class="c-signup">
        <p class="title">{{$t('lang.templeteFour.text16')}}</p>
        <div class="c-input">
          <input type="text" :placeholder="$t('lang.templeteFour.text17')" />
          <button><span class="iconfont iconyoujiantou"></span></button>
        </div>
      </div>
      <!-- nav -->
      <div class="c-nav">
        <div class="one">
          <router-link
            :to="$t('lang.templeteFour.text18.href')"
          >{{$t('lang.templeteFour.text18.title')}}</router-link>
        </div>
        <div class="two">
          <router-link
            :to="$t('lang.templeteFour.text19.href')"
          >{{$t('lang.templeteFour.text19.title')}}</router-link>
        </div>
        <div class="three">
          <router-link
            :to="$t('lang.templeteFour.text20.href')"
          >{{$t('lang.templeteFour.text20.title')}}</router-link>
        </div>
        <div class="four">
          <router-link
            :to="$t('lang.templeteFour.text21.href')"
          >{{$t('lang.templeteFour.text21.title')}}</router-link>
        </div>
      </div>
      <!-- search -->
      <div class="search">
        <span @click="openSearchPage">{{$t('lang.templeteFour.text22')}}</span>
      </div>
      <!-- footer -->
      <footer>{{$t('lang.templeteFour.text23')}}</footer>
      <!-- 搜素页 -->
      <SearchPage v-model="searchVal" v-if="forshowSearchPage" />
    </div>
  </div>
</template>

<script>
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
import SearchPage from '@/components/administratorPanel/searchPage'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TempleteFour',
  components: {
    PlaceholderFigure,
    SearchPage
  },
  computed: { ...mapState(['forshowSearchPage']) },
  data () {
    return {
      // story轮播配置
      swiperOptionOne: {
        on: {
          slideChangeTransitionStart: () => {
            let swiper = this.$refs.StorySwiper.swiper
            let i = swiper.activeIndex
            this.storyActiveIndex = i
          }
        }
      },
      swiperOptionTwo: {
        // 精选轮播配置
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        notNextTick: false,
        loop: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          delay: 3000,
          stopOnLastSlide: true
        },
        width: 303, // 一个slide的大小
        coverflowEffect: {
          stretch: 0
        }
      },
      // data
      storyImgs: [
        require('../../../assets/administratorPanel/templateImg/27rectangle.png'),
        require('../../../assets/administratorPanel/templateImg/48.png')
      ],
      // 变量
      searchVal: '',
      number: 0,
      storyActiveIndex: 0, // 顶部轮播图显示图片的下标
      // ui
      toRight: false,
      forshowNav: false
    }
  },
  methods: {
    ...mapMutations(['changeForshowSearchPage']),
    openSearchPage () {
      this.changeForshowSearchPage()
    },
    openNav () {
      this.$refs.page.classList.add('overflow')
      this.toRight = true
      this.forshowNav = true
    },
    closeNav () {
      this.$refs.page.classList.remove('overflow')
      this.toRight = false
      this.forshowNav = false
    },
    preImg () {
      this.$refs.featuredSwiper.swiper.slidePrev()
    },
    nextImg () {
      this.$refs.featuredSwiper.swiper.slideNext()
    }
  }
}
</script>

<style lang='less' scoped>
.toRight {
  transform: translateX(630px);
}
.overflow {
  overflow-y: hidden;
}
p {
  margin: 0;
}
.page {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  .t4-container {
    width: 100%;
    transition: transform 0.5s ease-in-out;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(242, 242, 242, 1);
    .c-gray-nav {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 2;
    }
    .temp-four-header {
      padding-left: 43px;
      padding-right: 42px;
      height: 122px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icongengduo1 {
        font-size: 46px;
      }
      .text {
        font-size: 27px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .right {
        .number {
          margin-right: 20px;
        }
        .icongouwudai {
          font-size: 34px;
          position: relative;
          top: 2px;
        }
      }
    }
    .c-lunbo {
      margin-bottom: 46px;
      .lunbo {
        height: 414px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(131, 130, 130);
        .slide {
          text-align: center;
        }
        img {
          width: 680px;
          height: 251px;
          margin: auto;
        }
      }
      .text1 {
        text-align: center;
        font-size: 51px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 46px;
        margin-bottom: 27px;
      }
      .text2 {
        text-align: center;
        font-size: 29px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 46px;
      }
      .point {
        text-align: center;
        span {
          margin-right: 27px;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: rgba(200, 202, 204, 1);
          border-radius: 50%;
        }
        span:last-child {
          margin-right: 0;
        }
        .special {
          width: 18px;
          height: 18px;
          background: rgba(164, 168, 171, 1);
          border-radius: 50%;
        }
      }
    }
    .c-image-with-text {
      padding-left: 36px;
      padding-right: 36px;
      padding-bottom: 78px;
      background-color: rgba(242, 242, 242, 1);
      .text1 {
        font-size: 51px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 57px;
      }
      .text2 {
        font-size: 24px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 48px;
        max-width: 662px;
        letter-spacing: 3px;
        margin-bottom: 100px;
      }
      .more {
        width: 296px;
        height: 70px;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(0, 0, 0, 1);
        text-align: center;
        line-height: 70px;
        font-size: 29px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 69px;
      }
    }
    .c-featured-collection {
      padding-bottom: 110px;
      background-color: rgba(242, 242, 242, 1);
      .title {
        margin: 0;
        text-align: center;
        font-size: 40px;
        margin-bottom: 37px;
        padding-left: 39px;
        padding-right: 39px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        display: flex;
        justify-content: space-between;
        .iconyoujiantou {
          font-size: 50px;
          font-weight: bold;
        }
        .rotate::before {
          transform: rotate(-180deg);
          display: inline-block;
        }
      }
      .all {
        text-align: center;
        margin-bottom: 51px;
      }
      .c-collection-lunbo {
        padding-left: 111px;
        .collection {
        }
      }
    }
    .c-blog {
      padding-left: 46px;
      padding-right: 46px;
      background-color: rgba(242, 242, 242, 1);
      .title {
        font-size: 40px;
        margin-bottom: 80px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }
      .c-posts {
        .post {
          padding-bottom: 110px;
          margin-bottom: 110px;
          .post-title {
            font-size: 40px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-top: 48px;
            margin-bottom: 36px;
          }
          .post-detail {
            font-size: 27px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 49px;
            margin-bottom: 46px;
          }
          .other {
            font-style: italic;
          }
        }
        .post:nth-child(1) {
          border-bottom: 2px solid rgba(198, 199, 200, 1);
        }
        .post:nth-child(2) {
          margin-bottom: 0;
        }
      }
    }
    .mimg {
      margin-bottom: 93px;
    }
    .c-ins {
      padding-top: 93px;
      padding-left: 33px;
      padding-right: 33px;
      padding-bottom: 90px;
      background-color: rgba(242, 242, 242, 1);
      .title {
        font-size: 40px;
        margin-bottom: 38px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }
      .goods {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .good:nth-child(1) {
        margin-bottom: 102px;
      }
      .good:nth-child(2) {
        margin-bottom: 102px;
      }
      .good:nth-child(3) {
        margin-bottom: 40px;
      }
      .good:nth-child(4) {
        margin-bottom: 0px;
      }
    }
    .c-signup {
      padding-bottom: 85px;
      background-color: #fff;
      .title {
        text-align: center;
        padding-top: 50px;
        margin-bottom: 39px;
        font-size: 40px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .c-input {
        text-align: center;
        input {
          width: 390px;
          padding-left: 36px;
          outline: none;
          height: 82px;
          background: rgba(242, 242, 242, 1);
          border: 2px solid rgba(220, 221, 222, 1);
          border-radius: 2px;
        }
        input::-ms-clear,
        input::-ms-reveal {
          display: none;
        }
        input::-webkit-input-placeholder {
          font-size: 29px;
          color: rgba(204, 204, 204, 1);
        }
        input::-moz-placeholder {
          font-size: 29px;
          color: rgba(204, 204, 204, 1);
        }
        input::-ms-input-placeholder {
          font-size: 29px;
          color: rgba(204, 204, 204, 1);
        }
        button {
          background: rgba(0, 162, 225, 1);
          border: 2px solid rgba(0, 152, 222, 1);
          border-radius: 0px 2px 2px 0px;
          text-align: center;
          line-height: 88px;
          height: 88px;
          position: relative;
          top: 8px;
          width: 104px;
          color: #fff;
          .iconyoujiantou {
            font-size: 40px;
          }
        }
      }
    }
    .c-nav {
      background: rgba(28, 34, 63, 1);
      padding-top: 112px;
      text-align: center;
      padding-bottom: 41px;
      .one {
        margin-bottom: 106px;
      }
      .two {
        margin-bottom: 120px;
      }
      .three {
        margin-bottom: 118px;
      }
      a {
        font-size: 32px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .search {
      height: 114px;
      line-height: 114px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      border-bottom: 2px solid rgba(198, 199, 200, 1);
    }
    footer {
      text-align: center;
      line-height: 50px;
      font-size: 27px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      height: 150px;
      padding-top: 80px;
      padding-left: 91px;
      padding-right: 84px;
    }
  }
}
</style>

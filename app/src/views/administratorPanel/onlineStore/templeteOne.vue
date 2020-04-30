<template>
  <div class="t1-container">
    <!-- header -->
    <!-- <TempOneHeader /> -->
    <div class="c-header">
      <header class="temp-one-header">
        <span class="mall">{{$t('lang.templeteOne.text1')}}</span>
        <div class="icons">
          <span
            @click="changeForshowSearchPage"
            class="iconfont icontongxunlusousuokuang_fangdajing"
          ></span>
          <span class="iconfont icongouwudai"></span>
          <span @click="openNav" class="iconfont icongengduo1" v-if="!existNav"></span>
          <span @click="closeNav" class="iconfont iconclose" v-if="existNav"></span>
        </div>
      </header>

      <ul class="c-header-nav" ref="nav">
        <li class="nav">
          <router-link
            :to="$t('lang.templeteOne.navtext1.href')"
          >{{$t('lang.templeteOne.navtext1.title')}}</router-link>
        </li>
        <li class="nav">
          <router-link
            :to="$t('lang.templeteOne.navtext2.href')"
          >{{$t('lang.templeteOne.navtext2.title')}}</router-link>
        </li>
      </ul>
    </div>
    <!-- 点击搜索图标出来的搜素页面 -->
    <SearchPage v-model="searchVal" v-if="forshowSearchPage" />
    <!-- 图片 -->
    <div class="image-box">
      <p class="text1">{{$t('lang.templeteOne.text2')}}</p>
      <p class="text2">{{$t('lang.templeteOne.text3')}}</p>
    </div>
    <!-- 精选 -->
    <div class="feature">
      <p class="title">{{$t('lang.templeteOne.text4')}}</p>
      <div class="content">
        <ul class="goods">
          <li class="good" v-for="(item,index) in $t('lang.templeteOne.text5')" :key="index">
            <PlaceholderFigure
              :width="'9.5rem'"
              :height="'9.5rem'"
              :imgsrc="item.imgsrc"
              :imgWidth="item.imgWidth"
              :imgHeight="item.imgHeight"
            />
          </li>
        </ul>
        <div class="c-big-img">
          <PlaceholderFigure
            :width="'20.4375rem'"
            :height="'20.5625rem'"
            :imgsrc="$t('lang.templeteOne.text6.imgsrc')"
            :imgWidth="$t('lang.templeteOne.text6.imgWidth')"
            :imgHeight="$t('lang.templeteOne.text6.imgHeight')"
          />
          <p class="text1">{{$t('lang.templeteOne.text7')}}</p>
          <p class="text2">{{$t('lang.templeteOne.text8')}}</p>
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="c-lunbo">
      <div class="lunbo">
        <div class="c-img">
          <img
            ref="lunboImg"
            :class="index===0?'inShow':''"
            v-for="(item,index) in lunboimgs"
            :key="index"
            :src="item"
          />
        </div>
        <div class="c-btm">
          <span @click="previous" class="iconfont iconyoujiantou rotate"></span>
          <div class="c-circle">
            <div
              :class="index===pictureIndex?'circleSpecial':''"
              class="circle"
              @click="toThatImg(index)"
              v-for="(item,index) in lunboimgs"
              :key="index"
            ></div>
          </div>
          <span @click="next" class="iconfont iconyoujiantou"></span>
        </div>
      </div>
      <p class="text1">{{$t('lang.templeteOne.text9')}}</p>
      <p class="text2">{{$t('lang.templeteOne.text10')}}</p>
    </div>
    <!-- footer -->
    <footer>
      <div class="top-content">
        <p class="text1">{{$t('lang.templeteOne.text11')}}</p>
        <p @click="changeForshowSearchPage" class="text2">{{$t('lang.templeteOne.text12')}}</p>
        <p class="text3">{{$t('lang.templeteOne.text13')}}</p>
        <p class="text4">{{$t('lang.templeteOne.text14')}}</p>
        <div class="c-input">
          <p class="text5">{{$t('lang.templeteOne.text15')}}</p>
          <input type="text" :placeholder="$t('lang.templeteOne.text16')" />
          <div class="button">{{$t('lang.templeteOne.text17')}}</div>
        </div>
      </div>
      <div class="footer-bottom">{{$t('lang.templeteOne.text18')}}</div>
    </footer>
  </div>
</template>

<script>
import SearchPage from '@/components/administratorPanel/searchPage'
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
// import TempOneHeader from '@/components/administratorPanel/tempOneHeader'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TempleteOne',
  components: {
    // TempOneHeader,
    PlaceholderFigure,
    SearchPage
  },
  computed: { ...mapState(['forshowSearchPage']) },
  methods: {
    ...mapMutations(['changeForshowSearchPage']),
    // 轮播图
    previous () {
      if (this.pictureIndex === 0) {
        this.$refs.lunboImg[0].classList.remove('inShow')
        this.$refs.lunboImg[this.$refs.lunboImg.length - 1].classList.add(
          'inShow'
        )
        this.pictureIndex = this.$refs.lunboImg.length - 1
      } else {
        this.$refs.lunboImg[this.pictureIndex].classList.remove('inShow')
        this.$refs.lunboImg[this.pictureIndex - 1].classList.add('inShow')
        this.pictureIndex -= 1
      }
    },
    next () {
      if (this.pictureIndex === this.$refs.lunboImg.length - 1) {
        this.$refs.lunboImg[this.$refs.lunboImg.length - 1].classList.remove(
          'inShow'
        )
        this.$refs.lunboImg[0].classList.add('inShow')
        this.pictureIndex = 0
      } else {
        this.$refs.lunboImg[this.pictureIndex].classList.remove('inShow')
        this.$refs.lunboImg[this.pictureIndex + 1].classList.add('inShow')
        this.pictureIndex += 1
      }
    },
    toThatImg (index) {
      this.$refs.lunboImg[this.pictureIndex].classList.remove('inShow')
      this.$refs.lunboImg[index].classList.add('inShow')
      this.pictureIndex = index
    },
    // header导航栏
    openNav () {
      this.existNav = true
      this.$nextTick(function () {
        this.$refs.nav.style.height = '6.96875rem'
      })
    },
    closeNav () {
      this.existNav = false
      this.$refs.nav.style.height = '0'
    }
  },
  data () {
    return {
      // data
      lunboimgs: [
        require('../../../assets/administratorPanel/templateImg/27rectangle.png'),
        require('../../../assets/administratorPanel/templateImg/48.png'),
        require('../../../assets/administratorPanel/templateImg/27rectangle.png')
      ],
      // 变量
      searchVal: '', // 搜索框的值
      pictureIndex: 0, // 当前轮播图的下标
      // ui
      existNav: false // 是否header的nav存在
    }
  }
}
</script>

<style lang='less' scoped>
p {
  margin: 0;
}
.t1-container {
  .c-header {
    .temp-one-header {
      padding-left: 49px;
      height: 110px;
      padding-right: 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mall {
        font-size: 29px;
        letter-spacing: 8px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .icons {
        width: 224px;
        display: flex;
        justify-content: space-between;
        .icontongxunlusousuokuang_fangdajing {
          font-size: 42px;
        }
        .icongouwudai {
          font-size: 34px;
          position: relative;
          top: 4px;
        }
        .icongengduo1 {
          font-size: 46px;
        }
        .iconclose {
          font-size: 42px;
        }
      }
    }
    .c-header-nav {
      overflow: hidden;
      height: 0px;
      transition: all 0.35s ease-in-out;
      margin: 0;
      border-top: 1px solid rgb(232, 233, 235);
      .nav {
        height: 110px;
        line-height: 110px;
        border-bottom: 1px solid rgb(232, 233, 235);
        a {
          padding-left: 40px;
          color: #333333;
          font-size: 32px;
          text-decoration: none;
        }
      }
    }
  }
  .image-box {
    height: 750px;
    background-color: rgba(198, 199, 200, 1);
    background-image: url("../../../assets/administratorPanel/templateImg/48.png");
    background-size: 680px 250px;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    .text1 {
      width: 548px;
      font-size: 67px;
      text-align: center;
      font-weight: bold;
      line-height: 83px;
      color: rgba(255, 255, 255, 1);
      margin: auto;
      padding-top: 193px;
    }
    .text2 {
      width: 613px;
      font-size: 32px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 51px;
      margin: auto;
      margin-top: 31px;
      letter-spacing: 2px;
      text-align: center;
      word-spacing: 2px;
    }
    img {
      width: 680px;
      height: 250px;
    }
  }
  .feature {
    .title {
      margin-top: 160px;
      margin-bottom: 83px;
      font-size: 29px;
      text-align: center;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 8px;
    }
    .content {
      padding-left: 48px;
      padding-right: 47px;
      margin: auto;
      .goods {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .good {
          margin-bottom: 40px;
        }
      }
      .c-big-img {
        .text1 {
          margin-top: 75px;
          margin-bottom: 51px;
          font-size: 35px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 5px;
        }
        .text2 {
          font-size: 27px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 47px;
          letter-spacing: 4px;
          margin-bottom: 150px;
        }
      }
    }
  }
  .c-lunbo {
    .inShow {
      opacity: 1 !important;
      z-index: 2 !important;
    }
    .lunbo {
      position: relative;
      margin-bottom: 130px;
      .c-img {
        width: 100%;
        height: 374px;
        background: rgba(245, 245, 245, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 680px;
          height: 250px;
          margin-bottom: 50px;
          opacity: 0;
          position: absolute;
          transition: opacity 1s ease-in-out;
        }
      }
      .c-btm {
        width: 540px;
        height: 108px;
        position: absolute;
        bottom: -68px;
        left: 56px;
        z-index: 3;
        background-color: #fff;
        padding-left: 49px;
        padding-right: 47px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconyoujiantou {
          font-size: 50px;
        }
        .rotate::before {
          transform: rotate(-180deg);
          display: inline-block;
        }
        .c-circle {
          .circle {
            width: 18px;
            height: 18px;
            background: rgba(127, 127, 127, 1);
            border-radius: 50%;
            display: inline-block;
            margin-right: 20px;
          }
          .circleSpecial {
            width: 18px;
            height: 18px;
            background: rgba(3, 3, 3, 1);
            border-radius: 50%;
          }
        }
      }
    }
    .text1 {
      font-size: 56px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin-bottom: 32px;
    }
    .text2 {
      font-size: 29px;
      text-align: center;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      margin: auto;
      margin-bottom: 86px;
      width: 504px;
    }
  }
  footer {
    background: rgba(245, 245, 245, 1);
    .top-content {
      padding-left: 84px;
      padding-right: 84px;
      margin: auto;
      padding-bottom: 115px;
      border-bottom: 2px solid rgba(215, 215, 215, 1);
      .text1 {
        font-size: 29px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding-top: 100px;
        margin-bottom: 75px;
      }
      .text2 {
        font-size: 29px;
        margin-bottom: 167px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 3px;
      }
      .text3 {
        font-size: 29px;
        margin-bottom: 38px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .text4 {
        font-size: 29px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 48px;
        margin-bottom: 126px;
        letter-spacing: 3px;
      }
      .c-input {
        .text5 {
          font-size: 29px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 44px;
        }
        .button {
          margin-top: 11px;
          width: 100%;
          height: 88px;
          text-align: center;
          background: rgba(85, 123, 151, 1);
          border: 2px solid rgba(72, 113, 143, 1);
          border-radius: 4px;
          text-align: center;
          line-height: 88px;
          color: #fff;
          font-size: 29px;
          letter-spacing: 3px;
          font-weight: bold;
        }
        input {
          width: calc(100% - 38px);
          outline: none;
          padding-left: 38px;
          height: 88px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(119, 119, 119, 1);
          border-radius: 4px;
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
      }
    }
    .footer-bottom {
      line-height: 229px;
      text-align: center;
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>

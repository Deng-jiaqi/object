<template>
  <div class="t3-container">
    <!-- header -->
    <div class="c-header">
      <header class="temp-three-header">
        <p class="text1">{{$t('lang.templeteThree.text1')}}</p>
        <div class="bottom">
          <div class="left">
            <span @click="openNav" class="iconfont icongengduo1" v-if="!existNav"></span>
            <span @click="closeNav" class="iconfont iconclose" v-if="existNav"></span>
            <span>{{$t('lang.templeteThree.text2')}}</span>
          </div>
          <div class="right">
            <span class="iconfont icongouwudai"></span>
            <span>{{$t('lang.templeteThree.text3')}}</span>
          </div>
        </div>
      </header>

      <ul class="c-header-nav" ref="nav">
        <li class="nav">
          <router-link
            :to="$t('lang.templeteThree.navtext1.href')"
          >{{$t('lang.templeteThree.navtext1.title')}}</router-link>
        </li>
        <li class="nav">
          <router-link
            :to="$t('lang.templeteThree.navtext2.href')"
          >{{$t('lang.templeteThree.navtext2.title')}}</router-link>
        </li>
        <li class="nav">
          <div class="c-input">
            <span class="iconfont icontongxunlusousuokuang_fangdajing"></span>
            <input class="myinput" type="text" :placeholder="$t('lang.templeteThree.navtext3')" />
          </div>
        </li>
      </ul>
    </div>
    <!-- text -->
    <p class="mall">{{$t('lang.templeteThree.text4')}}</p>
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
      <p class="text">{{$t('lang.templeteThree.text5')}}</p>
    </div>
    <!-- 新闻 -->
    <div class="c-news">
      <h3 class="news-h3">{{$t('lang.templeteThree.text6')}}</h3>
      <ul class="news">
        <li class="new" v-for="(item,index) in $t('lang.templeteThree.text7')" :key="index">
          <h4>{{item.title}}</h4>
          <p>{{item.detail}}</p>
        </li>
      </ul>
    </div>
    <!-- 本周流行 -->
    <div class="c-popular">
      <p class="title">{{ $t('lang.templeteThree.text8')}}</p>
      <ul class="goods">
        <li class="good" v-for="(item,index) in $t('lang.templeteThree.text9')" :key="index">
          <PlaceholderFigure
            :width="'9.625rem'"
            :height="'9.625rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
          />
          <p class="title">{{item.title}}</p>
          <p class="price">{{item.price}}</p>
        </li>
      </ul>
      <div class="c-big-pupolar">
        <PlaceholderFigure
          :width="'21.25rem'"
          :height="'17.4375rem'"
          :imgsrc="$t('lang.templeteThree.text10.imgsrc')"
          :imgWidth="$t('lang.templeteThree.text10.imgWidth')"
          :imgHeight="$t('lang.templeteThree.text10.imgHeight')"
        />
        <div class="c-price">
          <span class="new-price">{{$t('lang.templeteThree.text11.newPrice')}}</span>
          <span class="old-price">{{$t('lang.templeteThree.text11.oldPrice')}}</span>
        </div>
        <div class="button">{{$t('lang.templeteThree.text12')}}</div>
        <div class="to-deyail">{{$t('lang.templeteThree.text13')}}</div>
      </div>
    </div>
    <!-- footer -->
    <footer>
      <div class="link">
        <router-link
          :to="$t('lang.templeteThree.text14.href')"
        >{{$t('lang.templeteThree.text14.title')}}</router-link>
      </div>
      <div class="link">
        <router-link
          :to="$t('lang.templeteThree.text15.href')"
        >{{$t('lang.templeteThree.text15.title')}}</router-link>
      </div>
      <!-- 打开搜素页 -->
      <div class="link">
        <p @click="openSearchPage">{{ $t('lang.templeteThree.text16')}}</p>
      </div>
      <div class="link">
        <router-link
          :to="$t('lang.templeteThree.text17.href')"
        >{{$t('lang.templeteThree.text17.title')}}</router-link>
      </div>
      <div class="link">
        <router-link
          :to="$t('lang.templeteThree.text18.href')"
        >{{$t('lang.templeteThree.text18.title')}}</router-link>
      </div>
      <div class="link">
        <router-link
          :to="$t('lang.templeteThree.text19.href')"
        >{{$t('lang.templeteThree.text19.title')}}</router-link>
      </div>
      <div class="c-input">
        <input type="text" />
        <button>{{$t('lang.templeteThree.text20')}}</button>
      </div>
      <p class="last">{{$t('lang.templeteThree.text21')}}</p>
    </footer>
    <SearchPage v-model="searchVal" v-if="forshowSearchPage" />
  </div>
</template>

<script>
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
import SearchPage from '@/components/administratorPanel/searchPage'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TempleteThree',
  components: {
    PlaceholderFigure,
    SearchPage
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
      searchVal: '',
      pictureIndex: 0, // 当前轮播图的下标
      // ui
      existNav: false
    }
  },
  computed: { ...mapState(['forshowSearchPage']) },
  methods: {
    ...mapMutations(['changeForshowSearchPage']),
    openSearchPage () {
      // 打开搜素界面
      this.changeForshowSearchPage()
    },
    // header的nav
    openNav () {
      this.existNav = true
      this.$nextTick(function () {
        this.$refs.nav.style.height = '10.45313rem'
      })
    },
    closeNav () {
      this.existNav = false
      this.$refs.nav.style.height = '0'
    },
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
    }
  }
}
</script>

<style lang='less' scoped>
p {
  margin: 0;
}
.t3-container {
  .c-header {
    .temp-three-header {
      //   height: 128px;
      background-color: rgba(27, 30, 47, 1);
      .text1 {
        text-align: center;
        padding-top: 28px;
        margin-top: 0;
        margin-bottom: 38px;
        font-size: 29px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        padding-bottom: 29px;
        color: rgba(255, 255, 255, 1);
        font-size: 29px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        padding-left: 35px;
        padding-right: 32px;
        .left {
          width: 131px;
          display: flex;
          justify-content: space-between;
          .icongengduo1 {
            font-size: 40px;
            position: relative;
            top: -8px;
          }
          .iconclose {
            font-size: 40px;
            position: relative;
            top: -8px;
          }
        }
        .right {
          width: 105px;
          display: flex;
          justify-content: space-between;
          .icongouwudai {
            font-size: 33px;
            position: relative;
            top: -2px;
          }
        }
      }
    }
    .c-header-nav {
      height: 0px;
      overflow: hidden;
      transition: all 0.35s ease-in-out;
      margin: 0;
      border-top: 1px solid rgb(63, 65, 80);
      background-color: #1b1e2f;
      .nav {
        padding-left: 40px;
        padding-right: 40px;
        height: 110px;
        line-height: 110px;
        border-bottom: 1px solid rgb(63, 65, 80);
        .c-input {
          position: relative;
          .icontongxunlusousuokuang_fangdajing {
            font-size: 42px;
            position: absolute;
            left: 30px;
            top: 0;
          }
          .myinput {
            height: 70px;
            width: calc(100% - 80px);
            padding-left: 80px;
          }
          input::-ms-clear,
          input::-ms-reveal {
            display: none;
          }
          input::-webkit-input-placeholder {
            font-size: 34px;
            color: rgba(204, 204, 204, 1);
          }
          input::-moz-placeholder {
            font-size: 34px;
            color: rgba(204, 204, 204, 1);
          }
          input::-ms-input-placeholder {
            font-size: 34px;
            color: rgba(204, 204, 204, 1);
          }
        }
        a {
          color: #fff;
          font-size: 32px;
          text-decoration: none;
        }
      }
    }
  }
  .mall {
    margin-top: 96px;
    margin-bottom: 174px;
    font-size: 45px;
    font-weight: bold;
    text-align: center;
    color: rgba(51, 51, 51, 1);
  }
  .c-lunbo {
    padding-left: 34px;
    padding-right: 34px;
    .inShow {
      opacity: 1 !important;
      z-index: 2 !important;
    }
    .lunbo {
      position: relative;
      margin-bottom: 130px;
      .c-img {
        width: 100%;
        height: 390px;
        background: rgba(245, 245, 245, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 650px;
          height: 239px;
          margin-bottom: 50px;
          opacity: 0;
          position: absolute;
          transition: opacity 1s ease-in-out;
        }
      }
      .c-btm {
        width: 300px;
        margin: auto;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .iconyoujiantou {
          font-size: 50px;
          color: rgba(215, 0, 110, 1);
        }
        .rotate::before {
          transform: rotate(-180deg);
          display: inline-block;
        }
        .c-circle {
          margin-top: 10px;
          .circle {
            width: 16px;
            height: 16px;
            background: rgba(215, 129, 110, 1);
            border-radius: 50%;
            display: inline-block;
            margin-right: 20px;
          }
          .circle:nth-child(3) {
            margin-right: 0;
          }
          .circleSpecial {
            width: 22px;
            height: 22px;
            border: 4px solid rgba(215, 129, 110, 1);
            border-radius: 50%;
            background: #fff;
            position: relative;
            top: 4px;
          }
        }
      }
    }
    .text {
      text-align: center;
      font-size: 45px;
      margin-top: 88px;
      margin-bottom: 169px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .c-news {
    padding-left: 34px;
    padding-right: 73px;
    .news-h3 {
      font-size: 45px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-top: 0;
      margin-bottom: 54px;
    }
    .news {
      margin: 0;
      .new {
        margin-bottom: 79px;
        h4 {
          font-size: 37px;
          margin-top: 0;
          margin-bottom: 77px;
          font-weight: 400;
          color: rgba(215, 129, 110, 1);
        }
        p {
          font-size: 29px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 56px;
        }
      }
    }
  }
  .c-popular {
    margin-top: 86px;
    padding-left: 35px;
    padding-right: 35px;
    .title {
      margin-bottom: 46px;
    }
    .goods {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .good {
        margin-bottom: 84px;
        .title {
          font-size: 32px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 43px;
          margin-top: 26px;
          margin-bottom: 28px;
        }
        .price {
          font-size: 27px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .c-big-pupolar {
      margin-top: 88px;
      padding-bottom: 160px;
      .c-price {
        margin-top: 66px;
        margin-bottom: 64px;
        .new-price {
          font-size: 37px;
          margin-right: 25px;
          font-weight: 400;
          color: rgba(215, 129, 110, 1);
        }
        .old-price {
          font-size: 35px;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(51, 51, 51, 1);
        }
      }
      .button {
        height: 88px;
        background: rgba(246, 246, 246, 1);
        border-radius: 4px;
        line-height: 88px;
        text-align: center;
        font-size: 27px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        margin-bottom: 83px;
      }
      .to-deyail {
        font-size: 29px;
        font-weight: 400;
        color: rgba(215, 129, 110, 1);
      }
    }
  }
  footer {
    background: rgba(27, 30, 47, 1);
    padding-top: 20px;
    padding-bottom: 70px;
    .link {
      text-align: center;
      color: #fff;
      font-size: 27px;
      font-weight: bold;
      margin-bottom: 91px;
      a {
        font-size: 27px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    .link:nth-child(6) {
      margin-bottom: 32px;
    }
    .c-input {
      text-align: center;
      input {
        width: 448px;
        height: 65px;
      }
      button {
        width: 236px;
        height: 78px;
        position: relative;
        top: 1px;
        left: 1px;
        background: rgba(215, 126, 106, 1);
        border: 2px solid rgba(241, 141, 115, 1);
        border-radius: 0px 4px 4px 0px;
        font-size: 29px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    .last {
      text-align: center;
      margin-top: 77px;
      font-size: 27px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

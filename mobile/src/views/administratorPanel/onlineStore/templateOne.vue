<template>
  <div class="t1-container">
    <header>
      <div class="t1-logo">
        <span class="t1-text1">{{$t('lang.templeteOne.text1')}}</span>
        <span class="t1-text2">{{$t('lang.templeteOne.text2')}}</span>
      </div>
      <div class="t1-header-nav">
        <router-link to>{{$t('lang.templeteOne.text3.title')}}</router-link>
        <router-link to>{{$t('lang.templeteOne.text4.title')}}</router-link>
      </div>
    </header>

    <div class="t1-c-brand">
      <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt />
      <h2>{{$t('lang.templeteOne.text5')}}</h2>
      <h4>{{$t('lang.templeteOne.text6')}}</h4>
    </div>

    <div class="t1-c-goods">
      <h5>{{$t('lang.templeteOne.text7')}}</h5>
      <ul class="goods">
        <li v-for="(item,index) in $t('lang.templeteOne.text8')" :key="index">
          <PlaceholderFigure
            :width="'14.5rem'"
            :height="'14.5rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :goodName="item.goodName"
            :price="item.price"
          />
        </li>
      </ul>
      <div class="bottom">
        <PlaceholderFigure
          class="c-big-img"
          :width="'23rem'"
          :height="'23rem'"
          :imgWidth="'7.1875rem'"
          :imgHeight="'5.59375rem'"
          :imgsrc="$t('lang.templeteOne.text11')"
        />
        <div class="imgInfo">
          <p class="text1">{{$t('lang.templeteOne.text9')}}</p>
          <p class="text2">{{$t('lang.templeteOne.text10')}}</p>
        </div>
      </div>
    </div>
    <!-- 轮播图占位 -->
    <div class="t1-c-lunbo" v-if="!storyImgs">
      <div class="placeholder">
        <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt />
        <h2>{{$t('lang.templeteOne.text12')}}</h2>
        <h4>{{$t('lang.templeteOne.text13')}}</h4>
      </div>
    </div>
    <!-- 轮播图 -->
    <div v-if='storyImgs'>
      <swiper :options="swiperOptionOne" ref="mySwiper" class="slideshow">
        <swiper-slide v-for="(item,index) in storyImgs" :key="index">
          <img class="one" :src="item" alt />
        </swiper-slide>
      </swiper>
    </div>
    <!--  -->
    <footer>
      <div class="top">
        <div class="list">
          <p>{{$t('lang.templeteOne.text14')}}</p>
          <p>{{$t('lang.templeteOne.text15')}}</p>
        </div>
        <div class="list">
          <p>{{$t('lang.templeteOne.text16')}}</p>
          <p class="special">{{$t('lang.templeteOne.text17')}}</p>
        </div>
        <div class="list">
          <p>{{$t('lang.templeteOne.text18')}}</p>
          <div class="c-button">
            <input type="text" class="emailInput" :placeholder="$t('lang.templeteOne.text19')" />
            <span class="button">{{$t('lang.templeteOne.text20')}}</span>
          </div>
        </div>
      </div>

      <div class="footerbottom">
        <p>{{$t('lang.templeteOne.text21')}}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
export default {
  name: 'TemplateOne',
  components: {
    PlaceholderFigure
  },
  data () {
    return {
      swiperOptionOne: {
        notNextTick: false,
        loop: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          delay: 3000,
          stopOnLastSlide: true
        }
      },
      // data
      storyImgs: [
        require('../../../assets/addShop/imgMa.png'),
        require('../../../assets/loginAndRegister/admin-login-image.png'),
        require('../../../assets/loginAndRegister/forImg.png')
      ]
    }
  },
  methods: {
    handleMessage (event) {
      console.log(event)
      const data = event.data
      switch (data.cmd) {
        case '修改头部': {
          console.log('我要修改头部')
        }
      }
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
}
</script>

<style lang='less' scoped>
.t1-container {
  header {
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    position: relative;
    .t1-logo {
      width: 300px;
      height: 102px;
      position: relative;
      background: rgba(247, 247, 247, 1);
      border: 1px solid rgba(102, 102, 102, 1);
      margin-left: 99px;
      .t1-text1 {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
        position: absolute;
        left: calc(50% - 12px);
        top: calc(50% - 12px);
      }
      .t1-text2 {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
        position: absolute;
        left: 21px;
        bottom: 15px;
      }
    }
    .t1-header-nav {
      width: 100px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: calc(50% - 50px);
      top: calc(50% - 10px);
      a {
        color: rgba(51, 51, 51, 1);
        font-size: 21px;
        text-decoration: none;
      }
    }
  }
  .t1-c-brand {
    height: 642px;
    background-color: rgba(240, 241, 241, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 1565px;
      height: 540px;
    }
    h2 {
      font-size: 88px;
      color: rgba(51, 51, 51, 1);
      font-weight: bold;
      position: absolute;
      top: 222px;
      text-align: center;
      margin: 0;
    }
    h4 {
      width: 1100px;
      position: absolute;
      top: 337px;
      left: calc(50% - 550px);
      font-size: 32px;
      margin: 0;
      text-align: center;
    }
  }
  .t1-c-goods {
    width: 1472px;
    margin: auto;
    h5 {
      color: rgba(51, 51, 51, 1);
      font-size: 27px;
      font-weight: bold;
      text-align: center;
      margin-top: 150px;
      margin-bottom: 78px;
    }
    .goods {
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .bottom {
      display: flex;
      justify-content: flex-start;
      margin-top: 102px;
      margin-bottom: 150px;
      .c-big-img {
        margin-right: 55px;
        img {
          width: 230px;
          height: 179px;
        }
      }
      .imgInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .text1 {
          font-size: 35px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-top: 0;
          margin-bottom: 34px;
        }
        .text2 {
          margin-top: 0;
          margin-bottom: 0;
          font-size: 24px;
          font-weight: 300;
          color: rgba(153, 153, 153, 1);
          width: 679px;
        }
      }
    }
  }
  .t1-c-lunbo {
    height: 884px;
    background-color: rgba(240, 241, 241, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .placeholder {
      img {
        width: 1565px;
        height: 540px;
      }
      h2 {
        font-size: 48px;
        color: rgba(102, 102, 102, 1);
        font-weight: bold;
        position: absolute;
        top: 394px;
        text-align: center;
        margin: 0;
      }
      h4 {
        width: 1100px;
        position: absolute;
        top: 463px;
        left: calc(50% - 550px);
        font-size: 27px;
        margin: 0;
        text-align: center;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .slideshow {
    width: 100%;
    height: 884px;
    .one {
      // background-color: red;
      width: 100%;
      height: 100%;
    }
  }
  footer {
    .top {
      height: 320px;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid rgba(204, 204, 204, 1);
      .list p:nth-child(1) {
        color: rgba(51, 51, 51, 1);
        font-size: 21px;
        font-weight: bold;
        margin-top: 64px;
        margin-bottom: 0;
      }
      .list p:nth-child(2) {
        margin-top: 41px;
        margin-bottom: 0;
        font-size: 21px;
        color: rgba(153, 153, 153, 1);
      }
      .list .special {
        width: 328px;
      }
      .list .emailInput {
        margin-top: 41px;
        border: 2px solid rgba(204, 204, 204, 1);
        border-radius: 4px 0px 0px 4px;
        width: 522px;
        height: 58px;
        outline: none;
        padding-left: 42px;
      }
      input::-ms-clear,
      .list .emailInput::-ms-reveal {
        display: none;
      }
      .list .emailInput::-webkit-input-placeholder {
        font-size: 19px;
        color: rgba(204, 204, 204, 1);
      }
      .list .emailInput::-moz-placeholder {
        font-size: 19px;
        color: rgba(204, 204, 204, 1);
      }
      .list .emailInput::-ms-input-placeholder {
        font-size: 19px;
        color: rgba(204, 204, 204, 1);
      }
      .list .c-button {
        position: relative;
        .button {
          position: absolute;
          display: block;
          background-color: rgba(102, 153, 255, 1);
          color: #fff;
          width: 92px;
          height: 64px;
          right: 0;
          top: 41px;
          text-align: center;
          line-height: 64px;
          font-size: 19px;
        }
        .button:hover {
          cursor: pointer;
        }
      }
    }
    .footerbottom p {
      height: 107px;
      line-height: 107px;
      padding-left: 201px;
      margin: 0;
      font-size: 16px;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>

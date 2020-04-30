<template>
  <div class="t3-container">
    <header>
      <div class="content">
        <span class="left">{{$t('lang.templeteThree.text1')}}</span>
        <div class="right clearfix">
          <span>{{$t('lang.templeteThree.text2')}}</span>
          <div class="c-input">
            <input type="text" :placeholder="$t('lang.templeteThree.text3')" />
          </div>
        </div>
      </div>
    </header>
    <!-- 容器 -->
    <div class="btm-container">
      <div class="one">
        <span class="left">{{$t('lang.templeteThree.text4')}}</span>
        <div class="right">
          <span>{{$t('lang.templeteThree.text5')}}</span>
          <span>{{$t('lang.templeteThree.text6')}}</span>
        </div>
      </div>
      <!-- 轮播 -->
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
      </div>
      <!-- 新闻 -->
      <div class="c-news">
        <p class="title">{{$t('lang.templeteThree.text8')}}</p>
        <ul class="news">
          <li class="new" v-for="(item,index) in $t('lang.templeteThree.text9')" :key="index">
            <h4>{{item.title}}</h4>
            <p>{{item.detail}}</p>
          </li>
        </ul>
      </div>

      <!-- 本周流行 -->
      <div class="c-thisweek">
        <p class="title">{{$t('lang.templeteThree.text10')}}</p>
        <ul class="goods">
          <li v-for="(item,index) in $t('lang.templeteThree.text11')" :key="index">
            <PlaceholderFigure
              :width="'9.25rem'"
              :height="'9.25rem'"
              :imgsrc="item.imgsrc"
              :imgWidth="item.imgWidth"
              :imgHeight="item.imgHeight"
              :goodName="item.goodName"
              :price="item.price"
            />
          </li>
        </ul>
      </div>
      <!-- 示例产品标题 -->
      <div class="example clearfix">
        <PlaceholderFigure
          class="left"
          :width="'19.8125rem'"
          :height="'19.8125rem'"
          :imgsrc="$t('lang.templeteThree.text12.imgsrc')"
          :imgWidth="$t('lang.templeteThree.text12.imgWidth')"
          :imgHeight="$t('lang.templeteThree.text12.imgHeight')"
        />
        <div class="right">
          <p class="title">{{$t('lang.templeteThree.text12.title')}}</p>
          <div class="price clearfix">
            <span class="new">{{$t('lang.templeteThree.text12.oldPrice')}}</span>
            <s class="old">{{$t('lang.templeteThree.text12.newPrice')}}</s>
          </div>
          <div class="toshoppingcart">{{$t('lang.templeteThree.text12.text1')}}</div>
          <span class="detail">{{$t('lang.templeteThree.text12.text2')}}</span>
        </div>
      </div>
      <!--  -->
    </div>

    <!-- footer -->
    <footer>
      <ul class="list">
        <li>
          <h5 class="title">{{$t('lang.templeteThree.text13')}}</h5>
        </li>
        <li>
          <h5 class="title">{{$t('lang.templeteThree.text14')}}</h5>
          <p class="font">{{$t('lang.templeteThree.text15')}}</p>
        </li>
        <li>
          <h5 class="title">{{$t('lang.templeteThree.text16')}}</h5>
        </li>
        <li>
          <h5 class="title">{{$t('lang.templeteThree.text17')}}</h5>
          <p class="font">{{$t('lang.templeteThree.text18')}}</p>
          <input type="text" :placeholder="$t('lang.templeteThree.text19')" />
          <div class="subscribe">{{$t('lang.templeteThree.text20')}}</div>
        </li>
      </ul>
      <div class="last">{{$t('lang.templeteThree.text21')}}</div>
    </footer>
  </div>
</template>

<script>
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
export default {
  name: 'TemplateThree',
  components: {
    PlaceholderFigure
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
      pictureIndex: 0 // 当前轮播图的下标
    }
  },
  methods: {
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

<style scoped lang='less'>
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.t3-container {
  header {
    background-color: rgba(0, 0, 0, 1);
    .content {
      width: 1310px;
      margin: auto;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-size: 19px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .right {
        display: flex;
        align-items: center;
        span {
          font-size: 19px;
          font-weight: bold;
          color: rgba(254, 254, 254, 1);
          position: relative;
        }
        .c-input {
          float: right;
          margin-left: 18px;
          input {
            width: 175px;
            height: 40px;
            padding-left: 45px;
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
        }
      }
    }
  }
  .btm-container {
    width: 1310px;
    margin: auto;
    .one {
      margin-top: 58px;
      margin-bottom: 117px;
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 32px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .right {
        width: 114px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 19px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
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
          height: 489px;
          background: rgba(245, 245, 245, 1);
          img {
            width: 100%;
            height: 489px;
            opacity: 0;
            position: absolute;
            transition: opacity 1s ease-in-out;
          }
        }
        .c-btm {
          width: 300px;
          margin: auto;
          margin-top: 32px;
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
    }
    .c-news {
      margin-top: 56px;
      margin-bottom: 120px;
      .title {
        font-size: 35px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 0;
        margin-bottom: 31px;
      }
      .news {
        display: flex;
        justify-content: space-between;
        margin: 0;
        .new {
          width: 635px;
          line-height: 37px;
          h4 {
            font-size: 29px;
            font-weight: 400;
            color: rgba(255, 153, 153, 1);
            margin: 0;
            margin-bottom: 46px;
          }
          p {
            font-size: 21px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
    .c-thisweek {
      margin-bottom: 148px;
      .goods {
        margin: 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .title {
        font-size: 35px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .example {
      width: 992px;
      .left {
        float: left;
      }
      .right {
        float: right;
        .title {
          margin: 0;
          margin-bottom: 44px;
          font-size: 40px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .price {
          margin-bottom: 42px;
          width: 179px;
          .old {
            font-size: 24px;
            font-weight: 400;
            color: rgba(255, 153, 153, 1);
            float: left;
          }
          .new {
            font-size: 24px;
            font-weight: 400;
            text-decoration: line-through;
            float: right;
            color: rgba(51, 51, 51, 1);
          }
        }
        .toshoppingcart {
          width: 316px;
          height: 56px;
          background: rgba(240, 240, 240, 1);
          border-radius: 6px;
          margin-bottom: 50px;
          font-size: 19px;
          line-height: 56px;
          color: rgba(204, 204, 204, 1);
          text-align: center;
        }
        .detail {
          font-size: 21px;
          font-weight: 400;
          color: rgba(255, 153, 153, 1);
        }
      }
    }
  }
  footer {
    height: 380px;
    background: rgba(51, 51, 51, 1);
    margin-top: 100px;
    .list {
      padding-top: 44px;
      margin: 0;
      width: 1310px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 19px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin: 0;
        margin-bottom: 19px;
      }
      .font {
        font-size: 19px;
        margin: 0;
        margin-bottom: 19px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      input {
        padding-left: 15px;
        width: 283px;
        height: 50px;
        margin-bottom: 17px;
      }
      input::-ms-reveal {
        display: none;
      }
      input::-webkit-input-placeholder {
        font-size: 19px;
        color: rgba(153, 153, 153, 1);
      }
      input::-moz-placeholder {
        font-size: 19px;
        color: rgba(153, 153, 153, 1);
      }
      input::-ms-input-placeholder {
        font-size: 19px;
        color: rgba(153, 153, 153, 1);
      }
      .subscribe {
        width: 86px;
        height: 60px;
        background-color: rgba(215, 126, 106, 1);
        text-align: center;
        font-size: 19px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 60px;
      }
    }
    .last {
      text-align: center;
      font-size: 19px;
      margin-top: 47px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

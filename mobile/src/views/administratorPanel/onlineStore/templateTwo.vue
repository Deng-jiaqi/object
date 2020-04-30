<template>
  <div class="t2-container">
    <!-- header -->
    <div class="head">
      <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt />
      <h2>{{$t('lang.templeteTwo.text1')}}</h2>
    </div>
    <p class="announcement">{{$t('lang.templeteTwo.text2')}}</p>
    <!-- 图片 -->
    <PlaceholderFigure
      class="c-showImg"
      :width="'100%'"
      :height="'26.5625rem'"
      :imgWidth="'53.125rem'"
      :imgHeight="'19.5625rem'"
      :imgsrc="$t('lang.templeteTwo.text4')"
    />
    <!-- 列表 -->
    <div class="c-list">
      <h3 class="title">{{$t('lang.templeteTwo.text3')}}</h3>
      <ul class="lists">
        <li v-for="(item,index) in $t('lang.templeteTwo.text5')" :key="index">
          <p class="list-title">{{item.title}}</p>
          <div class="list" v-for="(xitem,xindex) in item.list" :key="xindex">
            <div class="list-top">
              <span class="font">{{xitem.one}}</span>
              <span class="font">{{xitem.two}}</span>
            </div>
            <div class="list-bottom font">{{xitem.three}}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 欢迎 -->
    <div class="welcome clearfix">
      <div class="left">
        <p>{{$t('lang.templeteTwo.text6')}}</p>
        <p>{{$t('lang.templeteTwo.text7')}}</p>
      </div>
      <PlaceholderFigure
        class="right"
        :width="'42.1875rem'"
        :height="'28.4375rem'"
        :imgWidth="'37.5rem'"
        :imgHeight="'13.78125rem'"
        :imgsrc="$t('lang.templeteTwo.text4')"
      />
    </div>
    <!-- 收集清单 -->
    <div class="listing">
      <p class="title">{{$t('lang.templeteTwo.text8')}}</p>
      <ul class="listing-lists">
        <li v-for="(item,index) in $t('lang.templeteTwo.text9')" :key="index">
          <PlaceholderFigure
            :width="'15.1875rem'"
            :height="'15.1875rem'"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :imgsrc="item.imgsrc"
          />
        </li>
      </ul>
    </div>
    <!-- 特色网格 -->
    <div class="grid">
      <p class="title">{{$t('lang.templeteTwo.text10')}}</p>
      <ul class="grid-lists">
        <li v-for="(item,index) in $t('lang.templeteTwo.text11')" :key="index">
          <PlaceholderFigure
            :width="'11.0625rem'"
            :height="'11.0625rem'"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :imgsrc="item.imgsrc"
          />
        </li>
      </ul>
    </div>
    <!-- 集合名称 -->
    <div class="collection">
      <p class="title">{{$t('lang.templeteTwo.text12')}}</p>
      <ul class="collection-lists">
        <li v-for="(item,index) in $t('lang.templeteTwo.text13')" :key="index">
          <PlaceholderFigure
            :width="'9.0625rem'"
            :height="'9.0625rem'"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :imgsrc="item.imgsrc"
          />
          <div class="info">
            <span>{{item.title}}</span>
            <span>
              <s>{{item.oldPrice}}</s>
              {{item.newPrice}}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 谈谈你的品牌 -->
    <div class="yourbrand">
      <p class="title">{{$t('lang.templeteTwo.text14')}}</p>
      <p class="text">{{$t('lang.templeteTwo.text15')}}</p>
    </div>
    <!-- 视频 -->
    <div class="video">
      <p class="title">{{$t('lang.templeteTwo.text16.title')}}</p>
      <PlaceholderFigure
        class="box"
        :width="'23.625rem'"
        :height="'13.3125rem'"
        :imgWidth="'5.96875rem'"
        :imgHeight="'3.28125rem'"
        :imgsrc="$t('lang.templeteTwo.text16.imgsrc')"
      />
    </div>
    <!-- 图像与文本 -->
    <div class="Imagestext">
      <div class="mybox">
        <p class="title">{{$t('lang.templeteTwo.text17')}}</p>
        <p class="text">{{$t('lang.templeteTwo.text18')}}</p>
      </div>
      <PlaceholderFigure
        class="box"
        :width="'30.3125rem'"
        :height="'20.9375rem'"
        :imgWidth="'28.125rem'"
        :imgHeight="'10.34375rem'"
        :imgsrc="$t('lang.templeteTwo.text35')"
      />
    </div>
    <!-- instagram -->
    <div class="instagram">
      <p class="title">{{$t('lang.templeteTwo.text19')}}</p>
      <ul class="goods">
        <li v-for="(item,index) in $t('lang.templeteTwo.text20')" :key="index">
          <PlaceholderFigure
            :width="'8.875rem'"
            :height="'8.875rem'"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :imgsrc="item.imgsrc"
          />
        </li>
      </ul>
      <div class="toinstagram">
        <router-link
          :to="$t('lang.templeteTwo.text21.href')"
        >{{$t('lang.templeteTwo.text21.title')}}</router-link>
        <div class="line"></div>
      </div>
    </div>
    <!-- 订阅 -->
    <div class="subscribe">
      <p class="text1">{{$t('lang.templeteTwo.text22')}}</p>
      <p class="text2">{{$t('lang.templeteTwo.text23')}}</p>
      <div class="c-btm">
        <input type="text" :placeholder="$t('lang.templeteTwo.text24')" />
        &nbsp; &nbsp;
        <button>{{$t('lang.templeteTwo.text25')}}</button>
      </div>
    </div>
    <!-- 线 -->
    <div class="bigline"></div>
    <!-- 地图 -->
    <div class="map">
      <div class="c-left">
        <p class="title">{{$t('lang.templeteTwo.text26')}}</p>
        <div class="left-btm">
          <div class="font one">{{$t('lang.templeteTwo.text27')}}</div>
          <div class="font two">{{$t('lang.templeteTwo.text30')}}</div>
          <div class="font three">{{$t('lang.templeteTwo.text29')}}</div>
          <div class="font four">{{$t('lang.templeteTwo.text31')}}</div>
        </div>
        <div class="openinmap">
          {{$t('lang.templeteTwo.text28')}}
          <div class="line"></div>
        </div>
      </div>
      <div class="c-right">
        <PlaceholderFigure
          :width="'33.125rem'"
          :height="'22.1875rem'"
          :imgWidth="'28.125rem'"
          :imgHeight="'10.34375rem'"
          :imgsrc="$t('lang.templeteTwo.text36')"
        />
      </div>
    </div>
    <!-- footer -->
    <footer>
      <div class="c">
        <div class="font">{{$t('lang.templeteTwo.text32')}}</div>
        <div class="mid font">
          {{$t('lang.templeteTwo.text33')}}
          <div class="line"></div>
        </div>
        <div class="font">{{$t('lang.templeteTwo.text34')}}</div>
      </div>
    </footer>
  </div>
</template>

<script>
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
export default {
  name: 'TemplateTwo',
  components: {
    PlaceholderFigure
  }
}
</script>

<style lang='less' scoped>
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.t2-container {
  .head {
    height: 610px;
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
      color: rgba(102, 102, 102, 1);
      font-weight: bold;
      position: absolute;
      top: 256px;
      text-align: center;
      margin: 0;
    }
  }
  .announcement {
    background: rgba(51, 51, 51, 1);
    text-align: center;
    color: #fff;
    font-size: 21px;
    margin: 0;
    height: 66px;
    line-height: 66px;
  }
  .c-showImg {
    margin-top: 210px;
    img {
      width: 1700px;
      height: 626px;
    }
  }
  .c-list {
    .title {
      text-align: center;
      margin-top: 110px;
      font-size: 37px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 64px;
      font-weight: 300;
    }
    .lists {
      margin: 0;
      margin-left: 380px;
      width: 526px;
      .list-title {
        margin: 0;
        text-align: center;
        margin-bottom: 45px;
        font-size: 24px;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
      }
      .list-top {
        border-bottom: 2px solid rgba(102, 102, 102, 1);
        display: flex;
        justify-content: space-between;
        padding-bottom: 13px;
        margin-bottom: 16px;
      }
      .list {
        margin-bottom: 63px;
        .font {
          font-size: 21px;
          font-weight: 300;
        }
      }
    }
    .lists .list:nth-child(3) {
      margin-bottom: 49px;
    }
  }
  .welcome {
    .left {
      width: 570px;
      height: 910px;
      float: left;
      background: rgba(221, 224, 224, 1);
    }
    .left p:nth-child(1) {
      padding-left: 80px;
      margin-top: 379px;
      margin-bottom: 34px;
      font-size: 37px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
    .left p:nth-child(2) {
      padding-left: 80px;
      margin: 0;
      width: 419px;
      font-size: 21px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }
    .right {
      float: left;
    }
  }
  .listing {
    .title {
      font-size: 37px;
      text-align: center;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      margin-top: 100px;
      margin-bottom: 49px;
    }
    .listing-lists {
      width: 83%;
      margin: 0;
      margin: auto;
      display: flex;
      justify-content: space-around;
    }
  }
  .grid {
    width: 100%;
    height: 670px;
    background-color: rgba(247, 247, 247, 1);
    .title {
      font-size: 37px;
      text-align: center;
      padding-top: 115px;
      margin-bottom: 48px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .grid-lists {
      width: 82%;
      margin: 0;
      margin: auto;
      display: flex;
      justify-content: space-around;
    }
  }
  .collection {
    .title {
      font-size: 37px;
      text-align: center;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 35px;
      margin-top: 100px;
      margin-bottom: 69px;
    }
    .collection-lists {
      display: flex;
      justify-content: space-around;
      margin: 0;
      width: 77%;
      margin: auto;
      .info {
        display: flex;
        justify-content: space-between;
        margin-top: 17px;
      }
      .info span {
        font-size: 21px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .yourbrand {
    width: 100%;
    height: 290px;
    background: rgba(247, 247, 247, 1);
    margin-top: 140px;
    .title {
      font-size: 37px;
      text-align: center;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-top: 100px;
      margin-bottom: 32px;
    }
    .text {
      margin: 0;
      text-align: center;
      font-size: 21px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .video {
    width: 100%;
    height: 710px;
    .title {
      font-size: 37px;
      text-align: center;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 100px;
      margin-bottom: 48px;
    }
    .box {
      margin: auto;
    }
  }
  .Imagestext {
    width: 100%;
    height: 860px;
    background-color: rgba(247, 247, 247, 1);
    position: relative;
    .box {
      padding-top: 95px;
      margin-left: 800px;
    }
    .mybox {
      background: rgba(255, 255, 255, 1);
      position: absolute;
      height: 216px;
      left: 140px;
      top: 322px;
      padding-left: 53px;
      padding-right: 53px;

      .title {
        padding-top: 48px;
        font-size: 37px;
        margin: 0;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
      }
      .text {
        width: 659px;
        font-size: 21px;
        margin-top: 34px;
        margin-bottom: 0;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
      }
    }
  }
  .instagram {
    .title {
      font-size: 37px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin-top: 103px;
      margin-bottom: 43px;
    }
    .goods {
      width: 88%;
      margin: 0;
      margin: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .goods li {
      margin-bottom: 40px;
    }
    .toinstagram {
      text-align: center;
      position: relative;
      margin-top: 28px;
      .line {
        margin-top: 12px;
        width: 270px;
        height: 2px;
        background: rgba(51, 51, 51, 1);
        position: absolute;
        left: calc(50% - 135px);
      }
    }
  }
  .subscribe {
    height: 374px;
    background-color: rgba(240, 240, 240, 1);
    margin-top: 96px;
    .text1 {
      font-size: 35px;
      text-align: center;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      padding-top: 98px;
      margin-bottom: 36px;
      margin-top: 0;
    }
    .text2 {
      font-size: 19px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin-top: 0;
      margin-bottom: 27px;
    }
    .c-btm {
      display: flex;
      justify-content: center;
    }
    .c-btm input {
      padding-left: 22px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(212, 215, 216, 1);
      border-radius: 6px;
      outline: none;
      width: 346px;
      height: 56px;
    }
    input::-ms-clear,
    .list .emailInput::-ms-reveal {
      display: none;
    }
    .c-btm input::-webkit-input-placeholder {
      font-size: 19px;
      color: rgba(204, 204, 204, 1);
    }
    .c-btm input::-moz-placeholder {
      font-size: 19px;
      color: rgba(204, 204, 204, 1);
    }
    .c-btm input::-ms-input-placeholder {
      font-size: 19px;
      color: rgba(204, 204, 204, 1);
    }
    .c-btm button {
      width: 78px;
      height: 62px;
      background: rgba(51, 51, 51, 1);
      border-radius: 4px;
      color: #fff;
    }
  }
  .bigline {
    height: 46px;
    background-color: rgba(240, 240, 240, 1);
    margin-top: 10px;
  }
  .map {
    height: 890px;
    position: relative;
    border-bottom: 2px solid rgba(51, 51, 51, 1);
    .c-left {
      margin-top: 289px;
      margin-left: 140px;
      .title {
        font-size: 37px;

        font-weight: 300;
        color: rgba(51, 51, 51, 1);
      }
      .left-btm {
        width: 476px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 45px;
        .one {
          width: 158px;
          margin-bottom: 48px;
        }
        .two {
          width: 183px;
          margin-bottom: 48px;
        }
        .three {
          width: 158px;
        }
        .four {
          width: 183px;
        }
        .font {
          font-size: 19px;
          font-weight: 300;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
        }
      }
      .openinmap {
        padding-bottom: 16px;
        position: relative;
        font-size: 19px;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        .line {
          width: 126px;
          height: 2px;
          background: rgba(51, 51, 51, 1);
          position: absolute;
          top: 35px;
          left: 0;
        }
      }
    }
    .c-right {
      position: absolute;
      top: 88px;
      right: 138px;
    }
  }
  footer {
    .c {
      height: 119px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 93%;
      margin: auto;
      .mid {
        position: relative;
        .line {
          width: 150px;
          height: 2px;
          background: rgba(51, 51, 51, 1);
          position: absolute;
          top: 25px;
          left: 0;
        }
      }
      .font {
        font-size: 16px;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
}
</style>

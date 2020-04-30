<template>
  <div class="t2-container">
    <!-- 图片 -->
    <div class="c-pic-one">
      <p class="text">{{$t('lang.templeteTwo.text1')}}</p>
    </div>
    <!-- 公告 -->
    <p class="announcement">{{$t('lang.templeteTwo.text2')}}</p>
    <!-- 图片 -->
    <div class="c-pic-two">
      <PlaceholderFigure
        :width="'100%'"
        :height="'12.125rem'"
        :imgsrc="$t('lang.templeteTwo.text3.imgsrc')"
        :imgWidth="$t('lang.templeteTwo.text3.imgWidth')"
        :imgHeight="$t('lang.templeteTwo.text3.imgHeight')"
      />
    </div>
    <!-- 列表 -->
    <div class="c-list">
      <h3 class="title">{{$t('lang.templeteTwo.text4')}}</h3>
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
    <!-- 带文字的图片 -->
    <div class="c-pic-three">
      <PlaceholderFigure
        class="box"
        :width="'21.25rem'"
        :height="'14.5625rem'"
        :imgsrc="$t('lang.templeteTwo.text6.imgsrc')"
        :imgWidth="$t('lang.templeteTwo.text6.imgWidth')"
        :imgHeight="$t('lang.templeteTwo.text6.imgHeight')"
        :backgroundColor="'#fff'"
      />
      <p class="text1">{{$t('lang.templeteTwo.text6.text1')}}</p>
      <p class="text2">{{$t('lang.templeteTwo.text6.text2')}}</p>
    </div>
    <!-- 收藏列表 -->
    <div class="c-collection-list">
      <h3 class="title">{{$t('lang.templeteTwo.text7')}}</h3>
      <ul class="lists">
        <li class="list" v-for="(item,index) in $t('lang.templeteTwo.text8')" :key="index">
          <PlaceholderFigure
            :width="'10rem'"
            :height="'10rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
          />
          <p class="text">{{item.title}}</p>
        </li>
      </ul>
    </div>
    <!-- 网格 -->
    <div class="c-featured-grid">
      <h3 class="title">{{$t('lang.templeteTwo.text9')}}</h3>
      <ul class="lists">
        <li class="list" v-for="(item,index) in $t('lang.templeteTwo.text10')" :key="index">
          <PlaceholderFigure
            :width="'10rem'"
            :height="'10rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
            :backgroundColor="'#fff'"
          />
          <p class="text">{{item.title}}</p>
          <router-link :to="item.to.href">{{item.to.title}}</router-link>
        </li>
      </ul>
    </div>
    <!-- 收藏-大 -->
    <div class="c-big-collection">
      <h3 class="title">{{$t('lang.templeteTwo.text11')}}</h3>
      <ul class="lists">
        <li class="list" v-for="(item,index) in $t('lang.templeteTwo.text12')" :key="index">
          <PlaceholderFigure
            :width="'19.5rem'"
            :height="'19.5rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
          />
          <p class="text">{{item.title}}</p>
          <s class="old-price">{{item.oldPrice}}</s>
          <span class="new-price">{{item.newPrice}}</span>
        </li>
      </ul>
    </div>
    <!-- 品牌描述 -->
    <div class="talk-brand">
      <h4>{{$t('lang.templeteTwo.text13')}}</h4>
      <p>{{$t('lang.templeteTwo.text14')}}</p>
    </div>
    <!-- video -->
    <div class="video">
      <PlaceholderFigure
        :width="'21.1875rem'"
        :height="'21.5625rem'"
        :imgsrc="$t('lang.templeteTwo.text15.imgsrc')"
        :imgWidth="$t('lang.templeteTwo.text15.imgWidth')"
        :imgHeight="$t('lang.templeteTwo.text15.imgHeight')"
      />
    </div>
    <!-- 带文字的图片 -->
    <div class="c-pic-four">
      <PlaceholderFigure
        class="box"
        :width="'21.25rem'"
        :height="'14.5625rem'"
        :imgsrc="$t('lang.templeteTwo.text6.imgsrc')"
        :imgWidth="$t('lang.templeteTwo.text6.imgWidth')"
        :imgHeight="$t('lang.templeteTwo.text6.imgHeight')"
      />
      <p class="text1">{{$t('lang.templeteTwo.text6.text1')}}</p>
      <p class="text2">{{$t('lang.templeteTwo.text6.text2')}}</p>
    </div>
    <!-- ins -->
    <div class="c-ins">
      <h3 class="title">{{$t('lang.templeteTwo.text16')}}</h3>
      <ul class="lists">
        <li class="list" v-for="(item,index) in $t('lang.templeteTwo.text17')" :key="index">
          <PlaceholderFigure
            :width="'10.25rem'"
            :height="'10.25rem'"
            :imgsrc="item.imgsrc"
            :imgWidth="item.imgWidth"
            :imgHeight="item.imgHeight"
          />
        </li>
      </ul>
      <p class="last">{{$t('lang.templeteTwo.text18')}}</p>
      <div class="line"></div>
    </div>
    <!-- 订阅通讯 -->
    <div class="c-subscribe-newsletter">
      <p class="title">{{$t('lang.templeteTwo.text19')}}</p>
      <p class="text">{{$t('lang.templeteTwo.text20')}}</p>
      <div class="c-submit">
        <input type="text" :placeholder="$t('lang.templeteTwo.text21')" />
        <div>{{$t('lang.templeteTwo.text22')}}</div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="c-map">
      <div class="c-top">
        <p class="title">{{$t('lang.templeteTwo.text23')}}</p>
        <div class="top-btm">
          <div class="font one">{{$t('lang.templeteTwo.text24')}}</div>
          <div class="font two">{{$t('lang.templeteTwo.text26')}}</div>
          <div class="font three">{{$t('lang.templeteTwo.text25')}}</div>
          <div class="font four">{{$t('lang.templeteTwo.text27')}}</div>
        </div>
        <div class="openinmap">{{$t('lang.templeteTwo.text28')}}</div>
      </div>
      <PlaceholderFigure
        class="c-bottom"
        :width="'21.125rem'"
        :height="'14rem'"
        :imgWidth="$t('lang.templeteTwo.text29.imgWidth')"
        :imgHeight="$t('lang.templeteTwo.text29.imgHeight')"
        :imgsrc="$t('lang.templeteTwo.text29.imgsrc')"
      />
    </div>
    <!-- footer -->
    <footer>
      <p class="text1" @click='openSearchPage'>{{$t('lang.templeteTwo.text30')}}</p>
      <p class="text2">{{$t('lang.templeteTwo.text31')}}</p>
    </footer>
    <!--搜索页面 -->
    <SearchPage v-model="searchVal" v-if="forshowSearchPage"/>
  </div>
</template>

<script>
import SearchPage from '@/components/administratorPanel/searchPage'
import PlaceholderFigure from '@/components/administratorPanel/placeholderFigure'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TempleteTwo',
  components: {
    PlaceholderFigure,
    SearchPage
  },
  data () {
    return {
      // 变量
      searchVal: ''
    }
  },
  computed: { ...mapState(['forshowSearchPage']) },
  methods: {
    ...mapMutations(['changeForshowSearchPage']),
    openSearchPage () {
      this.changeForshowSearchPage()
    }
  }
}
</script>

<style lang='less' scoped>
p {
  margin: 0;
}
.t2-container {
  .c-pic-one {
    height: 322px;
    background-image: url("../../../assets/administratorPanel/templateImg/27rectangle.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: rgba(233, 233, 233, 1);
    display: flex;
    align-items: center;
    .text {
      font-size: 72px;
      text-align: center;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 104px;
      letter-spacing: 10px;
    }
  }
  .announcement {
    text-align: center;
    height: 93px;
    line-height: 93px;
    font-size: 24px;
    font-weight: bolder;
    letter-spacing: 3px;
    color: rgba(51, 51, 51, 1);
    background:rgba(247,247,247,1);
  }
  .c-pic-two {
    padding-top: 200px;
    padding-bottom: 200px;
  }
  .c-list {
    .title {
      text-align: center;
      font-size: 35px;
      margin-bottom: 104px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .lists {
      margin: 0;
      width: 608px;
      margin: auto;
      .list-title {
        text-align: center;
        font-size: 27px;
        margin-bottom: 63px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .list-top {
        border-bottom: 2px solid rgba(51, 51, 51, 1);
        display: flex;
        justify-content: space-between;
        padding-bottom: 29px;
        margin-bottom: 30px;
      }
      .list {
        margin-bottom: 39px;
        .font {
          font-size: 27px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .lists .list:nth-child(3) {
      margin-bottom: 80px;
    }
  }
  .c-pic-three {
    padding-top: 70px;
    padding-bottom: 134px;
    background-color: rgba(252, 248, 239, 1);
    .box {
      margin: auto;
    }
    .text1 {
      margin-top: 91px;
      margin-bottom: 32px;
      font-size: 35px;
      letter-spacing: 3px;
      text-align: center;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .text2 {
      font-size: 27px;
      text-align: center;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      width: 494px;
      margin: auto;
      letter-spacing: 3px;
    }
  }
  .c-collection-list {
    .title {
      font-size: 35px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      padding-top: 72px;
      padding-bottom: 57px;
      text-align: center;
    }
    .lists {
      padding-left: 37px;
      padding-right: 36px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 33px;
      .list {
        margin-bottom: 39px;
      }
      .text {
        font-size: 29px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin-top: 30px;
        letter-spacing: 3px;
      }
    }
  }
  .c-featured-grid {
    background-color: rgba(247, 247, 247, 1);
    padding-bottom: 68px;
    .title {
      font-size: 35px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      padding-top: 72px;
      padding-bottom: 57px;
      text-align: center;
    }
    .lists {
      display: flex;
      justify-content: space-between;
      padding-left: 37px;
      padding-right: 36px;
      flex-wrap: wrap;
      margin-bottom: 41px;
      .list {
        margin-bottom: 41px;
        text-align: center;
        .text {
          font-size: 29px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          margin-bottom: 40px;
          margin-top: 40px;
          letter-spacing: 3px;
        }
        a {
          font-size: 24px;
          font-weight: 400;
          text-decoration: underline;
          word-spacing: 3px;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .c-big-collection {
    padding-left: 63px;
    padding-right: 63px;
    padding-bottom: 91px;
    .title {
      padding-top: 72px;
      padding-bottom: 144px;
      margin: 0;
      text-align: center;
    }
    .lists {
      .list {
        margin-bottom: 29px;
        .text {
          font-size: 29px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-top: 22px;
          margin-bottom: 33px;
        }
        .old-price {
          font-size: 27px;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(51, 51, 51, 1);
          margin-right: 18px;
        }
        .new-price {
          font-size: 27px;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .talk-brand {
    padding-bottom: 70px;
    padding-top: 70px;
    background-color: rgba(247, 247, 247, 1);
    h4 {
      margin: 0;
      font-size: 35px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      padding-bottom: 42px;
      text-align: center;
    }
    p {
      padding-left: 52px;
      padding-right: 52px;
      letter-spacing: 3px;
      font-size: 27px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      text-align: center;
    }
  }
  .video {
    padding-top: 30px;
    padding-bottom: 60px;
    padding-left: 63px;
    padding-left: 36px;
  }
  .c-pic-four {
    padding-top: 70px;
    padding-bottom: 134px;
    background: rgba(247, 247, 247, 1);
    .box {
      margin: auto;
    }
    .text1 {
      margin-top: 91px;
      margin-bottom: 32px;
      font-size: 35px;
      letter-spacing: 3px;
      text-align: center;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .text2 {
      font-size: 27px;
      text-align: center;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      width: 494px;
      margin: auto;
      letter-spacing: 3px;
    }
  }
  .c-ins {
    padding-bottom: 80px;
    text-align: center;
    .title {
      font-size: 35px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      padding-top: 72px;
      padding-bottom: 31px;
      text-align: center;
    }
    .lists {
      padding-left: 37px;
      padding-right: 36px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .list {
        margin-bottom: 20px;
      }
    }
    .last {
      display: inline-block;
      margin-top: 34px;
      text-align: center;
      border-bottom: 2px solid rgba(198, 199, 200, 1);
    }
  }
  .c-subscribe-newsletter {
    background-color: rgba(247, 247, 247, 1);
    padding-top: 70px;
    padding-bottom: 70px;
    padding-left: 36px;
    padding-right: 35px;
    .title {
      text-align: center;
      font-size: 35px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      letter-spacing: 3px;
      margin-bottom: 44px;
    }
    .text {
      text-align: center;
      letter-spacing: 3px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
      margin-bottom: 53px;
    }
    .c-submit {
      display: flex;
      justify-content: space-between;
      input {
        width: 378px;
        height: 98px;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(226, 226, 226, 1);
        border-radius: 6px;
        padding-left: 38px;
        outline: none;
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
      div {
        width: 236px;
        height: 98px;
        background: rgba(68, 68, 68, 1);
        border: 2px solid rgba(65, 65, 65, 1);
        border-radius: 4px;
        line-height: 98px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        letter-spacing: 3px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .c-map {
    position: relative;
    border-bottom: 2px solid rgba(198, 199, 200, 1);
    padding-top: 72px;
    padding-bottom: 72px;
    .c-top {
      .title {
        font-size: 35px;
        text-align: center;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 36px;
      }
      .top-btm {
        padding-left: 88px;
        padding-right: 86px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 45px;
        .one {
          width: 190px;
          margin-bottom: 48px;
          text-align: center;
        }
        .two {
          width: 276px;
          margin-bottom: 48px;
          text-align: center;
        }
        .three {
          width: 209px;
        }
        .four {
          width: 276px;
          text-align: center;
        }
        .font {
          font-size: 19px;
          font-weight: 300;
          color: rgba(51, 51, 51, 1);
          line-height: 38px;
        }
      }
      .openinmap {
        padding-left: 88px;
        padding-bottom: 16px;
        display: inline-block;
        font-size: 19px;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
      }
    }
    .c-bottom {
      margin: auto;
      margin-top: 128px;
    }
  }
  footer {
    padding-top: 81px;
    padding-bottom: 86px;
    .text1 {
      text-align: center;
      margin-bottom: 92px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .text2 {
      text-align: center;
      font-size: 21px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>

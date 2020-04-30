<template>
  <div>
    <header
      class="header"
      :style="{'background':header_set.background,'color':header_set.textColor }"
    >
      <div class="header-content">
        <div class="c-header-logo">
          <el-image
            v-show="logoSuccessLoad"
            :src="header_set.imgSrc"
            @load="logoLoad"
            :style="{'width':headerLogoWidth}"
          />
          <span class="text" v-show="!logoSuccessLoad">Mall</span>
        </div>
        <div class="c-header-right" :style="{'color':header_set.textColor }">
          <span
            class="font-switch"
            @click="switchLanguage($t('lang.templete.templeteFive.index.text6'))"
          >{{$t('lang.templete.templeteFive.index.text6')}}</span>
          <div class="cart" @click="toCart">
            <span class="iconfont icongouwudai"></span>
            <span class="itemNum" v-if="numberOfItemsInCart>0">{{numberOfItemsInCart}}<span v-show='numberOfItemsInCart===99'>+</span></span>
          </div>
          <span class="iconfont icongengduo1" @click="drawerVisivle=true"></span>
        </div>
      </div>
    </header>
    <router-view
      @getMessage="getCartNumber"
      @getIndex="routerClass"
      :searchVal="searchVal"
      :searchTwo="searchTwo"
    ></router-view>
    <footer class="temp-footer" v-show="$route.path==='/templateFiveContent'">
      <div class="footer-content">
        <div class="footer-box">
          <p class="footer-title">{{footer_set.quickLinks_set.quickLinksTitle}}</p>
          <div
            v-if="footer_set.quickLinks_set.WhetherDisplayhomePageLink===false&&footer_set.quickLinks_set.WhetherDisplayCatalogLink===false"
          >
            <p>
              {{$t('lang.templete.templeteFive.footer.content1.text2')}}
              <span>{{$t('lang.templete.templeteFive.footer.content1.text3')}}</span>
            </p>
            <p class="bold">{{$t('lang.templete.templeteFive.footer.content1.text5')}}</p>
          </div>
          <div class="c-link" v-if="footer_set.quickLinks_set.WhetherDisplayhomePageLink">
            <router-link
              to="/templateFiveContent"
            >{{$t('lang.templete.templeteFive.footer.content1.text6')}}</router-link>
          </div>
          <div class="c-link" v-if="footer_set.quickLinks_set.WhetherDisplayCatalogLink">
            <router-link to="/catalog">{{$t('lang.templete.templeteFive.footer.content1.text7')}}</router-link>
          </div>
        </div>
        <div class="footer-box">
          <p class="footer-title">{{footer_set.getInTouch_set.getInTouchTitle}}</p>
          <p>{{footer_set.getInTouch_set.text}}</p>
        </div>
        <div class="footer-box">
          <p class="footer-title">{{footer_set.newsletter_set.newsletterTitle}}</p>
          <p>{{footer_set.newsletter_set.text}}</p>
        </div>
        <div class="footer-box footer-Email">
          <input
            type="text"
            class="input-Email"
            :placeholder="$t('lang.templete.templeteFive.footer.content3.input')"
          />
          <button class="EmailBtn">{{$t('lang.templete.templeteFive.footer.content3.btn')}}</button>
        </div>

        <p class="footer-copyright">
          <span>{{$t('lang.templete.templeteFive.footer.content4.text1')}}</span>
          <span class="power-by">{{$t('lang.templete.templeteFive.footer.content4.text2')}}</span>
        </p>
      </div>
    </footer>
    <el-drawer
      :title="$t('lang.templete.templeteFive.hint.text1')"
      custom-class="menu-box"
      direction="ttb"
      size="60%"
      :visible.sync="drawerVisivle"
    >
      <div class="c-menu-box-search">
        <el-input
          class="menu-box-search"
          v-model="searchVal"
          :placeholder="$t('lang.templete.templeteFive.header.text2')"
          :style="{'background':header_set.cartAndInputBackgroundColor,'color':header_set.textColor }"
        >
          <i slot="suffix" @click="searchProduct" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <ul class="c-links">
        <li
          @click="drawerVisivle=false"
          v-for="(item, index) in $t('lang.templete.templeteFive.header.text4')"
          :key="index"
          :style="{'borderColor':header_set.activeLinkColor }"
        >
          <router-link
            :to="item.href"
            :style="{'color':header_set.textColor }"
            :class="{'router-link-active':cla === index}"
          >{{item.title}}</router-link>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { getNum, getStoreFrontPageData } from '@/common/api/api'

export default {
  name: 'templateFive',
  inject: ['reload'], // 局部刷新
  data () {
    return {
      // 变量
      logoSuccessLoad: false,
      drawerVisivle: false, // 菜单
      // header的设置
      header_set: {
        imgSrc: '',
        imgWidth: '70px',
        background: '#182e49',
        textColor: '#fff',
        cartAndInputBackgroundColor: '#0f243d',
        activeLinkColor: '#fda506'
      },
      // footer的设置
      footer_set: {
        quickLinks_set: {
          quickLinksTitle: 'Quick links',
          WhetherDisplayhomePageLink: true,
          WhetherDisplayCatalogLink: true
        },
        getInTouch_set: {
          getInTouchTitle: 'Get in touch',
          text:
            'Use this text to share information about your brand with your customers.'
        },
        newsletter_set: {
          newsletterTitle: 'Newsletter',
          text: 'Promotions,new products and sales,Directly to your inbox.'
        }
      },
      // 变量
      numberOfItemsInCart: '',
      searchVal: '',
      searchTwo: ''
    }
  },
  computed: {
    headerLogoWidth () {
      return (
        parseFloat(this.header_set.imgWidth) /
          parseFloat(document.documentElement.style.fontSize.split('p')[0]) +
        'rem'
      )
    }
  },
  watch: {
    numberOfItemsInCart: {
      handler (val) {
        if (val > 99) {
          this.numberOfItemsInCart = 99
        }
      }
    }
  },
  methods: {
    logoLoad () {
      this.logoSuccessLoad = true
    },
    // 语言切换
    switchLanguage (value) {
      switch (value) {
        case 'zh':
          this.$cookies.set('think_var', 'zh-cn')
          this.$i18n.locale = 'zh-cn'
          break
        case '英文':
          this.$cookies.set('think_var', 'en-us')
          this.$i18n.locale = 'en-us'
          break
        default:
          break
      }
      this.reload()
    },
    // 购物车数量
    getCartNumber (val) {
      this.numberOfItemsInCart = val
    },
    toCart () {
      this.$router.push({ path: '/shopTrolley' })
    },
    searchProduct () {
      if (this.searchVal) {
        this.$router.push({
          path: '/searchCatalog',
          query: {
            goodsname: this.searchVal
          }
        })
        this.drawerVisivle = false
      }
    }
  },
  async created () {
    getNum({}).then(resp => {
      this.numberOfItemsInCart = resp.data.data
      console.log(resp)
    })
    let res = await getStoreFrontPageData()
    this.header_set = res.data.data.header_set
    this.footer_set = res.data.data.footer_set
    console.log(res)
    // 修改header-menu的样式
    document.getElementsByClassName(
      'menu-box'
    )[0].style.background = this.header_set.background
    document.getElementsByClassName(
      'el-drawer__header'
    )[0].style.color = this.header_set.textColor
  }
}
</script>
<style lang="less">
.menu-box {
  .c-menu-box-search {
    padding: 0 16px;
    input {
      background-color: inherit !important;
      border: none;
      color: inherit;
    }
    ::placeholder {
      color: inherit;
    }
    .el-input__suffix {
      color: inherit !important;
    }
  }
  .c-links {
    li {
      padding: 10px 16px;
      border-bottom: 1px solid;
    }
  }
}
</style>
<style scoped lang="less">
@import "../../../common/css/common";
.header {
  background: #182e49;
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    .c-header-logo {
      .text {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .c-header-right {
      display: flex;
      align-items: center;
      font-size: 16px;
      .font-switch {
        color: inherit;
      }
      .cart {
        position: relative;
        .icongouwudai {
          margin-left: 29px;
          position: relative;
          top: 0px;
          font-size: 16px;
        }
        .itemNum {
          background-color: #f56c6c;
          position: absolute;
          top: 0;
          right: 5px;
          transform: translate(105%, -45%);
          padding: 2px 4px;
          border-radius: 30%;
        }
      }
      .icongengduo1 {
        color: inherit;
        font-size: 24px;
        margin-left: 38px;
      }
    }
  }
}
.temp-footer {
  background-color: #eeeeee;
  .footer-content {
    padding: 20px 20px;
    text-align: left;
    .c-link {
      margin-bottom: 10px;
      a {
        color: rgba(51, 51, 51, 1);
      }
    }
    .footer-box {
      width: 100%;
      margin-bottom: 15px;
      line-height: 24px;
      .footer-title {
        font-size: 15px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    .footer-box:last-child {
      margin-bottom: 0;
    }
    .footer-Email {
      display: flex;
      margin-top: 40px;
      width: 100%;
      .input-Email {
        width: 100%;
        height: 20px;
        padding: 10px;
        border-radius: 2px;
        outline: none;
        background-color: #e9e9e9;
        border: 1px solid rgba(215, 215, 215, 1);
      }
      .EmailBtn {
        height: 42px;
        min-width: 80px;
        background: rgba(220, 220, 220, 1);
        border-radius: 2px;
        border: 0;
        color: rgba(102, 102, 102, 1);
        outline: none;
      }
    }
    .footer-copyright {
      text-align: center;
      .power-by {
        margin-left: 20px;
      }
    }
  }
}
</style>

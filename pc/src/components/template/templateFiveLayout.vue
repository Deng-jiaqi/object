<template>
  <div>
    <header
      id="1"
      class="header animated"
      :style="{'background':header_set.background,'color':header_set.textColor }"
    >
      <div class="header-box">
        <div class="header-content">
          <img
            v-if="header_set.imgSrc"
            :src="header_set.imgSrc"
            :style="{'width':`${header_set.imgWidth}px`}"
            alt
          />
          <p
            v-if="!header_set.imgSrc"
            class="header-title"
          >{{$t('lang.templete.templeteFive.header.text1')}}</p>
          <div class="header-search">
            <div class="c-search">
              <input
                type="text"
                v-model="searchVal"
                :placeholder="$t('lang.templete.templeteFive.header.text2')"
                class="header-search-input"
                :style="{'color':header_set.textColor,'backgroundColor':header_set.cartAndInputBackgroundColor}"
              />
              <span @click="searchProduct" class="iconfont icon-sousuo4" style="cursor: pointer"></span>
            </div>
            <div
              class="header-qieH"
              @click="toCart"
              :style="{'backgroundColor':header_set.cartAndInputBackgroundColor}"
            >
              <p>
                <span class="iconfont icongouwudai"></span>&nbsp;&nbsp;
                <span>{{$t('lang.templete.templeteFive.header.text3')}}</span>
                <span class="itemNum" v-if="numberOfItemsInCart>0">{{numberOfItemsInCart}}<span v-show='numberOfItemsInCart===99'>+</span></span>
              </p>
            </div>
            <!--  -->
            <div class="header-yuyan">
              <el-popover placement="bottom" trigger="click" v-model="visibleLang" width="150">
                <ul class="langCss">
                  <li
                    style="text-align:center;
                     cursor: pointer;"
                    class="langCssli"
                    v-for="item in options"
                    :key="item.value"
                    @click="langQh(item.value)"
                  >{{item.label}}</li>
                </ul>
                <p
                  slot="reference"
                  style=" cursor: pointer;"
                >{{$t('lang.templete.templeteFive.index.text5')}}</p>
              </el-popover>
            </div>
            <!--  -->
          </div>
        </div>

        <ul class="header-ul">
          <li>
            <router-link
              v-for="(item, index) in $t('lang.templete.templeteFive.header.text4')"
              :key="index"
              :to="item.href"
              class="routerLinkCss"
              :style="{'color':header_set.textColor,'borderColor':header_set.activeLinkColor}"
              :class="{'router-link-active':routerInfo === item.forActive}"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </header>
    <router-view
      @getMessage="getCartNumber"
      @getIndex="routerClass"
      :searchVal="searchVal"
      :searchTwo="searchTwo"
    ></router-view>
    <footer id="2" class="temp-footer animated">
      <div class="footer-content">
        <div class="footer-box">
          <div class="footer-box1">
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
            <div class="c-link-home" v-if="footer_set.quickLinks_set.WhetherDisplayhomePageLink">
              <router-link
                to="/templateFiveContent"
              >{{$t('lang.templete.templeteFive.footer.content1.text6')}}</router-link>
            </div>
            <div v-if="footer_set.quickLinks_set.WhetherDisplayCatalogLink">
              <router-link to="/catalog">{{$t('lang.templete.templeteFive.footer.content1.text7')}}</router-link>
            </div>
          </div>
          <div class="footer-box2">
            <p class="footer-title">{{footer_set.getInTouch_set.getInTouchTitle}}</p>
            <p>{{footer_set.getInTouch_set.text}}</p>
          </div>
          <div class="footer-box3">
            <p class="footer-title">{{footer_set.newsletter_set.newsletterTitle}}</p>
            <p>{{footer_set.newsletter_set.text}}</p>
            <div class="footer-Email">
              <input
                type="text"
                class="Email"
                :placeholder="$t('lang.templete.templeteFive.footer.content3.input')"
              />
              <button class="EmailBtn">{{$t('lang.templete.templeteFive.footer.content3.btn')}}</button>
            </div>
          </div>
        </div>
        <ul class="footer-ul">
          <li>{{$t('lang.templete.templeteFive.footer.content4.text1')}}</li>
          <li>{{$t('lang.templete.templeteFive.footer.content4.text2')}}</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import { getNum, getStoreFrontPageData } from '@/common/api/api'
export default {
  name: 'templateFive',
  inject: ['reload'],
  data () {
    return {
      visibleLang: false, // 语言切换
      // header的设置
      options: [{
        value: 'zh-cn',
        label: '中文'
      }, {
        value: 'en-us',
        label: 'English'
      }],
      value: '',
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
    routerInfo () {
      return this.$route.query
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
    // 语言切换
    langQh (value) {
      this.$cookies.set('think_var', value)
      this.$i18n.locale = value
      this.visibleLang = false
      this.reload()
    },
    handleMessage (event) {
      const data = event.data
      switch (data.cmd) {
        case 'switchThePage': {
          this.$router.push({
            path: data.params.path
          })
          break
        }
        // 锚点跳转
        case 'anchorPointJump': {
          console.log(data.params.anchorPoint)
          location.href = `#${data.params.anchorPoint}`
          document.getElementById(data.params.anchorPoint).classList.add('pulse', 'inedit-bg')
          setTimeout(() => {
            document.getElementById(data.params.anchorPoint).classList.remove('pulse', 'inedit-bg')
          }, 1000)
          break
        }
        // ----------header设置--------------//
        case 'setHeaderImg': {
          this.header_set.imgSrc = data.params.imgSrc
          break
        }
        case 'setLogoWidth': {
          this.header_set.imgWidth = data.params.logoWidth
          break
        }
        case 'setHeaderBackground': {
          this.header_set.background = data.params.background
          break
        }
        case 'setHeaderTextColor': {
          this.header_set.textColor = data.params.textColor
          break
        }
        case 'setHeaderCartAndInputBackgroundColor': {
          this.header_set.cartAndInputBackgroundColor =
            data.params.cartAndInputBackgroundColor
          break
        }
        case 'setHeaderActiveLinkColor': {
          this.header_set.activeLinkColor = data.params.activeLinkColor
          break
        }
        // ----------footer设置--------------//
        // 1.Quick links 设置
        case 'quickLinksTitleChange': {
          this.footer_set.quickLinks_set.quickLinksTitle =
            data.params.quickLinksTitle
          break
        }
        case 'quickLinksHomeVisibleChange': {
          this.footer_set.quickLinks_set.WhetherDisplayhomePageLink =
            data.params.WhetherDisplayhomePageLink
          break
        }
        case 'quickLinksCatalogVisibleChange': {
          this.footer_set.quickLinks_set.WhetherDisplayCatalogLink =
            data.params.WhetherDisplayCatalogLink
          break
        }
        // 2.Get in touch 设置
        case 'getInTouchTitleChange': {
          this.footer_set.getInTouch_set.getInTouchTitle =
            data.params.getInTouchTitle
          break
        }
        case 'getInTouchTextChange': {
          this.footer_set.getInTouch_set.text = data.params.text
          break
        }
        // 3.Newsletter 设置
        case 'newsletterTitleChange': {
          this.footer_set.newsletter_set.newsletterTitle =
            data.params.newsletterTitle
          break
        }
        case 'newsletterTextChange': {
          this.footer_set.newsletter_set.text = data.params.text
          break
        }
        default:
          break
      }
    },
    // routerClass (index) { // 蠢如狗
    //   this.cla = index
    // },
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
      }
    }

  },
  async created () {
    getNum({}).then(res => {
      this.numberOfItemsInCart = res.data.data
    })
    this.value = this.$i18n.locale
    let res = await getStoreFrontPageData()
    this.header_set = res.data.data.header_set
    this.footer_set = res.data.data.footer_set
    console.log(res)
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
}
</script>

<style scoped lang="less">
@import "../../common/css/common.less";
.inedit-bg {
  background-color: red !important;
}
.ColorCss {
  background-color: #e9e9e9;
  border: 1px solid rgba(215, 215, 215, 1);
}
.header {
  padding-top: 40px;
}
.header-title {
  font-size: 21px;
  font-weight: bold;
}
.header-qieH {
  width: 114px;
  height: 50px;
  border-radius: 2px;
  margin: 0 auto auto 22px;
  text-align: center;
  cursor: pointer;
  position: relative;
  margin-right: 40px;
  .header-yuyan {
    .langCss {
      width: 200px;
      background-color: brown;
      .langCssli {
      }
    }
  }
}
.c-search {
  position: relative;
  .header-search-input {
    width: 260px;
    height: 30px;
    padding: 10px 50px 10px 10px;
    border-radius: 2px;
    outline: none;
    border: 0;
  }
  ::placeholder {
    color: inherit !important;
  }
}
.header-box {
  padding: 0 30px;
  max-width: 1140px;
  margin: auto;
}
.header-search {
  display: flex;
  > div:nth-child(1) {
    position: relative;
    > span {
      position: absolute;
      right: 20px;
      top: 14px;
      font-size: 20px;
    }
  }
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    color: white;
  }
}
.header-ul:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.header-ul {
  margin: 30px auto 0 auto;
  display: flex;
  height: 50px;
  .router-link-active {
    border-bottom: 3px solid;
    padding-bottom: 3px;
  }
}
.routerLinkCss:nth-child(2) {
  margin-left: 20px;
}
.temp-footer {
  overflow: hidden;
  background-color: #eeeeee;
}
.footer-content {
  padding: 0 30px;
  max-width: 1140px;
  margin: auto;
  .footer-box {
    display: flex;
    justify-content: flex-start;
    margin-top: 64px;
  }
  .footer-box1 {
    width: 16.6%;
    .bold {
      font-weight: bold;
    }
    .c-link-home {
      margin-bottom: 15px;
    }
    a {
      color: #2c3e50;
      text-decoration: none;
    }
  }
  .footer-box2 {
    width: 50%;
    padding-left: 30px;
  }
  .footer-box3 {
    width: 33.333%;
    padding-left: 30px;
  }
  .footer-title {
    font-size: 13px;
    font-weight: bold;
    color: black;
  }
}

.footer-ul {
  display: flex;
  margin-bottom: 20px;
  li:nth-child(2) {
    margin-left: 52px;
  }
}
.el-carousel__item {
  background-color: #eeeeee;
  .flexCss;
}
.Email {
  width: 100%;
  height: 20px;
  padding: 10px;
  .ColorCss;
  border-radius: 2px;
  outline: none;
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
.footer-Email {
  display: flex;
  margin-top: 40px;
}
.itemNum {
  display: block;
  width: 20px;
  max-width: 30px;
  max-height: 30px;
  border-radius: 30px;
  background-color: #f56c6c;
  .flexCss;
  color: white;
  position: absolute;
  right: 2px;
  padding: 2px;
  font-size: 10px;
  top: 2px;
}
</style>

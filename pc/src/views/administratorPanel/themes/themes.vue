<template>
  <div class="c-themes">
    <!-- 侧边栏 -->
    <div class="c-themes-sidebar" v-loading="loading">
      <div v-if="!loading">
        <!-- 标头操作页面 -->
        <Header
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="header"
        />
        <!-- 幻灯片操作页 -->
        <Slide
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="slide"
        />
        <!-- 首页的产品系列列表操作页面 -->
        <SeriesOfProductList
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="seriesOfProductList"
        />
        <!-- 首页的特色产品系列操作页面 -->
        <FeaturedSeriesOfProduct
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="featuredSeriesOfProduct"
        />
        <!-- 页脚操作页面 -->
        <Footer
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="footer"
        />
        <!-- 产品目录操作页面 -->
        <Catalog
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="catalog"
        />
        <!-- 产品详情 -->
        <ProductDetails
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="productDetails"
        />
        <!-- 产品详情 -->
        <AllSeriesOfProductList
          @customSettingsChange="customSettingsChange"
          @operationSuccess="operationSuccess"
          ref="allSeriesofproductList"
        />
        <p class="sidebar-title">
          <span @click='backOnlineStore' class="iconfont icon-fanhui1"></span>
          <span>{{$t('indexOfCustom.text1')}}</span>
          </p>
        <!-- 设定的组件列表 -->
        <div
          class="sidebar-item"
          @click="openOptionPage(item.type,item.props,item.compId,defaultProductid)"
          :class="{'sidebar-link-header':item.compId==='1','sidebar-link-footer':item.compId==='2'}"
          v-for="(item,index) in sidebarData"
          :key="index"
        >
          <span class="iconfont icon-shouye"></span>
          {{$i18n.locale==='en-us'?item.compName_en:item.compName}}
        </div>
      </div>
    </div>
    <!-- 右边ifream -->
    <div class="c-themes-ifream">
      <div class="themes-options">
        <el-dropdown trigger="click" placement="bottom" @command="switchThePage">
          <span class="dropdown-link">
            {{$t('indexOfCustom.text2')}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/templateFiveContent">{{$t('indexOfCustom.text3')}}</el-dropdown-item>
            <el-dropdown-item command="/catalog">{{$t('indexOfCustom.text4')}}</el-dropdown-item>
            <el-dropdown-item :command="`/productDetails?productid=${defaultProductid}`">{{$t('indexOfCustom.text5')}}</el-dropdown-item>
            <el-dropdown-item command="/allSeriesOfProductList">{{$t('indexOfCustom.text6')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click='saveCustomSettings' :disabled="!changedCustomSettings.length" type="primary">{{$t('indexOfCustom.text7')}}</el-button>
      </div>
      <div class="themes-ifream">
        <iframe
          class="ifream"
          ref="iframe"
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="auto"
          :src="iframeSrc"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/views/administratorPanel/themes/operationPage/header'
import Slide from '@/views/administratorPanel/themes/operationPage/slide'
import SeriesOfProductList from '@/views/administratorPanel/themes/operationPage/seriesOfProductList'
import FeaturedSeriesOfProduct from '@/views/administratorPanel/themes/operationPage/featuredSeriesOfProduct'
import Catalog from '@/views/administratorPanel/themes/operationPage/catalog'
import ProductDetails from '@/views/administratorPanel/themes/operationPage/productDetails'
import AllSeriesOfProductList from '@/views/administratorPanel/themes/operationPage/allSeriesOfProductList'
import Footer from '@/views/administratorPanel/themes/operationPage/footer'
import { getCustomSidebarData, savecustomize } from '@/common/api/api'
import messageAlert from '@/utils/messageAlert'
import { cloneDeep, remove } from 'lodash'
export default {
  components: {
    Header,
    Slide,
    SeriesOfProductList,
    FeaturedSeriesOfProduct,
    Catalog,
    ProductDetails,
    AllSeriesOfProductList,
    Footer
  },
  data () {
    return {
      // 变量
      sidebarData: [], // 侧边栏数据
      defaultProductid: '', // 选择产品详情页面时候的默认id
      iframeWin: {},
      iframeSrc: '',
      postMessageTo: '',
      page: '',
      // data
      changedCustomSettings: [], // 改变了的设置的数据
      // ui
      loading: true
    }
  },
  watch: {
    page: {
      async handler (value) {
        this.loading = true
        let res = await getCustomSidebarData({ page: value })
        this.loading = false
        console.log(res)
        this.sidebarData = res.data.data.components
        this.defaultProductid = res.data.data.productid
      }
    }
  },
  methods: {
    operationSuccess (message) {
      console.log(message)
      this.iframeWin.postMessage(message, this.postMessageTo)
    },
    customSettingsChange (type, compId, val) { // 改变了页面数据
      if (!this.changedCustomSettings.length) {
        this.changedCustomSettings.push({
          compId: compId,
          props: val
        })
      } else {
        if (type === 'change') {
          let repeatIndex
          let exist = this.changedCustomSettings.some((item, index) => {
            if (item.compId === compId) {
              repeatIndex = index
            }
            return item.compId === compId
          })
          if (exist) {
            this.changedCustomSettings[repeatIndex].props = val
          } else {
            this.changedCustomSettings.push({
              compId: compId,
              props: val
            })
          }
        } else { // 改变了页面数据 但是改回初始值了
          this.changedCustomSettings.forEach((item, index) => {
            if (item.compId === compId) {
              this.changedCustomSettings = remove(
                this.changedCustomSettings,
                (value, idx) => {
                  return idx !== index
                }
              )
            }
          })
        }
      }
    },
    openOptionPage (itemRef, itemProps, compId, defaultProductid) { // 打开操作页
      this.$refs[itemRef].optionVisible = true
      this.$refs[itemRef].getParentComponentData(itemProps, compId, defaultProductid)
      this.iframeWin.postMessage({
        cmd: 'anchorPointJump',
        params: {
          anchorPoint: compId
        }
      }, this.postMessageTo)
    },
    async  saveCustomSettings () {
      let copedChangedCustomSettings = cloneDeep(this.changedCustomSettings)
      console.log(copedChangedCustomSettings)
      copedChangedCustomSettings.forEach((item, index) => {
        if (item.compId === '4') { // 产品系列列表的发送数据处理
          let sendArr = []
          item.props.forEach(itemTwo => {
            if (itemTwo.Id) {
              sendArr.push(itemTwo.Id)
            }
          })
          copedChangedCustomSettings[index].props = sendArr
        }
        if (['5', '6', '7'].indexOf(item.compId) !== -1) { // 精选集的发送数据处理
          copedChangedCustomSettings[index].props.featuredSeriesOfProduct = item.props.featuredSeriesOfProduct.Id
        }
      })
      console.log(copedChangedCustomSettings)
      let res = await savecustomize({ page: this.page, customize: copedChangedCustomSettings })
      messageAlert(res)
      this.changedCustomSettings = []
      console.log(res)
    },
    handleMessage (event) {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      switch (data.cmd) {
        case 'returnFormJson':
          // 业务逻辑
          break
        case 'returnHeight':
          // 业务逻辑
          break
      }
    },
    switchThePage (src) {
      if (this.changedCustomSettings.length) {
        this.$confirm(this.$t('indexOfCustom.text8'), this.$t('indexOfCustom.text9'), {
          confirmButtonText: this.$t('indexOfCustom.text10'),
          cancelButtonText: this.$t('indexOfCustom.text11'),
          type: 'info'
        }).then(() => {
          this.iframeWin.postMessage({
            cmd: 'switchThePage',
            params: {
              path: src
            }
          }, this.postMessageTo)
          this.changedCustomSettings = []
          this.getSendPageParam(src)
        }).catch(() => {
        })
      } else {
        this.iframeWin.postMessage({
          cmd: 'switchThePage',
          params: {
            path: src
          }
        }, this.postMessageTo)
        this.getSendPageParam(src)
      }
    },
    getSendPageParam (src) { // 获取保存数据时候要发的 page参数
      switch (src) {
        case '/templateFiveContent' :
          this.page = 'sidebar_homepage'
          break
        case '/catalog' :
          this.page = 'sidebar_catalog'
          break
        case `/productDetails?productid=${this.defaultProductid}`:
          this.page = 'sidebar_goodsdetail'
          break
        case '/allSeriesOfProductList' :
          this.page = 'sidebar_collectionlist'
          break
        default:
          break
      }
    },
    backOnlineStore () {
      this.$router.push({
        path: '/administratorPanel/optionalModule'
      })
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
    this.iframeWin = this.$refs.iframe.contentWindow
  },
  async created () {
    this.page = 'sidebar_homepage'
    // 根据环境判断iframe的地址
    if (process.env.NODE_ENV === 'development') {
      this.iframeSrc = '/#/templateFiveContent'
      this.postMessageTo = 'http://localhost:8080'
    }
    if (process.env.NODE_ENV === 'production') {
      this.iframeSrc = 'https://www.edgelessstore.com/pc/#/templateFiveContent'
      this.postMessageTo = 'https://www.edgelessstore.com'
    }
  }
}
</script>
<style scoped lang='less'>
.c-themes {
  display: flex;
  justify-content: flex-start;
  .c-themes-sidebar {
    position: relative;
    border-right: 1px solid #dfe3e8;
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
    width: 279px;
    height: 100vh;
    overflow-y: auto;
    background-color: rgba(249, 250, 251, 1);
    .sidebar-title {
      line-height: 67px;
      height: 67px;
      padding-left: 32px;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        0 1px 3px 0 rgba(63, 63, 68, 0.15);
      .icon-fanhui1 {
        position: relative;
        left: -10px;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .sidebar-item {
      font-size: 16px;
      height: 62px;
      line-height: 62px;
      background: #fff;
      padding-left: 32px;
      border-bottom: 1px solid rgba(234, 235, 236, 1);
      cursor: pointer;
      .iconfont {
        font-size: 22px;
        margin-right: 14px;
      }
    }
    .sidebar-link-header {
      margin-bottom: 27px;
      margin-top: 27px;
      border-top: 1px solid rgba(234, 235, 236, 1);
    }
    .sidebar-slideshow {
      border-top: 1px solid rgba(234, 235, 236, 1);
    }
    .sidebar-link-footer {
      margin-top: 27px;
    }
  }
  .c-themes-ifream {
    flex-grow: 1;
    overflow: auto;
    padding-left: 40px;
    padding-right: 40px;
    height: 100vh;
    background-color: rgba(249, 250, 251, 1);
    .themes-options {
      height: 67px;
      min-width: 720px;
      line-height: 67px;
      background: #fff;
      width: 100%;
      position: relative;
      left: -40px;
      padding: 0 40px 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        0 1px 3px 0 rgba(63, 63, 68, 0.15);
      .dropdown-link {
        cursor: pointer;
      }
    }
    .themes-ifream {
      display: flex;
      min-width: 720px;
      justify-content: center;
      padding-top: 30px;
      padding-bottom: 30px;
      height: calc(100vh - 127px);
    }
  }
  .ifream {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
  }
}
p {
  margin: 0;
}
ul {
  margin: 0;
}
</style>

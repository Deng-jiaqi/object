
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 初始化css
import '../src/common/temFonts/iconfont.css'
import '../src/common/fonts/iconfont.css'
import whiteLists from '@/common/whiteLists.js' // 路由白名单
import './common/theme/index.css'
import VueI18n from 'vue-i18n' // 国际化
import './utils/rem' // rem
import includePermission from '@/utils/judgePermissions'
import axios from 'axios' // axios
import ajax from './ajax'
import animated from 'animate.css' // 动画
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies' // cookie
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播图
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'swiper/dist/css/swiper.css'
import VueClipboard from 'vue-clipboard2'
// 拖拽排序
import VueDND from 'awe-dnd'
// 打印
import Print from 'vue-print-nb'
// 全局富文本编辑器引入
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.config.productionTip = false
Vue.prototype.ajax = ajax
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueClipboard)
Vue.use(VuePhotoZoomPro)
Vue.use(VueQuillEditor)
Vue.use(VueI18n)
Vue.use(animated)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(Viewer)
Vue.use(VueDND)
Vue.use(Print)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})

let lang = VueCookies.get('think_var') || 'en-us'
const i18n = new VueI18n({
  locale: lang, // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-cn': require('./common/lang/zh'), // 中文语言包
    'en-us': require('./common/lang/en') // 英文语言包
  }
})
Vue.directive('preventReClick', { // 全局注册的Btn防抖 多次点击
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})
const existPermission = (arrOne, arrTwo) => { // 有一个满足就行
  if (arrTwo.length === 0) {
    return true
  }
  let x = false
  for (let item of arrTwo) {
    if (arrOne.indexOf(item) !== -1) {
      x = true
      return x
    }
  }
  return x
}
router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  let isLogin = false
  if (VueCookies.get('ELoginInfoSuccess') || VueCookies.get('ALoginInfoSuccessList')) {
    isLogin = true
  }
  if (isLogin && whiteLists.indexOf(to.path) === -1) { // 已登录并不在登录白名单内时获取权限
    await store.dispatch('getPermissionList')
    const {
      permissions
    } = to.meta
    if (permissions) {
      const hasPermission = includePermission(store.state.currentPermissionList, permissions)
      if (!hasPermission) {
        if (store.state.currentPermissionList.length === 0) {
          next('/noPermission')
        } else {
          if (includePermission(store.state.currentPermissionList, ['1'])) {
            next('/administratorPanel/home')
            return
          }
          if (includePermission(store.state.currentPermissionList, ['3'])) {
            next('/administratorPanel/orderManagement/effectiveOrders/allOrdersTable')
            return
          }
          if (includePermission(store.state.currentPermissionList, ['5'])) {
            next('/administratorPanel/productInventory/allProducts')
            return
          }
          if (includePermission(store.state.currentPermissionList, ['6'])) {
            next('/administratorPanel/productInventory/inventory')
            return
          }
          if (includePermission(store.state.currentPermissionList, ['7'])) {
            next('/administratorPanel/productInventory/productLine')
            return
          }
          if (includePermission(store.state.currentPermissionList, ['8'])) {
            next({ path: '/administratorPanel/indexOfDiscount/discountCode', query: { 'status': 'all' } })
            return
          }
          if (includePermission(store.state.currentPermissionList, ['9'])) {
            next('/optionalModule')
            return
          }
          if (existPermission(store.state.currentPermissionList, ['10', '11', '12', '13', '14'])) {
            next('/administratorPanel/settings/set')
            return
          }
        }
      } else {
        next()
      }
    } else {
      next()
    }
  }
  if (isLogin && whiteLists.indexOf(to.path) !== -1) { // 已登录且在白名单内
    next()
  }
  if (!isLogin) {
    if (whiteLists.indexOf(to.path) !== -1) { // 未登录但是在登录白名单内
      next()
    } else {
      console.log('我因为没有登录又不在白名单里面返回了首页')
      next('/dashbord') // 没有登录又不在白名单里面先返回首页
    }
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

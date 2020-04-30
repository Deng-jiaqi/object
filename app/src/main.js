import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 初始化css
import VueI18n from 'vue-i18n' // 国际化
import './utils/rem' // rem
import axios from 'axios' // axios
import VueAxios from 'vue-axios'
import ajax from './ajax'
import VueCookies from 'vue-cookies' // cookie
import './common/font/iconfont.css'
import './common/icon/iconfont.css'
import './common/fonts/iconfont.css'
import './common/font1/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 轮播swiper
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 全局组件引入
import Myinput from '@/common/component/myinput'
import Mybutton from '@/common/component/mybutton'
import Tooltip from '@/common/component/tooltip'

import animated from 'animate.css'
Vue.component('my-input', Myinput)
Vue.component('my-button', Mybutton)
Vue.component('my-tooltip', Tooltip)
Vue.config.productionTip = false
Vue.prototype.ajax = ajax
Vue.use(VueI18n)
Vue.use(animated)
Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(VueAxios, axios)
Vue.use(vueSwiper)
Vue.use(VueQuillEditor)
const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-CN': require('./common/lang/zh'), // 中文语言包
    'en-US': require('./common/lang/en') // 英文语言包
  }
})
Vue.directive('preventReClick', { // 全局注册的Btn防抖 多次点击
  inserted (el, binding) {
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
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

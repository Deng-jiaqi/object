import Vue from 'vue'
import Vuex from 'vuex'
import { getPermissionsList } from '@/common/api/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerImg: '', // 头部图片
    headerName: '', // 头部名字
    rightLoadingVisible: false,
    currentPermissionList: [],
    selectedRows: [], // 选中了的折扣项
    afterDiscountOperation: false, // 用于折扣操作完成之后刷新页面数据
    attrModalWindowVisible: false, // 多属性模态窗ui
    inEditorAttr: null, // 多属性模态窗正在编辑的attr
    clickTime: null, // 何时点击了折扣的 添加特定产品/系列模态窗的保存
    specific_modal_search: null, // 特定产品的搜索值
    seriesOfSpecific_modal_search: null, // 特定产品系列的搜索值
    country_modal_search: null, // 特定国家搜索

    // 选中的国家
    selectedCountries: [],
    // 百分比时的选中的产品
    percent_selectedSpecificProducts: null,
    percent_selectedSeriesOfSpecificProducts: null,
    // 固定金额时的选中的产品
    fixed_selectedSpecificProducts: null,
    fixed_selectedSeriesOfSpecificProducts: null,
    // 买x送y时 客户购买选中的产品
    buy_selectedSpecificProducts: null,
    buy_selectedSeriesOfSpecificProducts: null,
    // 买x送y时 客户获得选中的产品
    get_selectedSpecificProducts: null,
    get_selectedSeriesOfSpecificProducts: null,
    // 自动折扣时
    auto_percent_selectedSpecificProducts: null, // 百分比时的选中的产品
    auto_percent_selectedSeriesOfSpecificProducts: null,
    // 固定金额时的选中的产品
    auto_fixed_selectedSpecificProducts: null,
    auto_fixed_selectedSeriesOfSpecificProducts: null,
    // 买x送y时 客户购买选中的产品
    auto_buy_selectedSpecificProducts: null,
    auto_buy_selectedSeriesOfSpecificProducts: null,
    // 买x送y时 客户获得选中的产品
    auto_get_selectedSpecificProducts: null,
    auto_get_selectedSeriesOfSpecificProducts: null,
    // 运输资料选中的特定产品
    cre_transportdata_selectedSpecificProducts: null
  },
  getters: {
    getHeaderImg: state => state.headerImg
  },
  mutations: {
    // 主页头像设置方法
    setHeaderImg (state, headerImg) {
      state.headerImg = headerImg
    },
    // 主页头像设置方法
    setHeaderName (state, headerName) {
      state.headerName = headerName
    },
    forRightLoadingVisible (state, x) {
      state.rightLoadingVisible = x
    },
    forCurrentPermissionList (state, x) {
      state.currentPermissionList = x
    },
    forSelectedRows (state, x) {
      state.selectedRows = x
    },
    forAfterDiscountOperation (state, x) {
      state.afterDiscountOperation = x
    },
    forAttrModalWindowVisible (state, x) {
      state.attrModalWindowVisible = x
    },
    forInEditorAttr (state, x) {
      state.inEditorAttr = x
    },
    forClickTime (state, x) {
      state.clickTime = x
    },
    forSpecific_modal_search (state, x) {
      state.specific_modal_search = x
    },
    forSeriesOfSpecific_modal_search (state, x) {
      state.seriesOfSpecific_modal_search = x
    },
    forCountry_modal_search (state, x) {
      state.country_modal_search = x
    },
    forCountries (state, x) {
      state.countries = x
    },
    forSelectedCountries (state, x) {
      state.selectedCountries = x
    },
    percent_addSpecificProducts (state, x) {
      state.percent_selectedSpecificProducts = x
    },
    percent_addSeriesOfSpecificProducts (state, x) {
      state.percent_selectedSeriesOfSpecificProducts = x
    },
    fixed_addSpecificProducts (state, x) {
      state.fixed_selectedSpecificProducts = x
    },
    fixed_addSeriesOfSpecificProducts (state, x) {
      state.fixed_selectedSeriesOfSpecificProducts = x
    },
    buy_addSpecificProducts (state, x) {
      state.buy_selectedSpecificProducts = x
    },
    buy_addSeriesOfSpecificProducts (state, x) {
      state.buy_selectedSeriesOfSpecificProducts = x
    },
    get_addSpecificProducts (state, x) {
      state.get_selectedSpecificProducts = x
    },
    get_addSeriesOfSpecificProducts (state, x) {
      state.get_selectedSeriesOfSpecificProducts = x
    },
    // 自动折扣时
    auto_percent_addSpecificProducts (state, x) {
      state.auto_percent_selectedSpecificProducts = x
    },
    auto_percent_addSeriesOfSpecificProducts (state, x) {
      state.auto_percent_selectedSeriesOfSpecificProducts = x
    },
    auto_fixed_addSpecificProducts (state, x) {
      state.auto_fixed_selectedSpecificProducts = x
    },
    auto_fixed_addSeriesOfSpecificProducts (state, x) {
      state.auto_fixed_selectedSeriesOfSpecificProducts = x
    },
    auto_buy_addSpecificProducts (state, x) {
      state.auto_buy_selectedSpecificProducts = x
    },
    auto_buy_addSeriesOfSpecificProducts (state, x) {
      state.auto_buy_selectedSeriesOfSpecificProducts = x
    },
    auto_get_addSpecificProducts (state, x) {
      state.auto_get_selectedSpecificProducts = x
    },
    auto_get_addSeriesOfSpecificProducts (state, x) {
      state.auto_get_selectedSeriesOfSpecificProducts = x
    },
    // 创建运输资料选中的特定产品
    cre_transportdata_addSelectedSpecificProducts (state, x) {
      state.cre_transportdata_selectedSpecificProducts = x
    }
  },
  actions: {
    getPermissionList: async ({ state, commit }) => {
      if (state.currentPermissionList.length > 0) { return } // 权限实时性问题？
      const res = await getPermissionsList()
      const current = res.data.data.privilege
      commit('forCurrentPermissionList', current)
    },
    getPermissionListForLoginSuccess: async ({ state, commit }) => {
      // 登录成功时拉一边权限,避免先登录一个账号后再登录另一个账号,之前的权限覆盖了现在的
      const res = await getPermissionsList()
      const current = res.data.data.privilege
      commit('forCurrentPermissionList', current)
    }
  }
})

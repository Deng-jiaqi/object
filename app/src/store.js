import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forshowSearchPage: false,
    editReceivingAndShippingInformation: null, // 编辑收发货地址
    forAdministratorPanelNavigation: 'close'
  },
  mutations: {
    changeForshowSearchPage (state) {
      state.forshowSearchPage = !state.forshowSearchPage
    },
    forEditReceivingAndShippingInformation (state, x) {
      state.editReceivingAndShippingInformation = x
    },
    changeForAdministratorPanelNavigation (state, x) {
      state.forAdministratorPanelNavigation = x
    }
  },
  actions: {

  }
})

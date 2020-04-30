import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/loginAndRegister',
      component: () => import('@/components/loginAndRegister/loginRegisterHeader'),
      children: [
        {
          path: 'ELoginOfMall',
          component: () => import('@/views/loginAndRegister/ELoginOfMall')
        },
        {
          path: 'ELoginOfEmail',
          component: () => import('@/views/loginAndRegister/ELoginOfEmail')
        },
        {
          path: 'ELoginOfPassword',
          component: () => import('@/views/loginAndRegister/ELoginOfPassword')
        },
        {
          path: 'loginOfRecent',
          component: () => import('@/views/loginAndRegister/loginOfRecent')
        },
        {
          path: 'ARegisterOfIndex',
          component: () => import('@/views/loginAndRegister/ARegisterOfIndex')
        },
        {
          path: 'ALogin',
          component: () => import('@/views/loginAndRegister/ALogin')
        },
        {
          path: 'ALoginOfShops',
          name: 'ALoginShops',
          component: () => import('@/views/loginAndRegister/ALoginOfShops')
        },
        {
          path: 'ALoginOfShopPsw',
          name: 'ALoginOfShopPsw',
          component: () => import('@/views/loginAndRegister/ALoginOfShopPsw')
        },
        {
          path: 'AnextRegister',
          name: '注册输入店铺密码',
          component: () => import('@/views/loginAndRegister/AnextRegister')
        },
        {
          path: 'forgetShop',
          name: '忘记商店地址',
          component: () => import('@/views/loginAndRegister/forgetShop')
        },
        {
          path: 'forgetPassword',
          name: '忘记密码',
          component: () => import('@/views/loginAndRegister/forgetPassword')
        },
        {
          path: 'resetPasswords',
          name: '重置密码',
          component: () => import('@/views/loginAndRegister/resetPassword')
        },
        {
          path: 'AregMessage',
          name: '注册信息',
          component: () => import('@/views/loginAndRegister/AregMessage')
        }
      ]
    },
    // 商家管理
    {
      path: '/administratorPanel',
      component: () => import('@/components/administratorPanel/adminPanelHeader'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/administratorPanel/Home')
        },
        {
          path: 'addDomain',
          component: () => import('@/views/administratorPanel/addDomain')
        },
        {
          path: 'customizeDomain',
          component: () => import('@/views/administratorPanel/customizeDomain')
        },
        // 订单管理
        {
          path: 'orderManagement/indexOfAllOrders',
          component: () => import('@/views/administratorPanel/orderManagement/allOrders/index.vue'),
          children: [
            {
              path: 'allOrdersTable',
              name: 'allOrdersTable',
              component: () => import('@/components/administratorPanel/orderList')
            },
            {
              path: 'notPayingTable',
              name: 'notPayingTable',
              component: () => import('@/components/administratorPanel/orderList')
            },
            {
              path: 'paymentNotDeliveredTable',
              name: 'paymentNotDeliveredTable',
              component: () => import('@/components/administratorPanel/orderList')
            },
            {
              path: 'paymentAndDeliveredTable',
              name: 'paymentAndDeliveredTable',
              component: () => import('@/components/administratorPanel/orderList')
            },
            {
              path: 'conditionQueryTable',
              name: 'conditionQueryTable',
              component: () => import('@/components/administratorPanel/orderList')
            }
          ]
        },
        // 订单管理/2级页面
        {
          path: 'orderManagement/orderDetails',
          component: () => import('@/views/administratorPanel/orderManagement/allOrders/orderDetails')
        },
        {
          path: 'orderManagement/delivery',
          component: () => import('@/views/administratorPanel/orderManagement/allOrders/delivery')
        },
        {
          path: 'orderManagement/refund',
          component: () => import('@/views/administratorPanel/orderManagement/allOrders/refund')
        },
        {
          path: 'orderManagement/rePutInStorage',
          component: () => import('@/views/administratorPanel/orderManagement/allOrders/rePutInStorage')
        },
        {
          path: 'orderManagement/cancelOrders',
          component: () => import('@/views/administratorPanel/orderManagement/allOrders/cancelOrders')
        }
      ]
    },
    // 模板
    {
      path: '/phone/templateOne',
      component: () => import('@/views/administratorPanel/onlineStore/templeteOne')
    },
    {
      path: '/templateTwo',
      component: () => import('@/views/administratorPanel/onlineStore/templeteTwo')
    },
    {
      path: '/templateThree',
      component: () => import('@/views/administratorPanel/onlineStore/templeteThree')
    },
    {
      path: '/templateFour',
      component: () => import('@/views/administratorPanel/onlineStore/templeteFour')
    },
    {
      path: '/templateFive',
      name: '模板5',
      component: () => import('@/views/administratorPanel/onlineStore/templateFive')
    },
    {
      path: '/templateSix',
      name: '模板6',
      component: () => import('@/views/administratorPanel/onlineStore/templateSix')
    },
    {
      path: '/templateSeven',
      name: '模板7',
      component: () => import('@/views/administratorPanel/onlineStore/templateSeven')
    },
    {
      path: '/templateEight',
      name: '模板8',
      component: () => import('@/views/administratorPanel/onlineStore/templateEight')
    },
    {
      path: '/addShop',
      component: () => import('@/views/administratorPanel/productInventory/addShop')
    },
    {
      path: '/allProducts',
      component: () => import('@/views/administratorPanel/productInventory/allProducts')
    },
    {
      path: '/inventory',
      component: () => import('@/views/administratorPanel/productInventory/inventory')
    },
    {
      path: '/productLine',
      component: () => import('@/views/administratorPanel/productInventory/productLine')
    },
    {
      path: '/productDetails',
      component: () => import('@/views/administratorPanel/productInventory/productDetails')
    },
    {
      path: '/multiattributeDetail',
      component: () => import('@/views/administratorPanel/productInventory/multiattributeDetail')
    },
    {
      path: '/dashbord',
      component: () => import('@/views/dashbord')
    },
    {
      path: '/test',
      component: () => import('@/views/test')
    },
    {
      path: '',
      redirect: '/dashbord'
    }
  ]
})

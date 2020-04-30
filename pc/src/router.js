import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    //  登录注册
    {
      path: '/loginAndRegister',
      component: resolve => require(['@/components/loginAndRegister/background'], resolve),
      children: [{
        path: 'EloginOfMall',
        name: 'EloginOfMall',
        component: resolve => require(['@/views/loginAndRegister/ELoginOfMall'], resolve)
      },
      {
        path: 'ELoginOfEmail',
        component: resolve => require(['@/views/loginAndRegister/ELoginOfEmail'], resolve)
      },
      {
        path: 'ELoginOfPassword',
        component: resolve => require(['@/views/loginAndRegister/ELoginOfPassword'], resolve)
      },
      {
        path: 'loginOfRecent',
        component: resolve => require(['@/views/loginAndRegister/loginOfRecent'], resolve)
      },
      {
        path: 'ARegisterOfIndex',
        name: 'RegisterOfIndex', // ***
        component: resolve => require(['@/views/loginAndRegister/ARegisterOfIndex'], resolve)
      },
      {
        path: 'Alogin',
        name: 'Alogin',
        component: resolve => require(['@/views/loginAndRegister/ALogin'], resolve)
      },
      {
        path: 'forgetEmailPassword',
        name: 'forgetEmailPassword',
        component: resolve => require(['@/views/loginAndRegister/forgetEmailPassword'], resolve)
      },
      {
        path: 'resetEmailPassword',
        name: 'resetEmailPassword',
        component: resolve => require(['@/views/loginAndRegister/resetEmailPassword'], resolve)
      },
      {
        path: 'ALoginOfShops',
        name: 'ALoginShops',
        component: resolve => require(['@/views/loginAndRegister/ALoginOfShops'], resolve)
      },
      {
        path: 'ALoginOfShopPsw',
        name: 'ALoginOfShopPsw',
        component: resolve => require(['@/views/loginAndRegister/ALoginOfShopPsw'], resolve)
      },
      {
        path: 'AnextShopPwd',
        name: 'AnextShopPwd',
        component: resolve => require(['@/views/loginAndRegister/AnextShopPwd'], resolve)
      },
      {
        path: 'forgetShop',
        name: '忘记商店地址',
        component: resolve => require(['@/views/loginAndRegister/forgetShop'], resolve)
      },
      {
        path: 'forgetPassword',
        name: '忘记密码',
        component: resolve => require(['@/views/loginAndRegister/forgetPassword'], resolve)
      },
      {
        path: 'resetPasswords',
        name: '重置密码',
        component: resolve => require(['@/views/loginAndRegister/resetPasswords'], resolve)
      },
      {
        path: 'AregMessage',
        name: 'AregMessage',
        component: resolve => require(['@/views/loginAndRegister/AregMessage'], resolve)
      }
      ]
    },
    // 商家管理
    {
      path: '/administratorPanel',
      component: resolve => require(['@/components/administratorPanel/layout'], resolve),
      children: [{
        path: 'domainInfo',
        component: resolve => require(['@/views/administratorPanel/domainInfo'], resolve)
      },
      // 自定义域名
      {
        path: 'customizeDomain',
        component: resolve => require(['@/views/administratorPanel/customizeDomain'], resolve)
      },
      // 添加域名
      {
        path: 'addDomain',
        component: resolve => require(['@/views/administratorPanel/addDomain'], resolve)
      },
      // home
      {
        path: 'home',
        component: resolve => require(['@/views/administratorPanel/home'], resolve),
        meta: {
          permissions: ['1']
        }
      },
      // 订单管理
      {
        path: 'orderManagement/effectiveOrders',
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/indexofEffectiveOrders'], resolve),
        redirect: 'orderManagement/effectiveOrders/allOrdersTable',
        meta: {
          permissions: ['2']
        },
        children: [{
          path: 'allOrdersTable',
          name: 'allOrdersTable',
          component: resolve => require(['@/components/administratorPanel/orderTable'], resolve),
          meta: {
            permissions: ['2', '3']
          }
        },
        {
          path: 'notPayingTable',
          name: 'notPayingTable',
          component: resolve => require(['@/components/administratorPanel/orderTable'], resolve),
          meta: {
            permissions: ['2', '3']
          }
        },
        {
          path: 'paymentNotDeliveredTable',
          name: 'paymentNotDeliveredTable',
          component: resolve => require(['@/components/administratorPanel/orderTable'], resolve),
          meta: {
            permissions: ['2', '3']
          }
        },
        {
          path: 'paymentAndDeliveredTable',
          name: 'paymentAndDeliveredTable',
          component: resolve => require(['@/components/administratorPanel/orderTable'], resolve),
          meta: {
            permissions: ['2', '3']
          }
        },
        {
          path: 'conditionQueryTable',
          name: 'conditionQueryTable',
          component: resolve => require(['@/components/administratorPanel/orderTable'], resolve),
          meta: {
            permissions: ['2', '3']
          }
        }
        ]
      },
      // 订单管理/2级页面
      {
        path: 'orderManagement/orderDetails',
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/orderDetails'], resolve),
        meta: {
          permissions: ['2', '3']
        }
      },
      {
        path: 'orderManagement/delivery',
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/delivery'], resolve),
        meta: {
          permissions: ['2', '3']
        }
      },
      {
        path: 'orderManagement/refund',
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/refund'], resolve),
        meta: {
          permissions: ['2', '3']
        }
      },
      {
        path: 'orderManagement/rePutInStorage',
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/rePutInStorage'], resolve),
        meta: {
          permissions: ['2', '3']
        }
      },
      {
        path: 'orderManagement/cancelOrders',
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/cancelOrders'], resolve),
        meta: {
          permissions: ['2', '3']
        }
      },
      {
        path: 'orderManagement/printOrder',
        name: 'printOrder',
        meta: {
          permissions: ['10']
        },
        component: resolve => require(['@/views/administratorPanel/orderManagement/effectiveOrders/printOrder'], resolve)
      },
      // 订单/弃单
      {
        path: 'orderManagement/abandonedOrders',
        component: resolve => require(['@/views/administratorPanel/orderManagement/abandonedOrders/indexofAbandonedOrders'], resolve),
        children: [{
          path: 'abandonedAllOrdersTable',
          component: resolve => require(['@/components/administratorPanel/orderTable'], resolve)
        }]
      },
      {
        path: 'orderManagement/abandonedOrderDetails',
        component: resolve => require(['@/views/administratorPanel/orderManagement/abandonedOrders/orderDetails'], resolve)
      },
      // 折扣首页
      {
        path: 'indexOfDiscount',
        component: resolve => require(['@/views/administratorPanel/discount/indexOfDiscount'], resolve),
        redirect: {
          path: 'indexOfDiscount/discountCode',
          query: {
            'status': 'all'
          }
        },
        meta: {
          permissions: ['8']
        },
        children: [{
          path: 'discountCode',
          name: 'discountCode',
          component: resolve => require(['@/components/administratorPanel/discount/discountTable'], resolve),
          meta: {
            permissions: ['8']
          }
        },
        {
          path: 'automaticDiscount',
          name: 'automaticDiscount',
          component: resolve => require(['@/components/administratorPanel/discount/discountTable'], resolve),
          meta: {
            permissions: ['8']
          }
        }
        ]
      },
      // 折扣二级页面
      {
        path: 'discount/discountCode',
        component: resolve => require(['@/views/administratorPanel/discount/discountCode'], resolve),
        meta: {
          permissions: ['8']
        }
      },
      {
        path: 'discount/automaticDiscount',
        component: resolve => require(['@/views/administratorPanel/discount/automaticDiscount'], resolve),
        meta: {
          permissions: ['8']
        }
      },
      // 产品
      {
        path: 'productInventory/addShop',
        meta: {
          permissions: ['4', '5']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/addShop'], resolve)
      },
      {
        path: 'productInventory/inventory',
        meta: {
          permissions: ['4', '6']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/inventory'], resolve)
      },
      {
        path: 'productInventory/allProducts',
        meta: {
          permissions: ['4', '5']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/allProducts'], resolve)
      },
      {
        path: 'productInventory/allProducts/multiattributeDetail',
        meta: {
          permissions: ['4', '5'] //
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/multiattributeDetail'], resolve)
      },
      {
        path: 'productInventory/inventory/multiattributeDetail',
        meta: {
          permissions: ['4', '6'] //
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/multiattributeDetail'], resolve)
      },
      {
        path: 'productInventory/allProducts/productDetails',
        meta: {
          permissions: ['4', '5'] //
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/productDetails'], resolve)
      },
      {
        path: 'productInventory/inventory/productDetails',
        meta: {
          permissions: ['4', '6'] //
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/productDetails'], resolve)
      },
      {
        path: 'productInventory/productLine',
        meta: {
          permissions: ['4', '7']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/productLine'], resolve)
      },
      {
        path: 'productInventory/addProductLine',
        meta: {
          permissions: ['4', '7']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/addProductLine'], resolve)
      },
      {
        path: 'productInventory/productLineDetail',
        meta: {
          permissions: ['4', '7']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/productLineDetail'], resolve)
      },
      {
        path: '/bulkEdit',
        meta: {
          permissions: ['4', '5']
        },
        component: resolve => require(['@/views/administratorPanel/productInventory/bulkEdit'], resolve)
      },
      // 设置
      {
        path: 'settings/set',
        name: 'set',
        meta: {
          permissions: ['10']
        },
        component: resolve => require(['@/views/administratorPanel/settings/set'], resolve)
      },
      {
        path: 'settings/slideshow',
        name: 'slideshow',
        meta: {
          permissions: ['10']
        },
        component: resolve => require(['@/views/administratorPanel/settings/slideshow'], resolve)
      },
      {
        path: '/settings/setDetail',
        name: 'setDetail',
        meta: {
          permissions: ['10', '11']
        },
        component: resolve => require(['@/views/administratorPanel/settings/setDetail'], resolve)
      },
      {
        path: '/settings/addSet',
        name: 'addSet',
        meta: {
          permissions: ['10', '11']
        },
        component: resolve => require(['@/views/administratorPanel/settings/addSet'], resolve)
      },
      {
        path: '/settings/userControl',
        name: 'userControl',
        meta: {
          permissions: ['10', '12']
        },
        component: resolve => require(['@/views/administratorPanel/settings/userControl'], resolve)
      },
      {
        path: '/settings/ordersStatistics',
        name: 'ordersStatistics',
        meta: {
          permissions: ['10', '12']
        },
        component: resolve => require(['@/views/administratorPanel/settings/ordersStatistics'], resolve)
      },
      {
        path: '/settings/addUser',
        name: 'addUser',
        meta: {
          permissions: ['10', '12']
        },
        component: resolve => require(['@/views/administratorPanel/settings/addUser'], resolve)
      },
      {
        path: '/settings/staffDetail',
        name: 'staffDetail',
        meta: {
          permissions: ['10', '12']
        },
        component: resolve => require(['@/views/administratorPanel/settings/staffDetail'], resolve)
      },
      {
        path: '/settings/userDetail',
        name: 'userDetail',
        meta: {
          permissions: ['10', '12']
        },
        component: resolve => require(['@/views/administratorPanel/settings/userDetail'], resolve)
      },
      {
        path: 'settings/transport/shipping',
        component: resolve => require(['@/views/administratorPanel/settings/transport/shipping'], resolve)
      },
      {
        path: 'settings/transport/createTransportData',
        component: resolve => require(['@/views/administratorPanel/settings/transport/createTransportData'], resolve)
      },
      {
        path: 'settings/transport/managementFeeRate',
        component: resolve => require(['@/views/administratorPanel/settings/transport/managementFeeRate'], resolve)
      },
      //  在线商店
      {
        path: '/administratorPanel/optionalModule',
        component: resolve => require(['@/views/administratorPanel/onlineStore/optionalModule'], resolve)
      },
      // 没有权限
      {
        path: '/noPermission',
        component: resolve => require(['@/views/abnormalPage/noPermission'], resolve)
      }
      ]
    },
    //  模板
    {
      path: '/templateOne',
      component: () => import('@/views/administratorPanel/onlineStore/templateOne')
    },
    {
      path: '/templateTwo',
      component: () => import('@/views/administratorPanel/onlineStore/templateTwo')
    },
    {
      path: '/templateThree',
      component: () => import('@/views/administratorPanel/onlineStore/templateThree')
    },
    {
      path: '/templateFour',
      component: () => import('@/views/administratorPanel/onlineStore/templateFour')
    },
    {
      path: '/templateFive',
      redirect: '/templateFiveContent',
      component: resolve => require(['@/components/template/templateFiveLayout'], resolve),
      children: [{
        path: '/templateFiveContent',
        name: 'templateFiveContent',
        component: resolve => require(['@/views/administratorPanel/onlineStore/templateFiveContent/index'], resolve)
      },
      {
        path: '/shopTrolley',
        name: 'shopTrolleyFive',
        component: resolve => require(['@/components/template/shopTrolley'], resolve)
      },
      {
        path: '/submitOrder',
        name: 'submitOrderFive',
        component: resolve => require(['@/components/template/submitOrder'], resolve)
      },
      {
        path: '/allSeriesOfProductList',
        name: 'allSeriesOfProductList',
        component: resolve => require(['@/components/template/allSeriesOfProductList'], resolve)
      },
      {
        path: '/productDetails',
        name: 'productDetails',
        component: resolve => require(['@/components/template/productDetails'], resolve)
      },
      {
        path: '/seriesOfCatalog',
        name: 'seriesOfCatalog',
        component: resolve => require(['@/components/template/catalog'], resolve)
      },
      {
        path: '/searchCatalog',
        name: 'searchCatalog',
        component: resolve => require(['@/components/template/catalog'], resolve)
      },
      {
        path: '/catalog',
        name: 'catalog',
        component: resolve => require(['@/components/template/catalog'], resolve)
      },
      {
        path: '/subSuccessfullyFive/:id',
        name: 'subSuccessfullyFive',
        component: resolve => require(['@/components/template/subSuccessfully'], resolve)
      }
      ]
    },
    {
      path: '/templateSix',
      redirect: '/templateSixContent',
      name: '模板6',
      component: () => import('@/views/administratorPanel/onlineStore/templateSix'),
      children: [{
        path: '/templateSixContent',
        component: () => import('@/components/template/templateSixContent/index')
      },
      {
        path: '/shopDetailsSix/:id',
        name: 'shopDetailsSix',
        component: () => import('@/components/template/productDetails')
      },
      {
        path: '/shopTrolleySix/:id',
        name: 'shopTrolleySix',
        component: () => import('@/components/template/shopTrolley')
      },
      {
        path: '/submitOrderSix/:id',
        name: 'submitOrderSix',
        component: () => import('@/components/template/submitOrder')
      },
      {
        path: '/shopProductSix/:id',
        name: 'shopProductSix',
        component: () => import('@/components/template/catalog')
      },
      {
        path: '/subSuccessfullySix/:id',
        name: 'subSuccessfullySix',
        component: resolve => require(['@/components/template/subSuccessfully'], resolve)
      }
      ]
    },
    {
      path: '/templateSeven',
      redirect: '/templateSevenContent',
      name: '模板7',
      component: () => import('@/views/administratorPanel/onlineStore/templateSeven'),
      children: [{
        path: '/templateSevenContent',
        component: () => import('@/components/template/templateSevenContent/index')
      },
      {
        path: '/shopDetailsSeven/:id',
        name: 'shopDetailsSeven',
        component: () => import('@/components/template/productDetails')
      },
      {
        path: '/shopTrolleySeven/:id',
        name: 'shopTrolleySeven',
        component: () => import('@/components/template/shopTrolley')
      },
      {
        path: '/submitOrderSeven/:id',
        name: 'submitOrderSeven',
        component: () => import('@/components/template/submitOrder')
      },
      {
        path: '/shopProductSeven/:id',
        name: 'shopProductSeven',
        component: () => import('@/components/template/catalog')
      },
      {
        path: '/subSuccessfullySeven/:id',
        name: 'subSuccessfullySeven',
        component: resolve => require(['@/components/template/subSuccessfully'], resolve)
      }
      ]
    },
    {
      path: '/templateEight',
      name: 'templateEight',
      redirect: '/templateEightContent',
      component: () => import('@/views/administratorPanel/onlineStore/templateEight'),
      children: [{
        path: '/templateEightContent',
        component: () => import('@/components/template/templateEightContent/index')
      },
      {
        path: '/shopDetailsEight/:id',
        name: 'shopDetailsEight',
        component: () => import('@/components/template/productDetails')
      },
      {
        path: '/shopTrolleyEight/:id',
        name: 'shopTrolleyEight',
        component: () => import('@/components/template/shopTrolley')
      },
      {
        path: '/submitOrderEight/:id',
        name: 'submitOrderEight',
        component: () => import('@/components/template/submitOrder')
      },
      {
        path: '/shopProductEight/:id',
        name: 'shopProductEight',
        component: () => import('@/components/template/catalog')
      },
      {
        path: '/subSuccessfullyEight/:id',
        name: 'subSuccessfullyEight',
        component: resolve => require(['@/components/template/subSuccessfully'], resolve)
      }
      ]
    },
    // 简化模板第三套
    {
      path: '/simplifyThree',
      redirect: '/simplifyThreeContent',
      component: () => import('@/views/administratorPanel/onlineStore/simplifyThree'),
      children: [
        {
          path: '/simplifyThreeContent',
          component: resolve => require(['@/components/template/simplifyThreeContent/index'], resolve)
        },
        {
          path: '/shopDetailsThree/:id',
          component: resolve => require(['@/components/template/productDetails'], resolve)
        },
        {
          path: '/shopTrolleyThree/:id',
          component: resolve => require(['@/components/template/shopTrolley'], resolve)
        },
        {
          path: '/submitOrderThree/:id',
          component: resolve => require(['@/components/template/submitOrder'], resolve)
        },
        {
          path: '/shopProductThree/:id',
          component: resolve => require(['@/components/template/catalog'], resolve)
        },
        {
          path: '/subSuccessfullyThree/:id',
          component: resolve => require(['@/components/template/subSuccessfully'], resolve)
        },
        {
          path: '/listDetailsThree/:id',
          component: resolve => require(['@/components/template/seriesOfProductList'], resolve)
        }
      ]
    },
    // 简化模板第四套
    {
      path: '/simplifyFour',
      redirect: '/simplifyFourContent',
      component: () => import('@/views/administratorPanel/onlineStore/simplifyFour'),
      children: [
        {
          path: '/simplifyFourContent',
          name: 'simplifyFourContent',
          component: resolve => require(['@/components/template/simplifyFourContent/index'], resolve)
        },
        {
          path: '/shopDetailsFour/:id',
          name: 'shopDetailsFour',
          component: resolve => require(['@/components/template/productDetails'], resolve)
        },
        {
          path: '/shopTrolleyFour/:id',
          name: 'shopTrolleyFour',
          component: resolve => require(['@/components/template/shopTrolley'], resolve)
        },
        {
          path: '/submitOrderFour/:id',
          name: 'submitOrderFour',
          component: resolve => require(['@/components/template/submitOrder'], resolve)
        },
        {
          path: '/shopProductFour/:id',
          name: 'shopProductFour',
          component: resolve => require(['@/components/template/catalog'], resolve)
        },
        {
          path: '/subSuccessfullyThree/:id',
          name: 'subSuccessfullyThree',
          component: resolve => require(['@/components/template/subSuccessfully'], resolve)
        },
        {
          path: '/listDetailsFour/:id',
          name: 'listDetailsFour',
          component: resolve => require(['@/components/template/seriesOfProductList'], resolve)
        }
      ]
    },
    // 简化模板第一套
    {
      path: '/simplifyOne',
      redirect: '/simplifyOneContent',
      component: () => import('@/views/administratorPanel/onlineStore/simplifyOne'),
      children: [{
        path: '/simplifyOneContent',
        component: resolve => require(['@/components/template/simplifyOneContent/index'], resolve)
      },
      {
        path: '/shopDetailsOne/:id',
        name: 'shopDetailsOne',
        component: resolve => require(['@/components/template/productDetails'], resolve)
      },
      {
        path: '/shopTrolleyOne/:id',
        component: resolve => require(['@/components/template/shopTrolley'], resolve)
      },
      {
        path: '/submitOrderOne/:id',
        component: resolve => require(['@/components/template/submitOrder'], resolve)
      },
      {
        path: '/shopProductOne/:id',
        component: resolve => require(['@/components/template/catalog'], resolve)
      },
      {
        path: '/subSuccessfullyOne/:id',
        component: resolve => require(['@/components/template/subSuccessfully'], resolve)
      },
      {
        path: '/listDetailsOne/:id',
        component: resolve => require(['@/components/template/seriesOfProductList'], resolve)
      }
      ]
    },
    {
      path: '/settings/inviteUser',
      name: 'inviteUser',
      component: resolve => require(['@/views/administratorPanel/settings/inviteUser'], resolve)
    },
    // 首页
    {
      path: '/dashbord',
      name: 'dashbord',
      component: resolve => require(['@/views/dashbord'], resolve)
    },
    {
      path: '/helpCenter',
      component: () => import('@/views/helpCenter'),
      children: [
        {
          path: 'help/helpRegister',
          name: 'helpRegister',
          component: () => import('@/views/help/helpRegister')
        },
        {
          path: 'help/helpLogin',
          name: 'helpLogin',
          component: () => import('@/views/help/helpLogin')
        },
        {
          path: 'help/helpHome',
          name: 'helpHome',
          component: () => import('@/views/help/helpHome')
        },
        {
          path: 'help/helpOrder',
          name: 'helpOrder',
          component: () => import('@/views/help/helpOrder')
        },
        {
          path: 'help/helpProduct',
          name: 'helpProduct',
          component: () => import('@/views/help/helpProduct')
        },
        {
          path: 'help/helpDiscount',
          name: 'helpDiscount',
          component: () => import('@/views/help/helpDiscount')
        },
        {
          path: 'help/helpOnlineStore',
          name: 'helpOnlineStore',
          component: () => import('@/views/help/helpOnlineStore')
        },
        {
          path: 'help/helpSetting',
          name: 'helpSetting',
          component: () => import('@/views/help/helpSetting')
        }
      ]
    },
    // 自定义模板
    {
      path: '/administratorPanel/themes',
      component: resolve => require(['@/views/administratorPanel/themes/themes'], resolve)
    },
    {
      path: '',
      redirect: '/dashbord'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

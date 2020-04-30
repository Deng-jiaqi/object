export const lang = {
  loginOfMall: { // 登录商店名称的数据
    text: {
      title: 'Manager',
      href: '/loginAndRegister/Alogin'
    },
    text1: 'Employees Login',
    text2: 'Store Name',
    text3: {
      title: 'Registered Store',
      href: '/loginAndRegister/ARegisterOfIndex'
    },
    text4: {
      title: 'Forget about the store',
      href: '/loginAndRegister/forgetShop'
    },
    text5: 'Next',
    text6: 'The name of the store is 1-20 characters'
  },
  loginOfEmail: { // 登录商店邮箱的数据
    text1: 'Login',
    text2: 'Email',
    text3: {
      title: 'Log in to another store',
      href: '/loginAndRegister/ELoginOfMall'
    },
    text4: 'Next',
    text5: 'The mailbox format is incorrect',
    text6: 'Logging in '
  },
  loginOfPassword: { // 登录password的数据
    text1: 'Login',
    text2: 'Logging in ',
    text3: 'Password',
    text4: {
      title: 'Forget the password',
      href: '/loginAndRegister/forgetPassword'
    },
    text5: 'Login',
    text6: 'The password consists of 6-20 digits and letters'
  },
  loginOfRecent: { // 登录-最近访问的商店的数据
    text1: 'Cancellation',
    text2: 'Shops recently visited',
    text3: {
      title: 'Login to another store',
      href1: '/loginAndRegister/ELoginOfMall',
      href2: '/loginAndRegister/ALogin'
    }
  },
  registerOfIndex: { // 注册首页的数据
    text1: 'Free trial at present',
    text2: 'Email address',
    text3: 'Password',
    text4: 'Your store name',
    text5: 'Next',
    text6: {
      title: 'back',
      href: '/loginAndRegister/ELoginOfMall'
    },
    text8: 'The mailbox format is incorrect',
    text9: 'The password consists of 6-20 digits and letters',
    text10: 'Store name cannot be empty'
  },
  ALogin: { // 登录---管理员登录
    text1: 'Manager Login',
    text2: 'Please enter email and password',
    text3: 'Email',
    text4: 'Password',
    text5: 'Next',
    text6: {
      title: 'Employees',
      href: '/loginAndRegister/ELoginOfMall'
    },
    text7: 'Incorrect mailbox format',
    text8: 'The password consists of 6-20 digits and letters'
  },
  ALoginOfShops: { // 登录-- 管理员all的商店
    text1: {
      title: 'Return Home',
      href: '/loginAndRegister/ALogin'
    },
    text2: 'My shops',
    text3: {
      title: 'Login to another email address',
      href: '/loginAndRegister/ALogin'
    }
  },
  ALoginOfshopPsw: { // 登录-- 管理员登录输入店铺password
    text1: 'Login',
    text2: 'Store Password',
    text3: 'Login',
    text4: {
      title: 'back',
      href: '/loginAndRegister/ALoginOfShops'
    },
    text5: 'The password consists of 6-20 digits and letters'
  },
  administratorPanelLayout: { // 管理员控制面板-layout
    text1: 'EDGEMARKET',
    text2: 'Log out',
    one: {
      title: 'Home',
      href: '/administratorPanel/home'
    },
    two: {
      title: 'The order management',
      child: {
        one: {
          title: 'Effective order',
          href: '/administratorPanel/orderManagement/effectiveOrders/allOrdersTable'
        },
        two: {
          title: 'Abandon order',
          href: '/administratorPanel/orderManagement/abandonedOrders/abandonedAllOrdersTable'
        }
      }
    },
    three: {
      title: 'Product',
      child: {
        one: {
          title: 'All the products',
          href: '/administratorPanel/productInventory/allProducts'
        },
        two: {
          title: 'Inventory',
          href: '/administratorPanel/productInventory/inventory'
        },
        three: {
          title: 'Product series',
          href: '/administratorPanel/productInventory/productLine'
        }
      }
    },
    four: {
      title: 'Discount',
      href: '/administratorPanel/indexOfDiscount/discountCode'
    },
    five: {
      title: 'The online store',
      href: '/optionalModule'
    },
    six: {
      title: 'Set up',
      href: '/administratorPanel/settings/set'
    }
  },
  home: { // home页
    text1: 'Welcome to the endless mall!',
    text2: 'Add product',
    text3: 'Custom template',
    text4: 'Add a domain name',
    text5: 'You have added a new product',
    text6: 'You can add more products, or continue to see other tips in this card.',
    text7: 'Add other products'
  },
  domainInfo: { // 域名信息
    text1: 'Field',
    text2: 'back',
    text3: 'Main domain name:',
    text4: 'Domain name:',
    text5: 'State:',
    text6: 'Add Date:',
    text7: {
      title: 'Custom domain name',
      href: '/administratorPanel/customizeDomain'
    },
    text8: 'delete',
    text9: 'deprecated',
    text10: 'normal'
  },
  customizeDomain: { // 自定义域名
    text1: 'Custom domain name',
    text2: 'back',
    text3: 'Field',
    text4: 'e.g.example.com',
    text5: 'determine'
  },
  indexofEffectiveOrders: { // 有效订单首页
    text1: 'order',
    text2: 'back',
    text4: 'Filter orders (you can search order number, customer name, total amount)',
    text3: [{
      title: 'All orders',
      href: '/administratorPanel/orderManagement/effectiveOrders/allOrdersTable',
      forActive: 'allOrdersTable'
    },
    {
      title: 'Unpaid order',
      href: '/administratorPanel/orderManagement/effectiveOrders/notPayingTable',
      forActive: 'notPayingTable'
    },
    {
      title: 'Orders paid but not shipped',
      href: '/administratorPanel/orderManagement/effectiveOrders/paymentNotDeliveredTable',
      forActive: 'paymentNotDeliveredTable'
    },
    {
      title: 'Paid and shipped orders',
      href: '/administratorPanel/orderManagement/effectiveOrders/paymentAndDeliveredTable',
      forActive: 'paymentAndDeliveredTable'
    }
    ],
    text5: 'condition query',
    text6: 'operation',
    text7: 'delivery order',
    text8: 'money to pay',
    text9: 'Payment status',
    text10: 'Did not pay',
    text11: 'paid',
    text12: 'cancelled',
    text13: 'refunded',
    text14: 'Part of the payment',
    text15: 'Part of the refund',
    text16: 'Delivery status',
    text17: 'Not to deliver goods',
    text18: 'shipped',
    text19: 'Part shipped',
    table: { // 所有订单的表格
      text1: 'Serial number',
      text2: 'The date of',
      text3: 'The customer',
      text4: 'The total amount',
      text5: 'Payment status',
      text6: 'Transaction status',
      text7: 'comment',
      text8: 'Temporarily no data'
    }
  },
  indexofAbandonOrder: { // 弃单首页
    text1: 'Abandon order',
    text11: [{
      title: 'All orders',
      href: '/administratorPanel/orderManagement/abandonedOrders/abandonedAllOrdersTable',
      forActive: 'abandonedAllOrdersTable'
    }],
    text2: 'Search order',
    text3: 'filter',
    text4: 'Restore the state',
    text5: 'Not recovered',
    text6: 'had recovered',
    text7: 'E-mail status',
    text8: 'Sent',
    text9: 'unsent'
  },
  orderDetails: { // 订单详情
    text1: 'order',
    text2: 'Print the order',
    text3: 'refund',
    text4: 'reput in storage',
    text5: 'Other operating',
    text6: 'Cancel the order',
    text7: 'back',
    text8: 'Mark as shipped',
    text9: 'more',
    text10: 'Cancel delivery',
    text11: 'Edit trace information',
    text12: 'Edit tracking',
    text13: 'The awb',
    text14: 'The mode of transportation',
    text15: 'Choose express',
    text16: 'Send notification emails to customers',
    text17: 'cancel',
    text18: 'save',
    text19: 'number',
    text20: 'distribution',
    text21: 'Taxes and fees',
    text22: 'price',
    text23: 'total',
    text24: '(Customer payment)',
    text25: 'Net spending',
    refundAmount: 'refundAmount',
    refundReason: 'refundReason',
    text26: 'discount',
    text27: 'comment',
    text28: 'editor',
    text29: 'No comments for the moment',
    text30: 'add comment',
    text31: 'comment',
    text32: 'comment',
    text33: 'cancel',
    text59: 'determine',
    text34: 'customer',
    text35: 'Contact information',
    text36: 'editor',
    text37: 'Edit contact information',
    text38: 'Email address',
    text39: 'The phone number',
    text40: 'cancel',
    text41: 'save',
    text42: 'Shipping address',
    text43: 'editor',
    text44: 'Edit shipping address',
    text45: 'name',
    text46: 'last name',
    text47: 'company',
    text48: 'phone number',
    text49: 'adress',
    text51: 'Country/region',
    text52: 'Province (state)',
    text53: 'city',
    text54: 'Zip/zip code',
    text55: 'cancel',
    text56: 'save',
    text57: 'schedule',
    text58: 'Resend the email'
  },
  refund: { // 退款
    text1: 'refund',
    text2: 'back',
    text3: 'Restock',
    text4: 'piece',
    text5: 'Refunded freight:',
    text6: 'freight',
    text7: 'The refund amount',
    text8: 'The refund reason',
    text9: 'Abstract',
    text10: 'Product subtotal',
    text11: 'item',
    text12: 'Taxes and fees',
    text13: 'freight',
    text14: 'The total amount of the refund',
    text15: 'The refund amount',
    text16: 'Can be refund amount: ',
    text17: 'Email notification',
    text18: 'refund',
    text19: 'reput in storage',
    text20: 'piece',
    text21: 'please select',
    text22: 'discountcode',
    text23: 'deduction'
  },
  cancelOrder: { // 取消订单
    text1: 'order',
    text2: 'back',
    text3: 'Total amount of selected product',
    text4: 'The freight',
    text5: 'The remaining',
    text6: 'Taxes and fees',
    text7: 'Can be refund amount',
    text8: 'The total amount of the refund',
    text9: 'use',
    text10: 'refund',
    text11: 'Restock goods',
    text12: 'The number of products requested for this order will be restocked into your store.',
    text13: 'Reasons for cancellation',
    text14: 'Notify the customer by mail',
    text15: 'Keep the order',
    text16: 'cancel the order'
  },
  reputInStorage: { // 重新入库
    text1: 'Reput in storage',
    text2: 'back',
    text3: 'Reput in storage',
    text4: 'item',
    text5: 'Reason for order cancellation',
    text6: 'Authorized amount',
    text7: 'Has not yet been booked',
    text8: 'Goods that have been restocked will not be shipped again.',
    text10: 'Restock goods',
    text11: 'replenishment',
    text12: 'item',
    text13: 'please select'
  },
  delivery: { // 发货
    text1: 'order',
    text2: 'back',
    text3: 'Manual delivery',
    text4: 'goods',
    text5: 'weight',
    text6: 'number',
    text7: 'Choose express',
    text8: 'Choose express',
    text9: 'The awb',
    text10: 'Email notification',
    text11: 'Shipping address',
    text12: 'edit',
    text13: 'Edit shipping address',
    text14: 'The delivery address',
    text15: 'Determine delivery',
    text16: 'The goods are not available in this warehouse'
  },
  indexOfDiscount: { // 折扣首页
    text1: 'discount',
    text2: 'create discount',
    text3: [
      {
        href: '/administratorPanel/indexOfDiscount/discountCode',
        title: 'discount code',
        forActive: 'discountCode'
      },
      {
        href: '/administratorPanel/indexOfDiscount/automaticDiscount',
        title: 'Automatic discount',
        forActive: 'automaticDiscount'
      }
    ],
    text4: [
      {
        status: 'all',
        title: 'all'
      },
      {
        status: 'active',
        title: 'active'
      },
      {
        status: 'haveArranged',
        title: 'haveArranged'
      },
      {
        status: 'expired',
        title: 'expired'
      }
    ],
    search: 'Custom search',
    text5: 'search discountcode',
    text6: 'Create discount',
    text7: 'discountcode',
    text8: 'Customers enter a code at checkout to get a discount',
    text9: 'Automatic discount',
    text10: 'Customers will automatically receive discounts in the shopping cart',
    text11: 'Customers cannot combine multiple discounts at checkout.',
    text12: 'Enable discount code',
    text13: 'Disable discount code',
    text14: 'delete discount code',
    text15: 'operation',
    text16: 'cancel',
    text17: 'determine',
    text18: 'Enable the selected discount code?',
    text19: 'These discount codes will now be enabled.',
    text20: 'Disable the selected discount code?',
    text21: 'These discount codes will now expire.',
    text22: 'Delete the selected discount code?',
    text23: 'This operation cannot be undone.',
    text24: 'disable',
    text25: 'enable',
    text26: 'Have been used',
    text27: 'times'
  },
  discountcode: { // 折扣
    enable: 'enable',
    disable: 'disable',
    text1: 'Create discount code',
    text2: 'back',
    text3: 'discountcode',
    text4: 'generating code',
    text5: 'The customer will enter the discount code at checkout',
    text6: 'type',
    text7: 'percentage',
    text8: 'Fixed amount',
    text9: 'Free shipping',
    text10: 'Buy x get y free',
    text11: 'value',
    text12: 'discount',
    text13: 'Apply to',
    text14: 'The whole order',
    text15: 'specific product',
    text18: 'seriesof specificproduct',
    text17: 'browse',
    text19: 'Minimum requirements',
    text20: 'none',
    text21: 'Minimum purchase amount',
    text22: 'Apply only to selected product lines',
    text23: 'Minimum quantity of goods',
    text24: 'Apply only to selected product lines.',
    text25: 'Only one discount will be used per order',
    text26: 'If not selected, the discount will apply to each eligible product in the order.',
    text27: 'Customer qualification',
    text28: 'All the people',
    text29: 'Use restrictions',
    text30: 'Limit the total number of times the discount can be used',
    text31: 'Each customer can only use it once',
    text32: 'Effective date',
    text33: 'Start date',
    text34: 'Start time',
    text35: 'Set end date',
    text36: 'End date',
    text37: 'End time',
    text38: 'cancel',
    text39: 'Save discount code',
    text40: 'delete',
    text41: 'Select a date',
    text42: 'Select a time',
    text43: 'delete',
    text44: 'Are you sure to delete this discount code?',
    text45: 'cancel',
    text46: 'delete',
    text47: 'Country/region',
    text48: 'All Country/region',
    text49: 'Specific Country/region',
    text50: 'freight',
    text51: 'Exclude freight charges in excess of a specified amount',
    text52: 'Customers buy',
    text53: 'customer consumption',
    text54: 'Minimum quantity of goods',
    text55: 'Minimum purchase amount',
    text56: 'number',
    text57: 'amount',
    text58: 'Anything here',
    text59: 'please select',
    text60: 'Customers get',
    text61: 'The customer must add the number of items specified below to the shopping cart',
    text62: 'The clients discounts',
    text63: 'percentage',
    text64: 'free',
    text65: 'Set the maximum number of USES per order',
    text66: 'enable',
    text67: 'This discount code will now become enabled and has no end date. All unsaved changes will be lost.',
    text68: 'cancel',
    text69: 'enable ',
    text70: 'disable',
    text71: 'This discount code will now expire and all unsaved changes will be lost.',
    text72: 'cancel',
    text73: 'disable ',
    text74: 'edit',
    text75: 'Add product line',
    text76: 'Search for specific product lines',
    text77: 'No related product series',
    text78: 'cancel',
    text79: 'save',
    text80: 'Add product',
    text81: 'Search for specific products',
    text82: 'piece for sale',
    text83: 'No relevant products at present',
    text84: 'cancel',
    text85: 'save',
    text86: 'Edit multiple properties',
    text87: 'pieces for sale',
    text88: 'cancel',
    text89: 'save',
    text90: 'Has chosen',
    text91: 'multiple properties',
    text92: 'Search for specific countries/regions',
    text93: 'Search for specific countries/regions',
    text94: 'Search for specific countries/regions',
    text95: 'No country',
    text96: 'cancel',
    text97: 'determine',
    text98: 'have selected',
    text99: 'multiple properties'
  },
  autoDiscountcode: { // 自动折扣
    text1: 'Create automatic discounts',
    text2: 'back',
    text3: 'enabled',
    text4: 'disable',
    text5: 'Automatic discount title',
    text6: 'The customer will see this message in the shopping cart and at checkout.',
    text7: 'type',
    text8: 'percentage',
    text9: 'fixed amount',
    text10: 'buys x to get y free',
    text11: 'Customers buy',
    text12: 'Customer consumption',
    text13: 'Minimum quantity of goods',
    text14: 'Minimum purchase amount',
    text15: 'number',
    text16: 'amount',
    text17: 'Anything there',
    text18: 'please select',
    text19: 'specific product',
    text20: 'seriesof specificproduct',
    text21: 'browse',
    text22: 'Customers get',
    text23: 'The customer must add the number of items specified below to the shopping cart',
    text24: 'number',
    text25: 'Anything there',
    text26: 'please select',
    text27: 'Clients discounts',
    text28: 'percentage',
    text29: 'free',
    text30: 'Set the maximum number of USES per order',
    text31: 'Apply to',
    text32: 'The whole order',
    text33: 'specific product',
    text34: 'seriesof specificproduct',
    text35: 'Only one discount will be used per order',
    text36: 'If not selected, the discount will apply to each eligible product in the order.',
    text37: 'Minimum requirements',
    text38: 'Minimum purchase amount',
    text39: 'Apply only to selected product lines.',
    text40: 'Minimum quantity of goods',
    text41: 'Apply only to selected product lines.',
    text42: 'Effective date',
    text43: 'Start date',
    text44: 'Start time',
    text45: 'Set end date',
    text46: 'Select a date',
    text47: 'Select a time',
    text48: 'It cannot be combined with other discounts',
    text49: 'If the discount has been applied at checkout, the customer will not be able to enter the code',
    text50: 'value',
    text51: 'deduction',
    text52: 'delete',
    text53: 'cancel',
    text54: 'Save discount code',
    text55: 'disable',
    text56: 'This discount code will now expire and all unsaved changes will be lost.',
    text57: 'cancel',
    text58: 'disable',
    text59: 'enable',
    text60: 'This discount code will now become enabled and has no end date. All unsaved changes will be lost.',
    text61: 'cancel',
    text62: 'enable',
    text63: 'delete',
    text64: 'Are you sure to delete this discount code?',
    text65: 'cancel',
    text66: 'delete'
  },
  registerPwd: { // 注册输入店铺密码
    title: 'Free trial at present',
    inputTishi: 'Store Password',
    btn: 'Next',
    back: 'back',
    hint: {
      text1: 'The password cannot be empty',
      text2: 'Passwords larger than 6 digits, at least composed of letters and Numbers, support other special characters, do not support Spaces'
    }
  },
  forShop: { // 忘记商店地址
    title: 'Forget store address',
    text: 'Enter your email address',
    inputTishi: 'Email',
    btn: 'Next',
    back: 'back',
    hint: {
      text1: 'Mailbox cannot be empty',
      text2: 'Incorrect mailbox format',
      text3: 'Email sent successfully',
      text4: 'Email delivery failed. Please try again'
    }
  },
  forPwd: { // 忘记密码
    title: 'Forget your password',
    text: 'Enter your email address',
    inputTishi: 'Email',
    btn: 'Next',
    back: 'back',
    hint: {
      text1: 'Mailbox cannot be empty',
      text2: 'Incorrect mailbox format',
      text3: 'Email sent successfully',
      text4: 'The mailbox does not match the store name, please enter again'
    }
  },
  restPwd: { // reset passwords
    title: 'Reset password',
    text1: 'New password',
    text2: 'The password should be no less than 5 characters, with no space',
    text3: 'Confirm password',
    btn: 'Reset password',
    back: 'back',
    hint: {
      text1: 'Please enter a new password',
      text2: 'Passwords larger than 6 digits, at least composed of letters and Numbers, support other special characters, do not support Spaces',
      text3: 'The second password input is inconsistent, please re-enter',
      text4: 'Password reset successful, wait 3S will return to continue login page',
      text5: 'Password reset failed. Please try again'
    }
  },
  regMessage: { // 注册信息
    title: 'Please fill in your personal information.',
    text: 'This will be used as your default business address',
    FirstName: ' First  Name',
    LastName: 'Last Name',
    name: 'name',
    Address: 'Address',
    Apartment: 'Apartment, suite, etc.(optional)',
    City: 'City',
    ZIP: 'ZIP/Postal code',
    Country: 'Country/Region',
    province: 'province/state',
    PhoneNumber: 'Phone number',
    Business: 'Business or personal website (optional)',
    btn: 'Enter my store',
    back: 'back',
    hint: {
      text1: 'Registration successful, about to enter the store, please wait...',
      text2: 'fail to register'
    },
    label1: 'name',
    label2: 'site',
    label3: 'Apartment, suite, room number, etc. (optional)',
    label4: 'city',
    label5: 'postal code',
    label6: 'Country/region',
    label7: 'Province (state)',
    label8: 'telephone number',
    label9: 'Business or personal website (optional)'
  },
  templete: {
    templeteFive: {
      btn1: 'Add to Cart',
      btn2: 'Buy It Now',
      header: {
        text1: 'MALL',
        text2: 'Search all products…',
        text3: 'CART',
        text4: [{
          title: 'HOME',
          href: '/templateFiveContent'
        },
        {
          title: 'CATALOG',
          href: '/shopProductFive/page5'
        }
        ]
      },
      main: {
        imgs: [{
          'src': require('../../assets/administratorPanel/templateImg/48.png')
        },
        {
          'src': require('../../assets/administratorPanel/templateImg/48.png')
        },
        {
          'src': require('../../assets/administratorPanel/templateImg/48.png')
        }
        ],
        shopFor: [{
          'src': require('../../assets/administratorPanel/templateImg/198.png'),
          text: 'Featured Collection'
        },
        {
          'src': require('../../assets/administratorPanel/templateImg/252.png'),
          text: 'Featured Collection'
        }
        ],
        featured: [{
          title: 'FEATURED COLLECTION',
          text1: 'More >',
          featuredBox: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          }
          ]
        },
        {
          title: 'FEATURED COLLECTION',
          text1: 'More >',
          featuredBox: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          }
          ]
        },
        {
          title: 'FEATURED COLLECTION',
          text1: 'More >',
          featuredBox: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: 'Example Product Title',
            price: '$19.99'
          }
          ]
        }
        ],
        content1: {
          text1: 'SHOP FOR',
          text2: 'More categories  >',
          text3: 'Featured Collection'
        },
        content2: {
          text1: 'FEATURED COLLECTION',
          text2: 'More  >',
          text3: 'Example Product Title',
          price: '$19.99'
        }
      },
      footer: {
        content1: {
          text1: 'QUICK LINKS',
          text2: 'pick a link list to show here in your Theme Settings under',
          text3: 'Footer',
          text4: '>',
          text5: 'Quick links link list.'
        },
        content2: {
          text1: 'GET IN TOUCH',
          text2: 'Use this text to share information about your brand with your customers.'
        },
        content3: {
          text1: 'NEWSLETTER',
          text2: 'Promotions,new products and sales,Directly to your inbox.',
          input: 'Email Address',
          btn: 'SIGN UP'
        },
        content4: {
          text1: '©2019 mall',
          text2: 'Powered by Shopify'
        }
      }
    },
    templeteSix: {
      header: {
        text1: 'Announce something here',
        text2: [{
          title: 'Home',
          href: '/templateSixContent'
        },
        {
          title: 'Catalog',
          href: '/shopProductSix/page6'
        }
        ],
        text4: 'mall',
        text5: 'Search',
        text6: 'Cart'
      },
      imgData: [{
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: 'Heading goes here1',
        text2: 'Subheading goes here1'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: 'Heading goes here2',
        text2: 'Subheading goes here2'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/50.png'),
        text1: 'Heading goes here3',
        text2: 'Subheading goes here3'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: 'Heading goes here4',
        text2: 'Subheading goes here4'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: 'Heading goes here5',
        text2: 'Subheading goes here5'
      }
      ],
      main: {
        content1: {
          text1: 'Heading or impact text goes here.',
          text2: 'Use this text to share information about your brand with your customers.' +
            'Describe a product, share announcements, or welcome customers to your' +
            'store.'
        },
        content3: {
          text1: 'Heading goes here',
          text2: 'Example Product Title',
          price: '¥19.99'
        },
        box4Data: [{
          text1: 'Example Collection Title',
          text2: 'Use this text to share information about your collection.',
          text3: 'Shop all',
          box4Img: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text1: 'Example Product Title',
            text2: '¥19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/198.png'),
            text1: 'Example Product Title',
            text2: '¥19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/27.png'),
            text1: 'Example Product Title',
            text2: '¥19.99'
          }
          ]
        }],
        content4: {
          text1: 'Example Collection Title',
          text2: 'Use this text to share information about your collection.',
          text3: 'Shop all'
        },
        content5: {
          text1: 'Heading or impact text goes here.',
          text2: 'Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store.',
          text3: 'Example Product Title',
          btn: 'Add to Cart'
        }
      },
      footer: {
        content1: {
          text1: 'Sign up to our',
          text2: 'newsletter',
          text3: 'Receive special offers and first look at new products.',
          input: 'Enter email',
          btn: 'Subscribe'
        },
        content2: {
          text1: 'Instagram',
          text2: 'Use this text to share instagram posts with your customers.'
        },
        content3: {
          text1: 'Visit our store',
          text2: '123 Fake St.',
          text3: 'Toronto, Canada',
          text4: 'Mon - Fri, 10am - 9pm',
          text5: 'Saturday, 11am - 9pm',
          text6: 'Sunday, 11am - 5pm',
          text7: 'View on Google maps'
        },
        content4: {
          text1: 'mall',
          text2: 'Use this to add additional information about your store, e.g.',
          text3: 'address / contact details.',
          text4: 'Home',
          text5: 'Catalog',
          text6: 'Search',
          text7: 'Receive special offers and first look at new products.',
          input: 'Enter email',
          btn: 'Subscribe'
        },
        content5: {
          text1: '©2019 mall',
          text2: 'Powered by Shopify',
          text3: 'Cascade Theme by Switch'
        }
      }
    },
    templeteSeven: {
      header: {
        text1: 'Announce something here',
        text2: [{
          title: 'Home',
          href: '/templateSevenContent'
        },
        {
          title: 'Catalog',
          href: '/shopProductSeven/page7'
        }
        ],
        text4: 'mall',
        text5: 'USD',
        text6: 'Search',
        text7: 'Cart-',
        text8: 'Image with Text Overlay',
        text9: 'Show large text over a featured image'
      },
      main: {
        imgData: [{
          src: require('../../assets/administratorPanel/templateImg/198.png'),
          text1: 'Example Product Title',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/49.png'),
          text1: 'Example Product Title',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/252.png'),
          text1: 'Example Product Title',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/82.png'),
          text1: 'Example Product Title',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/26.png'),
          text1: 'Example Product Title',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/1.png'),
          text1: 'Example Product Title',
          price: '$2.91'
        }
        ],
        mainBox3: [{
          src: require('../../assets/administratorPanel/templateImg/50.png'),
          text1: 'December 25, 2016',
          text2: 'Your post\'s title',
          text3: 'Your store hasn’t published any blog posts yet. A blog can be used to talk\n' +
              '              about new product launches, tips, or other news you want to share with your\n' +
              '              customers. You can check out Shopify’s ecommerce blog for inspiration and\n' +
              '              advice for your own store and blog.'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png'),
          text1: 'December 25, 2016',
          text2: 'Your post\'s title',
          text3: 'Your store hasn’t published any blog posts yet. A blog can be used to talk\n' +
              '              about new product launches, tips, or other news you want to share with your\n' +
              '              customers. You can check out Shopify’s ecommerce blog for inspiration and\n' +
              '              advice for your own store and blog.'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png'),
          text1: 'December 25, 2016',
          text2: 'Your post\'s title',
          text3: 'Your store hasn’t published any blog posts yet. A blog can be used to talk\n' +
              '              about new product launches, tips, or other news you want to share with your\n' +
              '              customers. You can check out Shopify’s ecommerce blog for inspiration and\n' +
              '              advice for your own store and blog.'
        }
        ],
        bo4Logo: [{
          src: require('../../assets/administratorPanel/templateImg/LOGO.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/LOGO.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/LOGO.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/LOGO.png')
        }
        ],
        box6Img: [{
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        }
        ],
        content1: {
          text1: 'Welcome to our store',
          text2: 'Use this text block to show store announcements, advertise prod',
          text3: 'Share brand or product details',
          text4: 'Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.'
        },
        content2: {
          text1: 'Image with Text Overlay',
          text2: 'Show large text over a featured image',
          text3: 'From the blog',
          text4: 'As seen in',
          text5: 'Image with Text Overlay',
          text6: 'Show large text over a featured image'
        },
        content3: {
          text1: 'Instagram',
          text2: 'Free Delivery Worldwide',
          text3: 'Click here for more info',
          text4: 'Final Clearance Sale',
          text5: 'Up to 70% off',
          text6: 'Promotional Link 3',
          text7: 'Link to a collection, product, blog post...',
          text8: 'Join our Mailing List',
          input: 'Enter email'
        }
      },
      footer: {
        text1: 'Contact us',
        text2: 'Share store details, promotions, or brand content with your cus',
        text3: 'Links',
        text4: 'Search',
        text5: 'Newsletter',
        input: 'email@example.com',
        btn: 'Subscribe',
        text7: '© 2019, zengyao1',
        text8: 'Powered by Shopify',
        text9: 'Designed by WeTheme'
      }
    },
    templeteEight: {
      header: {
        text1: 'Search',
        text2: 'Share a shop announcement with customers',
        text3: 'CNY',
        text4: 'Cart',
        text5: [{
          title: 'Home',
          href: '/templateEightContent'
        },
        {
          title: 'Catalog',
          href: '/shopProductEight/page8'
        }
        ],
        text7: 'mall'
      },
      main: {
        box1Data: [{
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png')
        }
        ],
        box1Content3: [{
          src: require('../../assets/administratorPanel/templateImg/198.png'),
          text: 'Sample product',
          price: '$9.99'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/252.png'),
          text: 'Sample product',
          price: '$9.99'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/82.png'),
          text: 'Sample product',
          price: '$9.99'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/27.png'),
          text: 'Sample product',
          price: '$9.99'
        }
        ],
        box5Content: [{
          src: require('../../assets/administratorPanel/templateImg/198.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/49.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/252.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/82.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/26.png')
        },
        {
          src: require('../../assets/administratorPanel/templateImg/27.png')
        }
        ],
        text1: 'Featured Collection',
        imgText: 'Image with Text overlay',
        text2: 'Featured Product',
        text3: 'Your product\'s name',
        text4: 'This area is used to describe your product’s details. Tell customers about the look, feel, and style of your product. Add details on color, materials used, sizing, and where it was made.',
        text5: '9.99',
        text6: '13.99',
        btn: 'Add to Cart',
        text7: 'Subscribe to our newsletter',
        text8: 'Use overlay text to give your customers insight into your brand. Select imagery and text that relates to your style and story.',
        input: 'Email Address',
        btn2: 'Join',
        text9: 'Follow us on Instagram',
        text10: 'Share a special sale or announcement with your customers.'
      },
      footer: {
        text1: 'ABOUT',
        text2: 'Since 2013 Mr Parker has been providing the most',
        text3: 'on point fashion and lifestyle accessories.',
        text4: 'OUR COLLECTIONS',
        text5: 'Search',
        text6: 'EXPLORE',
        text7: 'Home',
        text8: 'Catalog',
        text9: 'CONNECT',
        text10: 'Join our mailing list for updates',
        input: 'Email Address',
        btn: 'Join',
        text11: 'Copyright © 2019 mall • Shopify Theme by Underground • Powered'
      }
    }
  }
}
// =============allproduct
export const product = {
  header: {
    title: 'all products',
    btn: 'Add product',
    search: 'Search products',
    allText: 'all'
  },
  edit: {
    text: 'Edit the product',
    text2: {
      title: 'redact',
      list: [
        { text: 'Product shelves' },
        { text: 'take the product off shelves ' },
        { text: 'Delete selected product' },
        { text: 'Add to product line' },
        { text: 'Remove from product line' }
      ]
    }
  },
  table: {
    thead: {
      th1: 'commodity',
      th2: 'inventory',
      th3: 'type',
      th4: 'supplier'
    },
    tbody: {
      text: 'Multiple attributes of the inventory'
    }
  },
  searchHint: {
    text1: 'Can\'t find any product',
    text2: 'Try changing the filter or search term'
  },
  elDialog: {
    text1: 'A product?',
    place: 'Search collection',
    text2: 'No result found',
    btn1: 'cancel',
    btn2: 'save'
  },
  addHint: {
    text1: 'Add your product',
    text2: 'First sales are made earlier by adding products or importing existing inventory',
    btn: 'Add product'
  },
  hint: {
    text1: 'This action will permanently delete the selected product. Do you want to continue?',
    text2: 'hint',
    text3: 'confirm',
    text4: 'cancel',
    text5: 'undeleted',
    text6: 'Whether to add',
    text7: 'You will add',
    text8: 'Product to product line：',
    text9: 'Make sure to delete',
    text10: 'You will be removed from the product line',
    text11: 'product：'
  }
}
// ==================inventory
export const inventory = {
  header: {
    title: 'inventory',
    btn: 'To view the product',
    search: 'Search the inventory',
    allText: 'all',
    select: {
      placeholder: 'Please select'
    }
  },
  btnSet: [
    {
      text: 'add',
      judge: true
    },
    {
      text: 'set',
      judge: false
    }
  ],
  edit: {
    text: 'Edit multiple attributes',
    text2: {
      title: 'Other operating',
      list: { text1: 'Update the number' }
    }
  },
  table: {
    thead: {
      th1: 'commodity',
      th2: 'introduction',
      th3: 'usable',
      th4: 'Edit available quantity'
    },
    tbody: {
      btn1: 'add',
      btn2: 'set',
      label1: 'Describe the text',
      btn3: 'save'
    }
  },
  elDialog: {
    title: 'Update the number',
    label: 'Describe the text',
    text1: 'Multiple properties will change：',
    btn1: 'cancel',
    btn2: 'save'
  },
  searchHint: {
    text1: 'Can\'t find any product',
    text2: 'Try changing the filter or search term'
  },
  addHint: {
    text1: 'Manage your inventory',
    text2: 'Enable inventory updates for each product to be viewed when inventory levels are low。',
    btn1: 'To view the product'
  }
}
// ========================product line
export const productLine = {
  header: {
    title: 'product line',
    text1: 'all',
    btn1: 'establishProduct line',
    search: 'searchProduct line',
    btn2: 'compile'
  },
  edit: {
    text: 'compileProduct',
    text2: {
      title: 'compile',
      list: [
        { text: 'Product shelves' },
        { text: 'take the product off shelves ' },
        { text: 'Delete selected product' },
        { text: 'add to product line' },
        { text: 'Delete from product line' }
      ]
    }
  },
  table: {
    thead: {
      th1: 'headline',
      th2: 'The product conditions'
    },
    tbody: {
      text: 'not applicable'
    }
  },
  searchHint: {
    text1: 'Can\'t find any product',
    text2: 'Try changing the filter or search term'
  },
  addHint: {
    title: 'product line',
    text1: 'Collate your products into product line',
    text2: 'Product line is the category you create to help your customers find products。',
    btn: 'Create a product line'
  },
  list: [
    { text: 'Provide product line' },
    { text: 'Product line is temporarily suspended' },
    { text: 'Delete the selected product line' }
  ],
  hint: {
    text1: 'The deleted product line could not be recovered. Would you like to continue?',
    text2: 'delete',
    text3: 'Product series',
    btn1: 'confirm',
    btn2: 'cancel',
    btn3: 'successfully delete!',
    btn4: 'undeleted'
  }
}
// ======================Add product
export const addShop = {
  header: {
    title: 'Add product',
    back: 'back'
  },
  shopName: 'product name',
  shopMs: 'product description',
  proImg: {
    shopUp: 'Pictures',
    shopImg: 'Photo',
    content1: 'preview',
    content2: 'delete'
  },
  price: {
    title: 'price',
    text1: 'current',
    text2: 'original',
    text3: 'costPrice',
    text4: 'Expected profit rate：'
  },
  repertory: {
    title: 'inventory',
    text1: 'SKU(model number)',
    text2: 'Barcode (ISBN、UPC、GTIN wait)',
    text3: 'Tracking number',
    text4: 'Continue to sell after out of stock',
    text5: 'num',
    text6: 'compilelocation',
    text7: 'location',
    text8: 'usable'
  },
  transportation: {
    title: 'transport',
    text1: 'needtransport',
    text2: 'weight',
    text3: 'Used to calculate freight charges at checkout。',
    text4: 'weight',
    text5: 'When purchasing this product, customers do not enter their shipping address or select the shipping method。'
  },
  multiAttribute: {
    title: 'Multiple attributes',
    elCheckbox: 'This product has several options, such as different sizes or colors',
    text1: 'The option name',
    text2: 'The option value',
    btn: 'Add other options',
    showText1: 'show',
    showText2: 'property',
    showText3: 'selected',
    showText4: 'one',
    li1: 'compileprice',
    li2: 'compilenum',
    li3: 'compileSKU',
    li4: 'compileBarcode',
    btn2: 'compilemoreproperty',
    text3: 'In the sales channel',
    text4: 'location',
    text5: 'usable'
  },
  save: 'save',
  elDialogSite: {
    title: 'compilelocation',
    text1: 'You must select at least one for the productonelocation。',
    text2: 'Choose to store this productlocation。',
    btn1: 'cancel',
    btn2: 'save'
  },
  elDialogPrice: {
    title: 'compileprice',
    text1: 'Apply price to all manyproperty',
    btn1: 'All application',
    btn2: 'cancel',
    btn3: 'save'
  },
  elDialogLocation: {
    title: 'compilenum',
    span1: 'compile',
    span2: 'The num',
    text1: 'Apply num to all multiproperty',
    btn1: 'All application',
    btn2: 'cancel',
    btn3: 'save',
    btn4: 'completed',
    text2: 'So this is where you want compilenum'
  },
  elDialogSku: {
    title: 'compile SKU （model number）',
    btn1: 'cancel',
    btn2: 'completed'
  },
  elDialogCode: {
    title: 'compileBarcode',
    btn1: 'cancel',
    btn2: 'completed'
  },
  elDialogEdit: {
    title: 'Is the compile:',
    elCheckbox: 'Create this multiple property',
    span1: 'price',
    span2: 'Expected profit rate：',
    span3: 'costPrice',
    span4: 'SKU （model number）',
    span5: 'Barcode （ISBN、UPC、GTIN wait）',
    span6: 'num',
    span7: 'compilelocation',
    span8: 'The location name',
    span9: 'usable',
    btn1: 'cancel',
    btn2: 'completed'
  },
  hint: {
    text1: 'Upload only',
    text2: 'image！',
    text3: 'Add repeated',
    text4: 'Enter duplicate'
  }
}
// ===========================批量compile
export const bulkEdit = {
  header: {
    title: 'Batch compile',
    back: 'back'
  },
  content: {
    text1: 'Currently Is the compile these fields：',
    btn1: 'Add fields',
    lable1: 'title',
    lable2: 'price',
    lable3: 'original',
    lable4: 'costPrice',
    lable5: 'sku',
    lable6: 'Barcode',
    lable7: 'weightUnit',
    lable8: 'weight'
  },
  save: 'save',
  ziDuanData: [
    {
      title: 'property',
      property: [
        {
          text: 'title',
          fields: 'goodsname',
          judge: true
        }
      ]
    },
    {
      title: 'pricing',
      property: [
        {
          text: 'price',
          fields: 'price',
          judge: true
        },
        {
          text: 'original',
          fields: 'oldprice',
          judge: false
        },
        {
          text: 'costPrice',
          fields: 'costprice',
          judge: false
        }
      ]
    },
    {
      title: 'inventory',
      property: [
        {
          text: 'SKU',
          fields: 'sku',
          judge: true
        },
        {
          text: 'Barcode',
          fields: 'itemcode',
          judge: false
        },
        {
          text: 'weightUnit',
          fields: 'unitid',
          judge: false
        },
        {
          text: 'weight',
          fields: 'weight',
          judge: false
        }
      ]
    }
  ]
}
// ===========================product详情
export const productDetails = {
  header: {
    back: 'back'
  },
  shopName: 'product name',
  shopMs: 'product description',
  proImg: {
    shopUp: 'Pictures',
    shopImg: 'Photo',
    content1: 'preview',
    content2: 'delete'
  },
  price: {
    title: 'price',
    text1: 'current',
    text2: 'original',
    text3: 'costPrice',
    text4: 'Expected profit rate：'
  },
  repertory: {
    title: 'inventory',
    text1: 'SKU(model number)',
    text2: 'Barcode (ISBN、UPC、GTIN wait)',
    text3: 'Tracking number',
    text4: 'Continue to sell after out of stock',
    text5: 'num',
    text6: 'compilelocation',
    span1: 'Check the inventory history',
    span2: 'The location name',
    text7: 'introduction',
    text8: 'usable',
    span3: 'Adjust according to the following content',
    span4: 'The new number',
    span5: 'initial',
    span6: 'The new number',
    btn1: 'cancel',
    btn2: 'save',
    span7: 'aggregate'
  },
  transportation: {
    title: 'transport',
    text1: 'needtransport',
    text2: 'weight',
    text3: 'Used to calculate freight charges at checkout。',
    text4: 'weight',
    text5: 'When purchasing this product, customers do not enter their shipping address or select the shipping method。'
  },
  haveMultiAttribute: {
    title: 'Multiple attributes',
    span1: 'Add more property',
    span2: 'Other operating',
    li: 'The compile options',
    span3: 'show',
    span4: 'one moreProperty',
    span5: 'selected',
    span6: 'one',
    btn1: 'Open the Batch compile',
    btn2: 'compileMoreProperty',
    li1: 'compileprice',
    li2: 'compilenum',
    li3: 'compileThe option value',
    li4: 'compileSKU',
    li5: 'compileBarcode',
    li6: 'deletemoreproperty',
    span7: 'In the totalinventory',
    span8: 'In sales'
  },
  noMultiAttribute: {
    title: 'Multiple attributes',
    elCheckbox: 'This product has several options, such as different sizes or colors',
    text1: 'The option name',
    text2: 'The option value',
    btn: 'Add other options',
    showText1: 'show',
    showText2: 'property',
    showText3: 'selected',
    showText4: 'one',
    li1: 'compileprice',
    li2: 'compilenum',
    li3: 'compileSKU',
    li4: 'compileBarcode',
    btn2: 'compilemoreproperty',
    text3: 'In the sales channel',
    text4: 'location',
    text5: 'usable'
  },
  delBtn: 'deleteproduct',
  saveBtn: 'save',
  // ===========================有moreproperty模态框
  haveElDialogSite: {
    title: 'compilelocation',
    text1: 'You must select at least one onelocation for your product。',
    text2: 'Choose to store this productlocation。',
    text3: 'The location of the。',
    text4: 'The oneinventory unit will be deleted。',
    btn1: 'cancel',
    btn2: 'save'
  },
  haveElDialogPrice: {
    title: 'compileprice',
    text1: 'Apply price to allmoreproperty',
    text2: 'costPrice •',
    text3: 'Expected profit rate：',
    btn1: 'All application',
    btn2: 'cancel',
    btn3: 'save'
  },
  haveElDialogOptions: {
    title: 'compileThe option value',
    btn1: 'cancel',
    btn2: 'save'
  },
  haveElDialogLocation: {
    title: 'compilenum',
    span1: 'compile',
    span2: 'The num',
    text1: 'Apply num to all multiproperty',
    btn1: 'All application',
    span3: 'Not stored in the',
    span4: 'location',
    span5: 'Cannot compileinventory because',
    span6: 'Moreproperty is not stored there。',
    btn2: 'cancel',
    btn3: 'save',
    btn4: 'completed',
    text2: 'So this is where you want compilenum'
  },
  haveElDialogOption: {
    title: 'The compile options',
    text1: 'Be sure to fill in the all field。',
    text2: 'delete',
    text3: 'Add other options',
    btn1: 'cancel',
    btn2: 'save'
  },
  haveElDialogImg: {
    title: 'Compile uploads moreproperty images',
    btn1: 'uncheck',
    btn2: 'cancel',
    btn3: 'save',
    btn4: 'Pictures'
  },
  haveElDialogSku: {
    title: 'compile SKU （model number）',
    btn1: 'cancel',
    btn2: 'save'
  },
  haveElDialogCode: {
    title: 'compileBarcode',
    btn1: 'cancel',
    btn2: 'save'
  },
  // ===========================无moreproperty模态框
  elDialogSite: {
    title: 'compilelocation',
    text1: 'You must select at least one onelocation for your product。',
    text2: 'Choose to store this productlocation。',
    btn1: 'cancel',
    btn2: 'save'
  },
  elDialogPrice: {
    title: 'compileprice',
    text1: 'Apply price to allmoreproperty',
    text2: 'costPrice •',
    text3: 'Expected profit rate：',
    btn1: 'All application',
    btn2: 'cancel',
    btn3: 'save'
  },
  elDialogLocation: {
    title: 'compilenum',
    span1: 'compile',
    span2: 'The num',
    text1: 'Apply num to all multiproperty',
    btn1: 'All application',
    btn2: 'cancel',
    btn3: 'save',
    btn4: 'completed',
    text2: 'So this is where you want compilenum'
  },
  elDialogSku: {
    title: 'compile SKU （model number）',
    btn1: 'cancel',
    btn2: 'completed'
  },
  elDialogCode: {
    title: 'compileBarcode',
    btn1: 'cancel',
    btn2: 'completed'
  },
  elDialogEdit: {
    title: 'Is the compile:',
    elCheckbox: 'Create this multiple property',
    span1: 'price',
    span2: 'Expected profit rate：',
    span3: 'costPrice',
    span4: 'SKU （model number）',
    span5: 'Barcode （ISBN、UPC、GTIN wait）',
    span6: 'num',
    span7: 'compilelocation',
    span8: 'The location name',
    span9: 'usable',
    btn1: 'cancel',
    btn2: 'completed'
  },
  hint: {
    text1: 'All locations',
    text2: 'adjust the quantity',
    text3: 'Set the number of',
    text4: 'Add repeated',
    text5: 'Enter duplicate',
    text6: 'Please make sure the fields are completed',
    text7: 'This operation will permanently delete the selected multi-attribute. Do you want to continue?',
    btn1: 'hint',
    btn2: 'confirm',
    btn3: 'cancel',
    btn4: 'successfully delete',
    btn5: 'undeleted',
    btn6: 'Confirm the shut down？',
    text8: 'Nothing can be modified at this time',
    text9: 'Upload only',
    text10: 'image！',
    text11: 'This action will permanently delete the image, whether to continue?',
    text12: 'Please add the product name',
    text13: 'This operation will permanently delete the product, cannot be withdrawn, whether to continue?'
  }
}
// ========================product line详情
export const productLineDetail = {
  header: {
    back: 'back'
  },
  content: {
    text1: 'product name',
    text2: 'Description (optional)',
    title1: 'product lineimg',
    text3: 'Pictures',
    text4: 'changeImg',
    text5: 'The compileimg substitution',
    text6: 'delete',
    text7: 'compile',
    text8: 'product',
    place1: 'searchproduct',
    place2: 'please select',
    btn1: 'browse',
    text9: 'There is no product in this product line',
    text10: 'deleteproduct line',
    text11: 'save'
  },
  elDialogPro: {
    title: 'compileproduct',
    place: 'searchproduct',
    text1: 'not found“',
    text2: '”Relevant results of',
    btn1: 'cancel',
    btn2: 'save'
  },
  elDialogImg: {
    title: 'The compileimg substitution',
    text1: 'imgThe alternative text',
    text2: 'Write a short description of this img to improve search engine optimization (SEO) and accessibility for visually impaired customers。',
    btn1: 'cancel',
    btn2: 'save'
  },
  elDialogDel: {
    title1: 'delete',
    title2: '?',
    text1: 'This operation cannot be undone。',
    btn1: 'cancel',
    btn2: 'deleteproduct line'
  },
  options: [
    { value: 'LA', label: 'product nameA-Z' },
    { value: 'LD', label: 'product nameZ-A' },
    { value: 'PA', label: 'The highest price' },
    { value: 'PD', label: 'The lowest price,' },
    { value: 'TA', label: 'Time is new - old' },
    { value: 'TD', label: 'Time is old - new' }
  ],
  hint: {
    text1: 'Please add the product name'
  }
}
// =========================establishproduct line
export const addProductLine = {
  header: {
    title: 'establishproduct line',
    back: 'back'
  },
  content: {
    text1: 'product name',
    text2: 'Description (optional)',
    title1: 'product lineimg',
    text3: 'Pictures',
    text4: 'changeImg',
    text5: 'The compileimg substitution',
    text6: 'delete',
    text7: 'compile',
    span1: 'product linetype',
    span2: 'manual',
    span3: 'manualAdd product to this series. Learn more about',
    span4: 'manualTo create theproduct line。',
    span5: 'automation',
    span6: 'Existing and future products that meet the conditions you set will be added to this product line from automation.Learn more about',
    span7: 'automationgeneratedproduct line。',
    span8: 'condition',
    span9: 'Condition matching option：',
    span10: 'allcondition',
    span11: 'anycondition',
    span12: 'why“',
    span13: '”Enter some text。',
    place1: 'please select',
    btn1: 'Add other conditions',
    btn2: 'save'
  },
  elDialogImg: {
    title: 'The compileimg substitution',
    text1: 'imgThe alternative text',
    text2: 'Write a short description of this img to improve search engine optimization (SEO) and accessibility for visually impaired customers。',
    btn1: 'cancel',
    btn2: 'save'
  },
  ifData: [
    {
      mulTitle: '1', // 多属性的标题
      mulJudgement: '7', // 多属性判断条件
      titleOptions: [
        {
          value: '1',
          label: 'product name'
        }, {
          value: '2',
          label: 'product class'
        }, {
          value: '3',
          label: 'product supplier'
        }, {
          value: '4',
          label: 'product price'
        }, {
          value: '5',
          label: 'product label'
        }, {
          value: '6',
          label: 'original cost'
        }, {
          value: '7',
          label: 'weight'
        }, {
          value: '8',
          label: 'inventory'
        }, {
          value: '9',
          label: 'Multiple attribute headers'
        }
      ], // 多属性的标题的下拉选项
      judgemenToptions: [
        {
          value: '1',
          label: 'equal to',
          disabled: false
        }, {
          value: '2',
          label: 'unequal to',
          disabled: false
        }, {
          value: '3',
          label: 'greater than ',
          disabled: true
        }, {
          value: '4',
          label: 'less than',
          disabled: true
        }, {
          value: '5',
          label: 'Beginning with',
          disabled: false
        }, {
          value: '6',
          label: 'At the end of',
          disabled: false
        }, {
          value: '7',
          label: 'include',
          disabled: false
        }, {
          value: '8',
          label: 'exclusive',
          disabled: false
        }
      ],
      mulValue: '', // 多属性输入的值
      hintTitle: false, // 提示语状态
      TitleTiShi: '', // 标签文本提示
      JudgeTiShi: '' // 判断文本提示
    }
  ],
  hint: {
    text1: 'Please add the product name'
  }
}
// =============================moreproperty详情
export const mulAttrDetails = {
  header: {
    back: 'back'
  },
  editSetNum: [{ text: 'ResizeNum' }, { text: 'SetNum' }],
  content: {
    text1: 'moreproperty',
    text2: 'seedproperty',
    text3: 'option',
    text4: 'addimg',
    text5: 'changeImg',
    text6: 'pricing',
    text7: 'current',
    text8: 'original',
    text9: 'costPrice',
    text10: 'Expected profit rate：',
    text11: 'needrevenue',
    siteNum: {
      text1: 'inventory',
      text2: 'SKU(model number)',
      text3: 'Barcode (ISBN、UPC、GTIN wait)',
      text4: 'Tracking number',
      text5: 'Continue to sell after out of stock',
      slot: 'num',
      text6: 'Check the inventory history',
      text7: 'compilelocation',
      text8: 'The location name',
      text9: 'introduction',
      text10: 'usable',
      text11: 'Adjust according to the following content',
      text12: 'The new number',
      text13: 'initial',
      text14: 'The new number',
      btn1: 'cancel',
      btn2: 'save',
      slot2: 'aggregate',
      text15: 'deliver',
      text16: 'needtransport',
      text17: 'weight',
      text18: 'Used to calculate freight',
      text19: 'When purchasing this product, customers do not enter their shipping address or select the shipping method。'
    }
  },
  elDialogImg: {
    title: 'Compile uploads moreproperty images',
    text1: 'uncheck',
    btn: 'Pictures',
    btn1: 'cancel',
    btn2: 'completed'
  },
  elDialogSite: {
    title: 'compilelocation',
    text1: 'You must select at least one onelocation for your product。',
    text2: 'Choose to store this productlocation。',
    text3: 'The location of the ',
    text4: 'The oneinventory unit will be deleted。 ',
    btn1: 'cancel',
    btn2: 'save'
  }
}
// ===================Setting
export const setting = {
  header: {
    title: 'Setting'
  },
  setData: [
    {
      class: 'iconfont icon-location',
      text1: 'location',
      text2: 'Manage inventory location, delivery orders and sales of products',
      href: '/settings/setDetail',
      permission: ['11']
    },
    {
      class: 'iconfont icon-yonghu1',
      text1: 'account',
      text2: 'Manage your account and permissions',
      href: '/settings/userControl',
      permission: ['12']
    },
    {
      class: 'iconfont icon-qian',
      text1: 'order amount',
      text2: 'View your store amount',
      href: '/settings/ordersStatistics',
      permission: ['12']
    },
    {
      class: 'iconfont icon-shezhi1',
      text1: 'General Settings',
      text2: 'View and update your store details',
      href: '/settings/userControl',
      permission: ['12']
    },
    // {
    // class: 'iconfont icon-bangding',
    // text1: 'transportation',
    // text2: 'Manage how you send orders to customers',
    // href: '/administratorPanel/settings/transport/shipping',
    // permission: ['12']
    // },
    {
      class: 'iconfont icon-shezhi1',
      text1: 'Set the banner',
      text2: 'Set up the roving diagram',
      href: '/administratorPanel/settings/slideshow',
      permission: ['12']
    }
  ]
}
// ===================仓库location
export const setDetail = {
  header: {
    back: 'back',
    title: 'location',
    btn1: 'addlocation'
  },
  content: {
    title: 'location',
    text1: 'Manage the location of inventory, deliver orders, and sell products。',
    text2: 'You are using the one that applies to your package',
    slot1: 'Four (Max. 4) positions。',
    text3: 'More packages',
    li1: 'Has stopped the location',
    text4: 'Deliver order',
    text5: 'Select which locations to assign the new order to first。',
    text6: 'minutely',
    text7: 'Assign an order to each onelocation。',
    text8: 'location',
    text9: 'Compiledeliver priority',
    span1: 'show',
    span2: 'a deactivated positions',
    span3: 'hide',
    span4: 'a deactivated positions'
  },
  elDialog: {
    title: 'Compiledeliver priority',
    text1: 'Drag location to reorder it.First, assign the order to the location at the top of the list.If an onelocation cannot deliver an entire one order, it will be split and assigned to moreonelocation。',
    btn1: 'cancel',
    btn2: 'save'
  }
}
// ==================员工登录查看个人资料
export const staffDetail = {
  title: 'personal data',
  text1: 'detailed information',
  text2: 'The preferred language',
  text3: 'After logging in endless, this will be the language you see.This will not affect the language your online store displays to your customers。',
  text4: 'language',
  place: 'please choose',
  text5: 'personal information'
}
// ================add仓库and仓库详情
export const addSet = {
  header: {
    back: 'back',
    text1: 'Add the position'
  },
  hint: {
    text1: 'Please enter a location name',
    text2: 'chosen position',
    text3: 'Please select the alternate position'
  },
  label: {
    text1: 'address',
    text2: 'Apartment, suite, etc.',
    text3: 'city',
    text4: 'Country/Region',
    text5: 'Province',
    text6: 'Postal code'
  },
  content: {
    text1: 'location',
    text2: 'Manage the location of inventory, deliver orders, and sell products。',
    text3: 'You are using 2 one (most 4 one) location applicable to your package。',
    text4: 'More packages',
    text5: 'The location name',
    place1: 'Paris warehouse',
    text6: 'deliverThe location of theOrder online ',
    text7: 'The location of theinventoryusableOnline sales',
    slot: 'site',
    label1: 'phone',
    place2: 'Please enter content',
    place3: 'please select',
    btn1: 'deletelocation',
    btn2: 'save'
  },
  elDialogSite: {
    title: 'blocklocation',
    text1: 'You can reactivate this at any timelocation。',
    text2: 'askblock',
    text3: ', You need to select one to replace location：',
    text4: 'destination',
    btn1: 'cancel',
    btn2: 'save'
  },
  elDialogDel: {
    title: 'deletelocation',
    text1: 'Are you sure about the askdelete location。',
    text2: '？This operation cannot be undone。',
    btn1: 'cancel',
    btn2: 'deletelocation'
  },
  blockData: {
    title: 'blocklocation',
    text1: 'Location of block b will not be included in location restriction (4 one)',
    text2: 'Details to understand',
    text3: 'The location limit',
    p1: 'If this location is not used for inventory, deliver orders, or selling products, block it。',
    btn: 'blocklocation'
  },
  blockData1: {
    title: 'Activate the location',
    text1: 'Active location affects your 4 The location limit。',
    text2: 'Details to understand',
    text3: 'The location limit',
    p1: 'Activate this location if it is used for inventory, deliver orders, or selling products。',
    btn: 'Activate the location'
  }
}
// ===============addstaff
export const addUser = {
  header: {
    title: 'Add employee account',
    back: 'back',
    btn: 'Send out invitations'
  },
  content: {
    text1: 'Employees account',
    text2: 'Provide employees with access to your store by sending out invitationswhy.If you work with a designer, developer, or marketer, learn how to allow collaborators access to your store',
    label1: 'firstname',
    label2: 'lastname',
    label3: 'E-mail',
    text3: 'This employee account will have full permissions',
    text4: 'The compile permissions'
  }
}
// =============邮箱邀请staff注册
export const inviteUser = {
  header: {
    title: 'establishaccount',
    text1: 'Accept wuLiStores invitation'
  },
  content: {
    label1: 'E-mail',
    label2: 'firstname',
    label3: 'lastname',
    label4: 'password',
    place1: 'enter your PIN',
    title1: 'Show the password',
    title2: 'Hidden password',
    label5: 'strength:',
    label6: 'confirm password'
  },
  save: 'establishaccount'
}
// ================account管理
export const userControl = {
  header: {
    title: 'account',
    back: 'back'
  },
  content: {
    text1: 'An overview of the account',
    text2: 'Check out our',
    text3: 'terms of service',
    text4: 'and',
    text5: 'privacy policy ',
    text6: '。',
    text7: 'More packages',
    text8: 'With different functions and rates',
    text9: 'join date',
    text10: 'The current package',
    text11: 'Trial/month',
    text12: 'state',
    text13: 'active',
    text14: 'Account and permissions',
    text15: 'Account all the',
    text16: 'LastLoginTime：',
    text17: 'staffaccount （',
    text18: '，A total of two）',
    btn1: 'addstaff',
    li1: 'Invitation sent',
    li2: 'not log in',
    li3: 'LastLoginTime：',
    li4: 'Full access',
    li5: 'Have blockstaff account',
    li6: 'showblock',
    li7: 'concealblock'
  }
}
// ================account详情andstaff详情
export const userDetail = {
  header: {
    back: 'back',
    text1: 'Validation of E - mailsite',
    text2: 'To help secure your account, please verify your e-mailsite.Please click the button below ',
    text3: 'Send validation E-mail or update first',
    text4: 'sendE-mailsite'
  },
  content: {
    title: 'Account information',
    text2: 'staffinformation',
    text3: 'upload pictures',
    text4: 'The delete photos',
    label1: 'firstname',
    label2: 'lastname',
    label3: 'E-mail',
    label4: 'phone （choosable）'
  },
  content2: {
    title: 'detailed information',
    label1: 'One person introduction （choosable）',
    place1: 'Please enter content',
    text2: 'You can select this option from the template compile to show on my blog posts。',
    text3: 'inform',
    text4: 'Allow re-ask notifications to be sent via E-mail',
    text5: 'We will send the heavy ask news about Shopify to the users by E-mail regularly.We will keep the amount of E-mail to a minimum。',
    text6: 'To reset the password',
    text7: 'Change the password used to log in to getGun。',
    text8: 'changepassword',
    label2: 'new password',
    label3: 'confirm password',
    text9: 'reset passwords',
    text10: 'You can E-mail the instructions to ',
    text11: 'To help ma reset passwords。 ',
    btn: 'Send instructions via E-mail'
  },
  content3: {
    title: 'Background access',
    text1: 'Custom permission',
    text2: 'Enable or restrict my access to each one section of this store。',
    text3: 'Have full access',
    text4: 'The compile permissions'
  },
  content4: {
    title: 'Manage employee access rights',
    text1: 'delete',
    text2: 'The deleted staff account will be permanently deleted from your store.This operation is irreversible。',
    text3: 'delete',
    text4: 'save'
  },
  elDialogPwd: {
    title: 'accountchange',
    text1: 'Enter the current password to save change on your account。',
    btn1: 'cancel',
    btn2: 'acknowledge'
  },
  elDialogStaff: {
    title: 'Suspend account access',
    text1: 'Are you sure ask is suspended',
    text2: 'Account access permissions？',
    btn1: 'cancel',
    btn2: 'Temporarily stop'
  },
  elDialogDel: {
    title: 'Confirm cancellation of account',
    text1: 'Are you sure ask revocation',
    text2: 'The account? This operation is irreversible。',
    text3: 'Enter the current password to continue：',
    btn1: 'cancel',
    btn2: 'Cancel the pin'
  },
  textArea: [
    {
      text1: 'Suspend access',
      text2: 'This account will no longer be able to access your store.You can restore access at any time。',
      btn: 'Suspend access'
    },
    {
      text1: 're-activation',
      text2: 'Access to this account is currently disabled and is not included in your employee account restrictions。',
      btn: 're-activation'
    }
  ],
  hint: {
    text1: 'Please complete'
  }
}
// =================购物车详情
export const shopTrolley = {
  header: {
    title: 'shopping trolley',
    text: 'continue shopping'
  },
  table: {
    thead: {
      th1: 'checkAll',
      th2: 'commodity information',
      th3: 'unit price',
      th4: 'quantity',
      th5: 'aggregate',
      th6: 'operation'
    }
  },
  content: {
    text1: 'Delete the selected product',
    text2: 'items',
    text3: 'aggregate',
    btn: 'close an account ',
    hint: 'The shopping cart was empty'
  },
  hint: {
    text1: 'Are you sure you want to delete the item？',
    text2: 'hint',
    btn1: 'confirm',
    btn2: 'cancel',
    text3: 'undeleted',
    text4: 'Are you sure you want to delete the selected item？',
    text5: 'You have not selected the goods, please click settle after selecting'
  }
}
// ==================购物车结算
export const submitOrderFive = {
  header: {
    title: 'Confirm shipping address'
  },
  site: {
    text2: 'collect',
    text3: 'Set to default',
    text4: 'default address',
    text5: 'delete'
  },
  table: {
    thead: {
      th1: 'checkAll',
      th2: 'commodity information',
      th3: 'unit price',
      th4: 'quantity',
      th5: 'aggregate'
    }
  },
  discount: {
    text1: 'subtotal',
    text2: 'transport',
    text3: 'expenses of taxation',
    text4: 'discount:',
    btn1: 'Apply',
    span1: 'items',
    span2: 'aggregate',
    btn2: 'submit order'
  },
  elDialog: {
    label1: 'consignee name：',
    label2: 'postcode：',
    label3: 'Addresses：',
    label4: 'FullAddress：',
    label5: 'phoneNumber：',
    label6: 'E-Mail：',
    place1: 'No longer than 25 characters',
    place2: 'Please enter zip code',
    place3: 'Please enter detailed address information',
    place4: 'Please enter email'
  },
  elDialogMoney: {
    title: 'bank card payment',
    text1: 'Enter the bank card number',
    text2: 'payment $ ',
    btn1: 'confirm payment',
    text3: 'In payment···',
    btn2: 'confirm the payment'
  },
  title: {
    text1: 'Add address information',
    text2: 'Modify address information'
  },
  setSite: {
    text1: 'Add the address',
    text2: 'modification address'
  },
  saveOrSet: {
    text1: 'save',
    text2: 'alter'
  },
  hint: {
    text1: 'Under payment····',
    text2: 'Please add the address first before submitting the order',
    text3: 'You have not selected the goods, please click submit the order after selecting',
    text4: 'fail to modify',
    text5: 'Are you sure you want to delete the address information？',
    text6: 'hint',
    text7: 'confirm',
    text8: 'cancel',
    text9: 'successfully delete',
    text10: 'undeleted',
    place: 'please choose',
    loading: 'Under load·····',
    text11: 'You have not selected the goods, please click settle after selecting',
    text12: 'Address added successfully',
    text13: 'Address modification successful'
  },
  listDetails: {
    text1: 'sortord：'
  },
  indexContent: {
    text1: 'choose',
    text2: 'featured resource',
    text3: 'more >',
    text4: 'Please add the address first and enter the discount code'
  }
}
// =================商城产品目录
export const shopProduct = {
  title: 'product summary',
  content: {
    text1: 'arrangement mode',
    place1: 'please choose',
    text2: 'A product'
  },
  options: [{
    value: 'TA',
    label: 'Time from near to far'
  }, {
    value: 'TD',
    label: 'Time from far to near'
  }, {
    value: 'LA',
    label: 'arrange in alphabetical order A-Z'
  }, {
    value: 'LD',
    label: 'arrange in alphabetical order Z-A'
  }, {
    value: 'PA',
    label: 'Prices range from low to high'
  }, {
    value: 'PD',
    label: 'Prices range from high to low'
  }]
}
// ==============validator验证
export const validator = {
  vaIsPwd: {
    err1: 'enter your PIN',
    err2: 'Passwords are 8-20 digit alphanumeric combinations that support non-space characters',
    err3: 'Please enter your password again',
    err4: 'Two different passwords!'
  }
}
// ====================临时提示语
export const temporary = {
  nextShopPwd: {
    text1: 'Congratulations, you have successfully activated your account',
    text2: 'Store password cannot be the same as email password'
  },
  regMessage: {
    text1: 'Please complete the content'
  }
}// ===================设置轮播图
export const slideShow = {
  header: {
    title: 'Banner management',
    btn: 'Upload the roving diagram'
  },
  main: {
    bannerTitle: 'Image and text overlay',
    bannerText: 'Use superimposed text to let your customers know about your brand.Choose images and text that are relevant to your style and story。',
    text1: 'Selected series',
    text2: 'Your product name'
  },
  elDialog: {
    title: 'Management of the banner',
    text1: 'Edit the title and links',
    title2: 'Edit the title and links',
    label1: 'title',
    label2: 'text',
    label3: 'link',
    btn1: 'off the stocks'
  },
  hint: {
    text1: 'Please upload pictures first'
  }
}
// ================订单金额总计
export const ordersStatistics = {
  title: 'order amount',
  text1: 'amount paid',
  text2: 'Outstanding amount',
  text3: 'The tax amount'
}
// 订单打印
export const printOrder = {
  title: 'Order to print',
  text1: 'order reference:',
  text2: 'customer name:',
  text3: 'Customer address:',
  text4: 'Order time:',
  text5: 'contact information:',
  th1: 'Product ID',
  th2: 'product name ',
  th3: 'quantity',
  th4: 'Amount of goods',
  td1: 'Gross merchandise value：',
  td2: 'carriage：',
  td3: 'Taxes：',
  td4: 'yuan',
  td5: 'discount：',
  sum: 'Order payment amount：',
  btn1: 'Print the order'
}
// 提交订单完成以后订单详情
export const subSuccessfully = {
  title: 'order',
  text1: 'Your order has been submitted',
  text2: 'customer information',
  text3: 'payment method',
  text4: 'ship address',
  btn1: 'To continue shopping',
  text5: 'subtotal',
  text6: 'discount',
  text7: 'freight',
  text8: 'taxes and dues',
  text9: 'total',
  text10: 'online payment'
}
// 在线模板
export const optionalModule = {
  title: 'template',
  text1: 'The online store is being password protected',
  text2: 'Only visitors with a password can access your online store.',
  text3: 'Remove the password',
  text4: 'The current template',
  text5: 'This is the template that customers will see when they visit your store。',
  text6: 'Use our default templates to display your brand and products。',
  text7: 'preview',
  text8: 'editor',
  text9: 'custom',
  text10: 'library',
  text11: 'Manage store templates.Add and publish templates to change the look and feel of the online store。',
  text12: 'Free template',
  text13: 'Browse endless free templates, all designed to provide the best home page customization。',
  text14: 'Browse free templates',
  text15: 'Template 1',
  text16: 'Template 2',
  text17: 'Template 3',
  text18: 'Template 4',
  text19: 'Template 5'
}
// 简化模板1
export const simplifyOne = {
  routerData: [
    {
      title: 'Home',
      href: '/simplifyOneContent'
    },
    {
      title: 'Catalog',
      href: '/shopProductOne/page1'
    }
  ],
  nav: {
    text1: 'Image and text overlay',
    text2: 'Use superimposed text to let your customers know about your brand.Choose images and text that are relevant to your style and story.'
  },
  main: {
    text1: 'More series',
    text2: 'Images and text',
    text3: 'Pair large text with images to focus on the selected product, collection, or blog post.Add details about usability, styles, and even provide comments.',
    text4: 'More products'
  },
  footer: {
    text1: 'Quick links',
    text2: 'search',
    text3: 'Tell me about your business',
    text4: 'Share product details, promotional or brand content with your customers',
    text5: 'message',
    text6: 'subscriber'
  }
}
// 简化模板3
export const simplifyThree = {
  routerData: [
    {
      title: 'Home',
      href: '/simplifyThreeContent'
    },
    {
      title: 'Catalog',
      href: '/shopProductThree/page3'
    }
  ],
  setData: [
    {
      src: require('../../assets/administratorPanel/templateImg/198.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/252.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/26.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/1.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/198.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/252.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/26.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/1.png'),
      text: 'Sample product title',
      price: '$ 19.99'
    }
  ],
  header: {
    text1: 'Here\'s something to announce',
    text2: 'Cart'
  },
  main: {
    text1: 'This week is popular',
    text2: 'More series',
    text3: 'Sample product title',
    text4: 'Add to shopping cart',
    text5: 'particular→',
    text6: 'Add to shopping cart',
    text7: 'More Products→'
  },
  footer: {
    text1: 'spot news',
    text2: 'link',
    text3: 'search',
    text4: 'Follow Us',
    text5: 'Sign up for the latest news, offers and styles',
    text6: 'communication',
    text7: 'subscription',
    text8: 'Copyright ©2019 mall. Provided by the endless'
  }
}

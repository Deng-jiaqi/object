export const lang = {
  loginOfMall: { // 登录商店名称的数据
    text: {
      title: '店长',
      href: '/loginAndRegister/Alogin'
    },
    text1: '店员登录',
    text2: '店铺名称',
    text3: {
      title: '注册商店',
      href: '/loginAndRegister/ARegisterOfIndex'
    },
    text4: {
      title: '忘记店铺?',
      href: '/loginAndRegister/forgetShop'
    },
    text5: '下一步',
    text6: '店铺名为1-20个字符'
  },
  loginOfEmail: { // 登录商店邮箱的数据
    text1: '登录',
    text2: '邮箱',
    text3: {
      title: '登录到另一家店',
      href: '/loginAndRegister/ELoginOfMall'
    },
    text4: '下一步',
    text5: '邮箱格式不正确',
    text6: '继续以登录 '
  },
  loginOfPassword: { // 登录密码的数据
    text1: '登录',
    text2: '正在访问 ',
    text3: '密码',
    text4: {
      title: '忘记密码?',
      href: '/loginAndRegister/forgetPassword'
    },
    text5: '登录',
    text6: '密码为6-20数字和字母的组合'
  },
  loginOfRecent: { // 登录-最近访问的商店的数据
    text1: '注销',
    text2: '最近访问过的商店',
    text3: {
      title: '登录到其他商店',
      href1: '/loginAndRegister/ELoginOfMall',
      href2: '/loginAndRegister/ALogin'
    }
  },
  registerOfIndex: { // 注册首页的数据
    text1: 'Free trial at present',
    text2: '邮箱地址',
    text3: '密码',
    text4: '你的店名',
    text5: '下一步',
    text6: {
      title: '返回',
      href: '/loginAndRegister/ELoginOfMall'
    },
    text8: '邮箱格式不正确',
    text9: '密码为6-20位数字和字母的组合',
    text10: '店铺名为1-20个字符'
  },
  ALogin: { // 登录---管理员登录
    text1: '店长登录',
    text2: '请输入邮箱和密码',
    text3: '邮箱',
    text4: '密码',
    text5: '下一步',
    text6: {
      title: '店员',
      href: '/loginAndRegister/ELoginOfMall'
    },
    text7: '邮箱格式不正确',
    text8: '密码由6-20个数字和字母组成'
  },
  ALoginOfShops: { // 登录-- 管理员的所有商店
    text1: {
      title: '返回首页',
      href: '/loginAndRegister/ALogin'
    },
    text2: '我的商店',
    text3: {
      title: '登录其它邮箱',
      href: '/loginAndRegister/ALogin'
    }
  },
  ALoginOfshopPsw: { // 登录-- 管理员登录输入店铺密码
    text1: '登录',
    text2: '店铺密码',
    text3: '登录',
    text4: {
      title: '返回',
      href: '/loginAndRegister/ALoginOfShops'
    },
    text5: '密码为6-20位数字和字母的组合'
  },
  administratorPanelLayout: { // 管理员控制面板-layout
    text1: 'EDGEMARKET',
    text2: '退出',
    one: {
      title: '主页',
      href: '/administratorPanel/home'
    },
    two: {
      title: '订单管理',
      child: {
        one: {
          title: '有效订单',
          href: '/administratorPanel/orderManagement/effectiveOrders/allOrdersTable'
        },
        two: {
          title: '弃单',
          href: '/administratorPanel/orderManagement/abandonedOrders/abandonedAllOrdersTable'
        }
      }
    },
    three: {
      title: '产品',
      child: {
        one: {
          title: '所有产品',
          href: '/administratorPanel/productInventory/allProducts'
        },
        two: {
          title: '库存',
          href: '/administratorPanel/productInventory/inventory'
        },
        three: {
          title: '产品系列',
          href: '/administratorPanel/productInventory/productLine'
        }
      }
    },
    four: {
      title: '折扣',
      href: '/administratorPanel/indexOfDiscount/discountCode'
    },
    five: {
      title: '在线商店',
      href: '/optionalModule'
    },
    six: {
      title: '设置',
      href: '/administratorPanel/settings/set'
    }
  },
  home: { // home页
    text1: '欢迎来到无际商城！',
    text2: '添加产品',
    text3: '自定义模块',
    text4: '添加域名',
    text5: '您已添加了新产品',
    text6: '您可以添加更多产品，或继续查看本卡片中的其他温馨提示。',
    text7: '添加其他产品'
  },
  domainInfo: { // 域名信息
    text1: '域',
    text2: '返回',
    text3: '主域名',
    text4: '域名:',
    text5: '状态:',
    text6: '添加时间:',
    text7: {
      title: '自定义域名',
      href: '/administratorPanel/customizeDomain'
    },
    text8: '删除',
    text9: '弃用',
    text10: '正常'
  },
  customizeDomain: { // 自定义域名
    text1: '自定义域名',
    text2: '返回',
    text3: '域',
    text4: 'e.g.example.com',
    text5: '确定'
  },
  indexofEffectiveOrders: { // 有效订单首页
    text1: '订单',
    text2: '返回',
    text4: '查询订单(您可以搜索订单号、客户名称、总金额)',
    text3: [{
      title: '所有订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/allOrdersTable',
      forActive: 'allOrdersTable'
    },
    {
      title: '未付款订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/notPayingTable',
      forActive: 'notPayingTable'
    },
    {
      title: '已付款未发货订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/paymentNotDeliveredTable',
      forActive: 'paymentNotDeliveredTable'
    },
    {
      title: '已付款已发货订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/paymentAndDeliveredTable',
      forActive: 'paymentAndDeliveredTable'
    }
    ],
    text5: '条件查询',
    text6: '操作',
    text7: '发货订单',
    text8: '入账付款',
    text9: '付款状态',
    text10: '未付款',
    text11: '已付款',
    text12: '已取消',
    text13: '已退款',
    text14: '部分付款',
    text15: '部分退款',
    text16: '发货状态',
    text17: '未发货',
    text18: '已发货',
    text19: '部分发货',
    table: { // 所有订单的表格
      text1: '订单号',
      text2: '日期',
      text3: '客户',
      text4: '总金额',
      text5: '付款状态',
      text6: '交易状态',
      text7: '备注',
      text8: '暂无数据'
    }
  },
  indexofAbandonOrder: { // 弃单首页
    text1: '弃单',
    text11: [{
      title: '所有订单',
      href: '/administratorPanel/orderManagement/abandonedOrders/abandonedAllOrdersTable',
      forActive: 'abandonedAllOrdersTable'
    }],
    text2: '搜索订单',
    text3: '搜索条件',
    text4: '恢复状态',
    text5: '未恢复',
    text6: '已恢复',
    text7: '电子邮件状态',
    text8: '已发送',
    text9: '未发送'
  },
  orderDetails: { // 订单详情
    text1: '订单',
    text2: '打印订单',
    text3: '退款',
    text4: '重新入库',
    text5: '其它操作',
    text6: '取消订单',
    text7: '返回',
    text8: '标记为已发货',
    text9: '更多',
    text10: '取消发货',
    text11: '编辑跟踪信息',
    text12: '编辑跟踪',
    text13: '运单号',
    text14: '运输方式',
    text15: '选择快递',
    text16: '向客户发送通知邮件',
    text17: '取消',
    text18: '保存',
    text19: '数量',
    text20: '配送',
    text21: '税费',
    text22: '价格',
    text23: '总计',
    text24: '(客户付款)',
    text25: '净支出',
    refundAmount: '退款金额',
    refundReason: '退款原因',
    text26: '折扣额',
    text27: '备注',
    text28: '编辑',
    text29: '暂无备注',
    text30: '添加备注',
    text31: '备注',
    text32: '备注',
    text33: '取消',
    text59: '确定',
    text34: '客户',
    text35: '联系信息',
    text36: '编辑',
    text37: '编辑联系信息',
    text38: '邮件地址',
    text39: '电话',
    text40: '取消',
    text41: '保存',
    text42: '收货地址',
    text43: '编辑',
    text44: '编辑收货地址',
    text45: '名字',
    text46: '姓',
    text47: '公司',
    text48: '电话',
    text49: '地址',
    text51: '国家/地区',
    text52: '省份(州)',
    text53: '城市',
    text54: '邮编/邮政编码',
    text55: '取消',
    text56: '保存',
    text57: '时间表',
    text58: '重新发送邮件'
  },
  refund: { // 退款
    text1: '退款',
    text2: '返回',
    text3: '重新入库',
    text4: '件商品',
    text5: '已退还运费:',
    text6: '运费',
    text7: '退款金额',
    text8: '退款原因',
    text9: '摘要',
    text10: '产品小计',
    text11: ' 件商品',
    text12: '税费',
    text13: '运费',
    text14: '退款总额',
    text15: '退款金额',
    text16: '可退金额：',
    text17: '邮件通知客户',
    text18: '退款',
    text19: '重新入库',
    text20: '件商品',
    text21: '请选择',
    text22: '折扣码',
    text23: '折扣额'
  },
  cancelOrder: { // 取消订单
    text1: '订单',
    text2: '返回',
    text3: '选择商品总金额',
    text4: '运费',
    text5: '剩余',
    text6: '税费',
    text7: '可退金额',
    text8: '退款总额',
    text9: '使用',
    text10: '退款',
    text11: '重新入库',
    text12: '此订单所要求的产品数量将重新存入此店。',
    text13: '取消原因',
    text14: '邮件通知',
    text15: '保留订单',
    text16: '取消订单'
  },
  reputInStorage: { // 重新入库
    text1: '重新入库',
    text2: '返回',
    text3: '重新入库',
    text4: '件商品',
    text5: '订单取消原因',
    text6: '授权金额',
    text7: '尚未入账',
    text8: '已重新入库的商品将不可再发货。',
    text10: '重新入库商品',
    text11: '入库',
    text12: '件商品',
    text13: '请选择'
  },
  delivery: { // 发货
    text1: '订单',
    text2: '返回',
    text3: '手动发货',
    text4: '商品',
    text5: '重量',
    text6: '数量',
    text7: '选择快递',
    text8: '选择快递',
    text9: '订单号',
    text10: '邮件通知',
    text11: '收货地址',
    text12: '编辑',
    text13: '编辑收货地址',
    text14: '发货地址',
    text15: '确定发货',
    text16: '此仓库暂无存货'
  },
  indexOfDiscount: { // 折扣首页
    text1: '折扣',
    text2: '创建折扣',
    text3: [
      {
        href: '/administratorPanel/indexOfDiscount/discountCode',
        title: '折扣码',
        forActive: 'discountCode'
      },
      {
        href: '/administratorPanel/indexOfDiscount/automaticDiscount',
        title: '自动折扣',
        forActive: 'automaticDiscount'
      }
    ],
    text4: [
      {
        status: 'all',
        title: '所有'
      },
      {
        status: 'active',
        title: '活跃'
      },
      {
        status: 'haveArranged',
        title: '已安排'
      },
      {
        status: 'expired',
        title: '过期'
      }
    ],
    search: '自定义搜索',
    text5: '搜索折扣码',
    text6: '创建折扣',
    text7: '折扣码',
    text8: '顾客在结账时输入密码就可以获得折扣',
    text9: '自动折扣',
    text10: '顾客将在购物车中自动获得折扣',
    text11: '顾客在结账时不能同时享受多种折扣。',
    text12: '启用折扣',
    text13: '禁用折扣',
    text14: '删除折扣',
    text15: '操作',
    text16: '取消',
    text17: '确定',
    text18: '启用选择的折扣码?',
    text19: '现在将启用这些折扣码。',
    text20: '禁用选择的折扣码?',
    text21: '这些折扣码现在到期了。',
    text22: '删除选择的折扣码?',
    text23: '无法撤消此操作。',
    text24: '禁用',
    text25: '启用',
    text26: '已使用',
    text27: '次'
  },
  discountcode: { // 折扣
    enable: '启用',
    disable: '禁用',
    text1: '创建折扣码',
    text2: '返回',
    text3: '折扣码',
    text4: '生成代码',
    text5: '顾客将在结账时输入折扣码',
    text6: '类型',
    text7: '百分比',
    text8: '固定金额',
    text9: '免费送货',
    text10: '买 x 送 y',
    text11: '值',
    text12: '折扣额',
    text13: '适用于',
    text14: '整个订单',
    text15: '特定产品',
    text18: '特定产品系列',
    text17: '浏览',
    text19: '最低要求',
    text20: '无',
    text21: '最低购买金额',
    text22: '应用于整个订单',
    text23: '最低购买数量',
    text24: '应用于整个订单',
    text25: '每个订单只能使用一次折扣',
    text26: '如果未选中，此折扣将应用于订单中的每个符合条件的产品',
    text27: '客户资格',
    text28: '所有人',
    text29: '使用限制',
    text30: '限制该折扣总共能使用的次数',
    text31: '每位客户限使用一次',
    text32: '生效日期',
    text33: '开始日期',
    text34: '开始时间',
    text35: '设置结束日期',
    text36: '结束日期',
    text37: '结束时间',
    text38: '取消',
    text39: '保存折扣码',
    text40: '删除',
    text41: '选择日期',
    text42: '选择时间',
    text43: '删除',
    text44: '确定删除此折扣码 ？',
    text45: '取消',
    text46: '删除',
    text47: '国家/地区',
    text48: '所有国家/地区',
    text49: '特定国家/地区',
    text50: '运费',
    text51: '排除超过特定金额的运费',
    text52: '客户购买',
    text53: '客户消费',
    text54: '最低商品数量',
    text55: '最低购买金额',
    text56: '数量',
    text57: '金额',
    text58: '这里的任何物品',
    text59: '请选择',
    text60: '客户获得',
    text61: '客户必须将下面指定的商品数量添加至购物车。',
    text62: '所享折扣',
    text63: '百分比',
    text64: '免费',
    text65: '设置每个订单的最大使用次数',
    text66: '启用',
    text67: '这个折扣代码现在将被启用，并且没有结束日期。所有未保存的更改都将丢失。',
    text68: '取消',
    text69: '启用',
    text70: '禁用',
    text71: '这个折扣代码现在将过期，所有未保存的更改将丢失。',
    text72: '取消',
    text73: '禁用',
    text74: '编辑',
    text75: '添加产品系列',
    text76: '搜索特定的产品系列',
    text77: '暂无相关产品系列',
    text78: '取消',
    text79: '保存',
    text80: '添加产品',
    text81: '搜索特定产品',
    text82: '件出售',
    text83: '目前没有相关产品',
    text84: '取消',
    text85: '保存',
    text86: '编辑多属性',
    text87: '件在售',
    text88: '取消',
    text89: '保存',
    text90: '已选择',
    text91: '个多属性',
    text92: '搜索特定国家/地区',
    text93: '搜索特定国家/地区',
    text94: '搜索特定国家/地区',
    text95: '没有相关国家',
    text96: '取消',
    text97: '确定',
    text98: '已选择',
    text99: '个多属性'
  },
  autoDiscountcode: { // 自动折扣
    text1: '创建自动折扣',
    text2: '返回',
    text3: '启用',
    text4: '禁用',
    text5: '自动折扣标题',
    text6: '客户将在购物车中和结账时看到此消息。',
    text7: '类型',
    text8: '百分比',
    text9: '固定金额',
    text10: '买 X 送 Y',
    text11: '客户购买',
    text12: '客户消费',
    text13: '最低商品数量',
    text14: '最低购买金额',
    text15: '数量',
    text16: '金额',
    text17: '这里的任何物品',
    text18: '请选择',
    text19: '特定产品',
    text20: '特定产品系列',
    text21: '浏览',
    text22: '客户获得',
    text23: '客户必须将下面指定的商品数量添加至购物车。',
    text24: '数量',
    text25: '这里的任何物品',
    text26: '请选择',
    text27: '所享折扣',
    text28: '百分比',
    text29: '免费',
    text30: '设置每个订单的最大使用次数',
    text31: '适用于',
    text32: '整个订单',
    text33: '特定产品',
    text34: '特定产品系列',
    text35: '每个订单仅使用折扣一次',
    text36: '如果未选中，此折扣将应用于订单中的每个符合条件的产品。',
    text37: '最低要求',
    text38: '最低购买金额',
    text39: '仅应用于选择的产品。',
    text40: '最低商品数量',
    text41: '仅应用于选择的产品。',
    text42: '生效日期',
    text43: '开始日期',
    text44: '开始时间',
    text45: '设置结束日期',
    text46: '选择日期',
    text47: '选择时间',
    text48: '不得与其他折扣合拼使用',
    text49: '如果在结账时已经应用了折扣，客户将无法输入代码。',
    text50: '值',
    text51: '折扣额',
    text52: '删除',
    text53: '取消',
    text54: '保存折扣',
    text55: '禁用',
    text56: '此折扣码现在将过期，所有未保存的更改都将丢失。',
    text57: '取消',
    text58: '禁用',
    text59: '启用',
    text60: '此折扣码现在将变为启用状态，并且没有结束日期。所有未保存的更改都将丢失。',
    text61: '取消',
    text62: '启用',
    text63: '删除',
    text64: '确定删除此折扣？',
    text65: '取消',
    text66: '删除'
  },
  templeteOne: { // 模板一
    text1: 'MALL',
    text2: 'LOGO',
    text3: {
      title: '家',
      href: ''
    },
    text4: {
      title: '目录',
      href: ''
    },
    text5: '图像与文本覆盖',
    text6: '使用叠加文字可让您的客户了解您的品牌。选择与您的风格和故事相关的图像和文字。',
    text7: '精选系列',
    text8: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      title: '您的产品名称',
      href: '',
      price: '￥ 19.99',
      goodName: '您的产品名称',
      imgWidth: '6.09375rem',
      imgHeight: '6.09375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      title: '您的产品名称',
      href: '',
      price: '￥ 19.99',
      goodName: '您的产品名称',
      imgWidth: '6.25rem',
      imgHeight: '5.78125rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      title: '您的产品名称',
      href: '',
      price: '￥ 19.99',
      goodName: '您的产品名称',
      imgWidth: '7.5rem',
      imgHeight: '6.03125rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      title: '您的产品名称',
      href: '',
      price: '￥ 19.99',
      goodName: '您的产品名称',
      imgWidth: '6.09375rem',
      imgHeight: '6.09375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      title: '您的产品名称',
      href: '',
      price: '￥ 19.99',
      goodName: '您的产品名称',
      imgWidth: '6.25rem',
      imgHeight: '5.78125rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      title: '您的产品名称',
      href: '',
      price: '￥ 19.99',
      goodName: '您的产品名称',
      imgWidth: '7.5rem',
      imgHeight: '6.03125rem'
    }
    ],
    text9: '图像与文本',
    text10: '将大文本与图像配对，以便将焦点放在所选产品，集合或博客文章上。添加有关可用性，样式的详细信息，甚至提供评论。',
    text11: require('../../assets/administratorPanel/templateImg/50.png'),
    text12: '图片幻灯片',
    text13: '通过图片讲述您的品牌故事',
    text14: '快速链接',
    text15: '搜索',
    text16: '谈谈你的业务',
    text17: '与你的客户共享商品详细信息，促销或品牌内容',
    text18: '通讯',
    text19: 'Email address',
    text20: '订阅',
    text21: '©2019，Powered by shopify'
  },
  templeteTwo: { // 模板二
    text1: '在这里添加你的文字',
    text2: '添加您的公告消息',
    text3: '在这里添加标题',
    text4: require('../../assets/administratorPanel/templateImg/48.png'),
    text5: [{
      title: '在这里添加标题',
      list: [{
        one: '在这里添加·服务标题',
        two: '$10',
        three: '在这里添加·服务描述'
      },
      {
        one: '在这里添加·服务标题',
        two: '$10',
        three: '在这里添加·服务描述'
      }
      ]
    },
    {
      title: '在这里添加标题',
      list: [{
        one: '在这里添加·服务标题',
        two: '$10',
        three: '在这里添加·服务描述'
      },
      {
        one: '在这里添加·服务标题',
        two: '$10',
        three: '在这里添加·服务描述'
      }
      ]
    }
    ],
    text6: '图像与文本',
    text7: '使用图片和文字的组合与客户分享有关您品牌的信息。描述产品，分享公告或欢迎客户到您的商店',
    text8: '收集清单',
    text9: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      title: '收藏标题',
      imgWidth: '6.09375rem',
      imgHeight: '6.09375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      title: '收藏标题',
      imgWidth: '6.25rem',
      imgHeight: '5.78125rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      title: '收藏标题',
      imgWidth: '7.1875rem',
      imgHeight: '5.78125rem'
    }
    ],
    text10: '特色网格',
    text11: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      imgWidth: '5rem',
      imgHeight: '5rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      imgWidth: '5rem',
      imgHeight: '4.625rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/82.png'),
      imgWidth: '3.1875rem',
      imgHeight: '6.25rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      imgWidth: '5rem',
      imgHeight: '5.03125rem'
    }
    ],
    text12: '集合名称',
    text13: [{
      title: '产品名称',
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      oldPrice: '$ 44.99',
      newPrice: '$ 39.99',
      imgWidth: '4.375rem',
      imgHeight: '4.375rem'
    },
    {
      title: '产品名称',
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      oldPrice: '$ 44.99',
      newPrice: '$ 39.99',
      imgWidth: '4.375rem',
      imgHeight: '4.0625rem'
    },
    {
      title: '产品名称',
      imgsrc: require('../../assets/administratorPanel/templateImg/82.png'),
      oldPrice: '$ 44.99',
      newPrice: '$ 39.99',
      imgWidth: '2.875rem',
      imgHeight: '5.625rem'
    },
    {
      title: '产品名称',
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      oldPrice: '$ 44.99',
      newPrice: '$ 39.99',
      imgWidth: '5.3125rem',
      imgHeight: '4.28125rem'
    }
    ],
    text14: '谈谈你的品牌',
    text15: '使用此文本与您的客户分享您的品牌信息。描述产品，分享公告或欢迎客户到您的商店。',
    text16: {
      title: '视频',
      imgsrc: require('../../assets/administratorPanel/templateImg/video.png')
    },
    text17: '图像与文本',
    text18: '使用图片和文字的组合与客户分享有关您品牌的信息。描述产品，分享公告或欢迎客户到您的商店',
    text35: require('../../assets/administratorPanel/templateImg/48.png'),
    text19: 'Instagram的',
    text20: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      imgWidth: '4.375rem',
      imgHeight: '4.375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      imgWidth: '4.375rem',
      imgHeight: '4.0625rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/82.png'),
      imgWidth: '2.875rem',
      imgHeight: '5.625rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/26.png'),
      imgWidth: '4.375rem',
      imgHeight: '4.375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      imgWidth: '5.3125rem',
      imgHeight: '4.28125rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      imgWidth: '4.375rem',
      imgHeight: '4.375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      imgWidth: '4.375rem',
      imgHeight: '4.0625rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/82.png'),
      imgWidth: '2.875rem',
      imgHeight: '5.625rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/26.png'),
      imgWidth: '4.375rem',
      imgHeight: '4.375rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      imgWidth: '5.3125rem',
      imgHeight: '4.28125rem'
    }
    ],
    text21: {
      title: '在Instagram上关注@shopify',
      href: ''
    },
    text22: '订阅我们的新闻',
    text23: '一个简短的句子，用于描述订阅者将收到的内容',
    text24: 'Your email',
    text25: '订阅',
    text26: '地图',
    text27: '391 Sutter St,San Francisco Ca 94108, USA',
    text28: '在地图中打开',
    text29: '(555) 555-5555',
    text30: '周一至周五上午10点至下午6点',
    text31: '周六—周日中午12点至下午5点',
    text36: require('../../assets/administratorPanel/templateImg/48.png'),
    text32: '搜索',
    text33: '加入我们的时事通讯',
    text34: '主题由无际 | 由shopify提供支持'
  },
  templeteThree: { // 模板三
    text1: '在这里宣布一些事',
    text2: '大车',
    text3: 'Search',
    text4: 'mall',
    text5: '家',
    text6: '目录',
    text7: '图片幻灯片',
    text8: '新闻',
    text9: [{
      title: '你的帖子的标题→',
      detail: '您的商店尚未发布任何博客文章。博客可用于讨论您希望与客户分享的新产品发布，提示或其他新闻。您可以查看'
    },
    {
      title: '你的帖子的标题→',
      detail: '您的商店尚未发布任何博客文章。博客可用于讨论您希望与客户分享的新产品发布，提示或其他新闻。您可以查看'
    }
    ],
    text10: '本周流行',
    text11: [{
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4.6875rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4.34375rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4.6875rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/26.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/1.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4.6875rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4.34375rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4.6875rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/26.png')
    },
    {
      goodName: '示例产品标题',
      price: '$ 19.99',
      imgWidth: '4.6875rem',
      imgHeight: '4rem',
      imgsrc: require('../../assets/administratorPanel/templateImg/1.png')
    }
    ],
    text12: {
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      imgWidth: '8.75rem',
      imgHeight: '8.75rem',
      oldPrice: '¥ 29.99',
      newPrice: '¥ 19.99',
      title: '示例产品标题',
      text1: '添加到购物车',
      text2: '详细→'
    },
    text13: '最新消息',
    text14: '链接',
    text15: '搜索',
    text16: '关注我们',
    text17: '通讯',
    text18: '注册最新新闻，优惠和款式',
    text19: 'Your email',
    text20: '订阅',
    text21: '版权所有©2019，mall。由Shopify提供支持'
  },
  templeteFour: { // 模板四
    text1: '搜索',
    text2: 'mall',
    text3: '购物车',
    text4: {
      title: '家',
      href: ''
    },
    text5: {
      title: '目录',
      href: ''
    },
    text6: '免费标准送货',
    text7: '订单超过150英镑',
    text8: '从商店收集',
    text9: '$ 2下一天送到我们的纽约商店',
    text10: '幻灯片',
    text11: '用图像讲述你的故事',
    text12: '图像与文本',
    textimg: require('../../assets/administratorPanel/templateImg/50.png'),
    text13: '将大文本与图像配对，以便将焦点放在所选产品，集合或博客文章上。添加有关可用性，样式的详细信息，甚至提供评论。',
    text14: '阅读更多',
    text15: '精选系列',
    text16: '查看全部',
    text17: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      imgWidth: '4.5625rem',
      imgHeight: '4.5625rem',
      title: '产品名称',
      price: '¥12.34'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/49.png'),
      imgWidth: '4.6875rem',
      imgHeight: '4.6875rem',
      title: '产品名称',
      price: '¥12.34'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      imgWidth: '4.6875rem',
      imgHeight: '4.34375rem',
      title: '产品名称',
      price: '¥12.34'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/82.png'),
      imgWidth: '3.03125rem',
      imgHeight: '5.9375rem',
      title: '产品名称',
      price: '¥12.34'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/26.png'),
      imgWidth: '4.6875rem',
      imgHeight: '4.6875rem',
      title: '产品名称',
      price: '¥12.34'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/1.png'),
      imgWidth: '4.6875rem',
      imgHeight: '4rem',
      title: '产品名称',
      price: '¥12.34'
    }
    ],
    text18: '博客文章',
    text19: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/29.png'),
      imgWidth: '6.25rem',
      imgHeight: '6.25rem',
      title: '你的帖子的标题',
      text1: '您的商店尚未发布任何博客文章。博客可用于讨论您希望与客户分享的新产品发布，提示或其他新闻。您可以查看shopify的电子商务博客，获取您自己的商店和博客的灵感和建议。',
      textInfo: '2019年6月19日 - 作者姓名'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/111.png'),
      imgWidth: '6.25rem',
      imgHeight: '6.25rem',
      title: '你的帖子的标题',
      text1: '您的商店尚未发布任何博客文章。博客可用于讨论您希望与客户分享的新产品发布，提示或其他新闻。您可以查看shopify的电子商务博客，获取您自己的商店和博客的灵感和建议。',
      textInfo: '2019年6月19日 - 作者姓名'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      imgWidth: '6.25rem',
      imgHeight: '5.03125rem',
      title: '你的帖子的标题',
      text1: '您的商店尚未发布任何博客文章。博客可用于讨论您希望与客户分享的新产品发布，提示或其他新闻。您可以查看shopify的电子商务博客，获取您自己的商店和博客的灵感和建议。',
      textInfo: '2019年6月19日 - 作者姓名'
    }
    ],
    img: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
    text20: 'Instagram Feed',
    text28: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/198.png'),
      imgWidth: '4.875rem',
      imgHeight: '4.875rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/252.png'),
      imgWidth: '5rem',
      imgHeight: '4.625rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/82.png'),
      imgWidth: '3.1875rem',
      imgHeight: '6.25rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/26.png'),
      imgWidth: '4.875rem',
      imgHeight: '4.875rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/1.png'),
      imgWidth: '5.625rem',
      imgHeight: '4.8125rem'
    }
    ],
    text29: [{
      imgsrc: require('../../assets/administratorPanel/templateImg/29.png'),
      imgWidth: '6.25rem',
      imgHeight: '6.25rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/111.png'),
      imgWidth: '6.25rem',
      imgHeight: '6.25rem'
    },
    {
      imgsrc: require('../../assets/administratorPanel/templateImg/27.png'),
      imgWidth: '6.5625rem',
      imgHeight: '5.3125rem'
    }
    ],
    text21: '注册我们的通讯',
    text22: 'Email Address',
    text23: [{
      title: '免费邮寄！',
      imgsrc: '',
      href: ''
    },
    {
      title: '离你最近的商店',
      imgsrc: '',
      href: ''
    },
    {
      title: '礼品卡',
      imgsrc: '',
      href: ''
    },
    {
      title: '学生折扣',
      imgsrc: '',
      href: ''
    }
    ],
    text24: {
      title: '搜索',
      href: ''
    },
    text27: '©2019mall。通过主题清洁主题。由Edgeless提供支持'
  },
  allOrders: { // 所有订单
    text1: '订单',
    text2: '返回',
    text4: '筛选订单(可以搜索订单号,客户名,总金额)',
    text3: [{
      title: '所有订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/allOrdersTable',
      forActive: 'allOrdersTable'
    },
    {
      title: '未付款订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/notPayingTable',
      forActive: 'notPayingTable'
    },
    {
      title: '已付款未发货订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/paymentNotDeliveredTable',
      forActive: 'paymentNotDeliveredTable'
    },
    {
      title: '已付款已发货订单',
      href: '/administratorPanel/orderManagement/effectiveOrders/paymentAndDeliveredTable',
      forActive: 'paymentAndDeliveredTable'
    }
    ],
    table: { // 所有订单的表格
      text1: '编号',
      text2: '日期',
      text3: '客户',
      text4: '总金额',
      text5: '付款状态',
      text6: '交易状态',
      text7: '备注'
    }
  },
  orderDetailsPage: { // 订单详情页
    paymentNotDelivered: { // 已付款未发货

    }
  },
  determineOperating: { // 确认操作弹框
    text1: '确定',
    text2: '取消'
  },
  abandonedOrder: { // 弃单
    text1: '弃单',
    text2: [{
      title: '所有订单',
      href: '/administratorPanel/orderManagement/abandonedOrders/abandonedAllOrdersTable',
      forActive: 'abandonedAllOrdersTable'
    }]
  },
  registerPwd: { // 注册输入店铺密码
    title: '目前免费试用',
    inputTishi: '店铺密码',
    btn: '下一步',
    back: '返回',
    hint: {
      text1: '密码不能为空',
      text2: '密码为6-20位数字字母，支持非空格符号'
    }
  },
  forShop: { // 忘记商店地址
    title: '忘记商店地址',
    text: '输入您的电子邮件地址',
    inputTishi: '邮箱',
    btn: '下一步',
    back: '返回',
    hint: {
      text1: '邮箱不能为空',
      text2: '邮箱格式不正确',
      text3: '邮件发送成功',
      text4: '邮箱发送失败，请重试'
    }
  },
  forPwd: { // 忘记密码
    title: '忘记密码',
    text: '输入您的电子邮件地址',
    inputTishi: '邮箱',
    btn: '下一步',
    back: '返回',
    hint: {
      text1: '邮箱不能为空',
      text2: '邮箱格式不正确',
      text3: '邮件发送成功',
      text4: '该邮箱与店铺名不匹配，请重新输入'
    }
  },
  restPwd: { // 重置密码
    title: '重置密码',
    text1: '新密码',
    text2: '密码应不少于6个字符，开头和结尾都没有空格。',
    text3: '确认密码',
    btn: '重置密码',
    back: '返回',
    hint: {
      text1: '请输入新密码',
      text2: '密码为6-20位数字字母，支持非空格符号',
      text3: '2次密码输入不一致，请重新输入',
      text4: '密码重置成功，等待3S将返回到继续登录页面',
      text5: '密码重置失败,请重试'
    }
  },
  regMessage: { // 注册信息
    title: '请填写你的个人信息',
    text: '这将用作您的默认业务地址',
    FirstName: '',
    LastName: '',
    name: '姓名',
    Address: '地址',
    Apartment: '公寓、套房、房号等（可选）',
    City: '城市',
    ZIP: '邮政编码',
    Country: '国家/地区',
    province: '省份（州）',
    PhoneNumber: '电话号码',
    Business: '商务或个人网站（可选）',
    btn: '进入我的商店',
    back: '返回',
    hint: {
      text1: '注册成功，即将进入商店，请等待。。。。。',
      text2: '注册失败'
    },
    label1: '姓名',
    label2: '地址',
    label3: '公寓、套房、房号等（可选）',
    label4: '城市',
    label5: '邮政编码',
    label6: '国家/地区',
    label7: '省份（州）',
    label8: '电话号码',
    label9: '商务或个人网站（可选）'
  },
  templete: {
    templeteFive: {
      btn1: '加入购物车',
      btn2: '立即购买',
      header: {
        text1: '商场',
        text2: '搜索所有产品…',
        text3: '购物车',
        text4: [
          {
            title: '主页',
            href: '/templateFiveContent'
          },
          {
            title: '目录',
            href: '/shopProductFive/page5'
          }
        ]
      },
      main: {
        imgs: [{
          'picture': require('../../assets/administratorPanel/templateImg/48.png')
        },
        {
          'picture': require('../../assets/administratorPanel/templateImg/252.png')
        },
        {
          'picture': require('../../assets/administratorPanel/templateImg/27.png')
        }
        ],
        shopFor: [{
          'src': require('../../assets/administratorPanel/templateImg/198.png'),
          text: '特色馆藏'
        },
        {
          'src': require('../../assets/administratorPanel/templateImg/252.png'),
          text: '特色馆藏'
        }
        ],
        featured: [{
          title: '特色资源',
          text1: '更多 >',
          featuredBox: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          }
          ]
        },
        {
          title: '特色资源',
          text1: '更多 >',
          featuredBox: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          }
          ]
        },
        {
          title: '特色资源',
          text1: '更多 >',
          featuredBox: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text: '示例的产品标题',
            price: '$19.99'
          }
          ]
        }
        ],
        content1: {
          text1: '购买某物',
          text2: '更多的种类  >',
          text3: '特色馆藏'
        },
        content2: {
          text1: '特色馆藏',
          text2: '更多  >',
          text3: '示例的产品标题',
          price: '$19.99'
        }
      },
      footer: {
        content1: {
          text1: '快速链接',
          text2: '选择一个链接列表，显示在你的主题设置下面',
          text3: '页脚',
          text4: '>',
          text5: '快速链接链接列表。'
        },
        content2: {
          text1: '取得联系',
          text2: '使用这篇文章与你的客户分享你的品牌信息。'
        },
        content3: {
          text1: '时事通讯',
          text2: '促销，新产品和销售，直接到你的收件箱。',
          input: '电子邮箱信箱',
          btn: '签约'
        },
        content4: {
          text1: '©2019 mall',
          text2: '技术支持由Edgeless提供'
        }
      }
    },
    templeteSix: {
      header: {
        text1: '宣布一些东西',
        text2: [
          {
            title: '主页',
            href: '/templateSixContent'
          },
          {
            title: '目录',
            href: '/shopProductSix/page6'
          }
        ],
        text4: '商场',
        text5: '搜索',
        text6: '购物车'
      },
      imgData: [{
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: '标题是here1',
        text2: '副标题是here1'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: '标题是here2',
        text2: '副标题是here2'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/50.png'),
        text1: '标题是here3',
        text2: '副标题是here3'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: '标题是here4',
        text2: '副标题是here4'
      },
      {
        src: require('../../assets/administratorPanel/templateImg/27rectangle.png'),
        text1: '标题是here5',
        text2: '副标题是here5'
      }
      ],
      main: {
        content1: {
          text1: '标题或影响文本在这里。',
          text2: '使用这篇文章与你的客户分享你的品牌信息。描述一个产品，分享公告，或者欢迎顾客来到你的商店。'
        },
        content3: {
          text1: '标题就在这里',
          text2: '示例的产品标题',
          price: '¥19.99'
        },
        box4Data: [{
          text1: '示例集合标题',
          text2: '使用此文本共享关于您的集合的信息。',
          text3: '商店所有',
          box4Img: [{
            src: require('../../assets/administratorPanel/templateImg/252.png'),
            text1: '示例的产品标题',
            text2: '¥19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/198.png'),
            text1: '示例的产品标题',
            text2: '¥19.99'
          },
          {
            src: require('../../assets/administratorPanel/templateImg/27.png'),
            text1: '示例的产品标题',
            text2: '¥19.99'
          }
          ]
        }],
        content4: {
          text1: '示例集合标题',
          text2: '使用此文本共享关于您的集合的信息。',
          text3: '商店所有'
        },
        content5: {
          text1: '标题或影响文本在这里。',
          text2: '使用这篇文章与你的客户分享你的品牌信息。描述一个产品，分享公告，或者欢迎顾客来到你的商店。',
          text3: '示例的产品标题',
          btn: '加入购物车'
        }
      },
      footer: {
        content1: {
          text1: '签署我们的',
          text2: '时事通讯',
          text3: '接受特别优惠，先看看新产品。',
          input: '输入电子邮件',
          btn: '订阅'
        },
        content2: {
          text1: '照片墙',
          text2: '用这篇文字和你的顾客分享instagram上的帖子。'
        },
        content3: {
          text1: '访问我们的商店',
          text2: '123 假的.',
          text3: '加拿大多伦多',
          text4: '星期一至五，上午十时至晚上九时',
          text5: '星期六上午11时至晚上9时',
          text6: '星期日上午11时至下午5时',
          text7: '查看谷歌地图'
        },
        content4: {
          text1: '商场',
          text2: '用这个来添加关于你的商店的额外信息。',
          text3: '地址/联系方式。',
          text4: '主页',
          text5: '目录',
          text6: '搜索',
          text7: '接受特别优惠，先看看新产品。',
          input: '输入电子邮件',
          btn: '订阅'
        },
        content5: {
          text1: '©2019 商场',
          text2: '技术支持来自 Shopify',
          text3: '开关级联主题'
        }
      }
    },
    templeteSeven: {
      header: {
        text1: '宣布一些东西',
        text2: [
          {
            title: '主页',
            href: '/templateSevenContent'
          },
          {
            title: '目录',
            href: '/shopProductSeven/page7'
          }
        ],
        text4: '商场',
        text5: '美元',
        text6: '搜索',
        text7: '购物车-',
        text8: '带有文本覆盖的图像',
        text9: '在特征图像上显示大文本'
      },
      main: {
        imgData: [{
          src: require('../../assets/administratorPanel/templateImg/198.png'),
          text1: '示例的产品标题',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/49.png'),
          text1: '示例的产品标题',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/252.png'),
          text1: '示例的产品标题',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/82.png'),
          text1: '示例的产品标题',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/26.png'),
          text1: '示例的产品标题',
          price: '$2.91'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/1.png'),
          text1: '示例的产品标题',
          price: '$2.91'
        }
        ],
        mainBox3: [{
          src: require('../../assets/administratorPanel/templateImg/50.png'),
          text1: '2016年12月25日',
          text2: '你的文章的标题',
          text3: '您的商店还没有发布任何博客文章。博客可以用来聊天\n' +
              '有关新产品发布、小贴士或其他你想与你的\\n\' +分享的新闻\n' +
              '的客户。你可以在Shopify的电子商务博客上寻找灵感和灵感\n' +
              '给你自己的商店和博客的建议。'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png'),
          text1: '2016年12月25日',
          text2: '你的文章的标题',
          text3: '您的商店还没有发布任何博客文章。博客可以用来聊天\n' +
              '有关新产品发布、小贴士或其他你想与你的\\n\' +分享的新闻\n' +
              '的客户。你可以在Shopify的电子商务博客上寻找灵感和灵感\n' +
              '给你自己的商店和博客的建议。'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/50.png'),
          text1: '2016年12月25日',
          text2: '你的文章的标题',
          text3: '您的商店还没有发布任何博客文章。博客可以用来聊天\n' +
              '有关新产品发布、小贴士或其他你想与你的\\n\' +分享的新闻\n' +
              '的客户。你可以在Shopify的电子商务博客上寻找灵感和灵感\n' +
              '给你自己的商店和博客的建议。'
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
          text1: '欢迎光临本店',
          text2: '使用此文本块显示商店公告、广告戳',
          text3: '分享品牌或产品细节',
          text4: '将较大的文本与图像配对，以使您选择的产品、集合或博客文章具有重点。添加可用性、样式的详细信息，甚至提供评审。'
        },
        content2: {
          text1: '带有文本覆盖的图像',
          text2: '在特征图像上显示大文本',
          text3: '从博客',
          text4: '明星杂志款',
          text5: '带有文本覆盖的图像',
          text6: '在特征图像上显示大文本'
        },
        content3: {
          text1: '照片分享',
          text2: '全球免费送货',
          text3: '点击这里获取更多信息',
          text4: '最后清仓大减价',
          text5: '七折优惠',
          text6: '推广链接3',
          text7: '链接到一个集合，产品，博客文章…',
          text8: '加入我们的邮寄名单',
          input: '输入电子邮件'
        }
      },
      footer: {
        text1: '联系我们',
        text2: '与您的cus共享商店详细信息、促销活动或品牌内容',
        text3: '链接',
        text4: '搜索',
        text5: '时事通讯',
        input: 'email@example.com',
        btn: '订阅',
        text7: '© 2019, zengyao1',
        text8: '技术支持 无际',
        text9: '由WeTheme设计'
      }
    },
    templeteEight: {
      header: {
        text1: '搜索',
        text2: '与顾客分享商店公告',
        text3: '人民币',
        text4: '购物车',
        text5: [
          {
            title: '主页',
            href: '/templateEightContent'
          },
          {
            title: '目录',
            href: '/shopProductEight/page8'
          }
        ],
        text7: '商场'
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
          text: '抽样产品',
          price: '$9.99'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/252.png'),
          text: '抽样产品',
          price: '$9.99'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/82.png'),
          text: '抽样产品',
          price: '$9.99'
        },
        {
          src: require('../../assets/administratorPanel/templateImg/27.png'),
          text: '抽样产品',
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
        text1: '精选集',
        imgText: '带有文本覆盖的图像',
        text2: '主打产品',
        text3: '你的产品的名字',
        text4: '此区域用于描述产品的详细信息。告诉客户你产品的外观、感觉和风格。添加关于颜色、使用的材料、尺寸和产地的详细信息。',
        text5: '9.99',
        text6: '13.99',
        btn: '加入购物车',
        text7: '订阅我们的通讯',
        text8: '使用叠加文字，让你的客户了解你的品牌。选择与你的风格和故事相关的图片和文本。',
        input: '电子邮件地址',
        btn2: '加入',
        text9: '在Instagram上关注我们',
        text10: '与你的客户分享特别销售或公告.'
      },
      footer: {
        text1: '关于我们',
        text2: '自2013年以来，帕克先生提供的服务最多',
        text3: '关于点时尚和生活方式配件。',
        text4: '我们集合',
        text5: '搜索',
        text6: '探索',
        text7: '主页',
        text8: '目录',
        text9: '连接',
        text10: '加入我们的邮件列表更新',
        input: '电子邮件地址',
        btn: '加入',
        text11: '版权所有©2019 mall•Shopify Theme by Underground•Powered'
      }
    }
  }
}
// =============所有产品
export const product = {
  header: {
    title: '所有产品',
    btn: '添加产品',
    search: '搜索产品',
    allText: '所有'
  },
  edit: {
    text: '编辑产品',
    text2: {
      title: '编辑',
      list: [
        { text: '产品上架' },
        { text: '产品下架' },
        { text: '删除选中产品' },
        { text: '添加到产品系列' },
        { text: '从产品系列中删除' }
      ]
    }
  },
  table: {
    thead: {
      th1: '商品',
      th2: '库存',
      th3: '类型',
      th4: '供应商'
    },
    tbody: {
      text: '个多属性的库存'
    }
  },
  searchHint: {
    text1: '找不到任何产品',
    text2: '尝试更改过滤器或搜索词'
  },
  elDialog: {
    text1: '件产品 ？',
    place: '搜索集合',
    text2: '未找到结果',
    btn1: '取 消',
    btn2: '保 存'
  },
  addHint: {
    text1: '添加您的产品',
    text2: '通过添加产品或导入现有产品库存以更早迎来第一笔销售',
    btn: '添加产品'
  },
  hint: {
    text1: '此操作将永久删除选中的产品, 是否继续?',
    text2: '提示',
    text3: '确定',
    text4: '取消',
    text5: '已取消删除',
    text6: '是否添加',
    text7: '您将添加',
    text8: '件产品到产品系列：',
    text9: '确定要删除',
    text10: '您将从产品系列中删除',
    text11: '件产品：'
  }
}
// ==================库存
export const inventory = {
  header: {
    title: '库存',
    btn: '查看产品',
    search: '搜索库存',
    allText: '所有',
    select: {
      placeholder: '请选择'
    }
  },
  edit: {
    text: '编辑多属性',
    text2: {
      title: '其它操作',
      list: { text1: '更新数量' }
    }
  },
  btnSet: [
    {
      text: '添加',
      judge: true
    },
    {
      text: '设置',
      judge: false
    }
  ],
  table: {
    thead: {
      th1: '商品',
      th2: '传入',
      th3: '可用',
      th4: '编辑可用数量'
    },
    tbody: {
      btn1: '添加',
      btn2: '设置',
      label1: '描述文字',
      btn3: '保存'
    }
  },
  elDialog: {
    title: '更新数量',
    label: '描述文字',
    text1: '个多属性将更改：',
    btn1: '取 消',
    btn2: '保 存'
  },
  searchHint: {
    text1: '找不到任何产品',
    text2: '尝试更改过滤器或搜索词'
  },
  addHint: {
    text1: '管理您的库存',
    text2: '为每个产品启用库存更新以在库存水平较低时进行查看。',
    btn1: '查看产品'
  }
}
// ========================产品系列
export const productLine = {
  header: {
    title: '产品系列',
    text1: '所有',
    btn1: '创建产品系列',
    search: '搜索产品系列',
    btn2: '编辑'
  },
  edit: {
    text: '编辑产品',
    text2: {
      title: '编辑',
      list: [
        { text: '产品上架' },
        { text: '产品下架' },
        { text: '删除选中产品' },
        { text: '添加到产品系列' },
        { text: '从产品系列中删除' }
      ]
    }
  },
  table: {
    thead: {
      th1: '标题',
      th2: '产品条件'
    },
    tbody: {
      text: '不可用'
    }
  },
  searchHint: {
    text1: '找不到任何产品',
    text2: '尝试更改过滤器或搜索词'
  },
  addHint: {
    title: '产品系列',
    text1: '将您的产品整理到产品系列中',
    text2: '产品系列是您创建用来帮助您的客户查找产品的类别。',
    btn: '创建产品系列'
  },
  list: [
    { text: '提供产品系列' },
    { text: '暂停提供产品系列' },
    { text: '删除所选产品系列' }
  ],
  hint: {
    text1: '无法恢复已删除的产品系列。您是否仍要继续？',
    text2: '删除',
    text3: '个产品系列',
    btn1: '确定',
    btn2: '取消',
    btn3: '删除成功!',
    btn4: '已取消删除'
  }
}
// ======================添加产品
export const addShop = {
  header: {
    title: '添加产品',
    back: '返回'
  },
  shopName: '产品名称',
  shopMs: '产品描述',
  proImg: {
    shopUp: '上传图片',
    shopImg: '产品图片',
    content1: '预览',
    content2: '删除'
  },
  price: {
    title: '价格',
    text1: '现价',
    text2: '原价',
    text3: '成本价',
    text4: '预计利润率：'
  },
  repertory: {
    title: '库存',
    text1: 'SKU(货号)',
    text2: '条码 (ISBN、UPC、GTIN 等)',
    text3: '跟踪数量',
    text4: '缺货后继续销售',
    text5: '数量',
    text6: '编辑位置',
    text7: '位置',
    text8: '可用'
  },
  transportation: {
    title: '运输',
    text1: '需要运输',
    text2: '重量',
    text3: '用于在结账时计算运费。',
    text4: '重量',
    text5: '购买此产品时，客户不会输入他们的送货地址或选择送货方式。'
  },
  multiAttribute: {
    title: '多个属性',
    elCheckbox: '此产品有多个选项，例如不同的尺寸或颜色',
    text1: '选项名称',
    text2: '选项值',
    btn: '添加其他选项',
    showText1: '显示',
    showText2: '属性',
    showText3: '已选择',
    showText4: '个',
    li1: '编辑价格',
    li2: '编辑数量',
    li3: '编辑SKU',
    li4: '编辑条码',
    btn2: '编辑多属性',
    text3: '在售渠道',
    text4: '位置',
    text5: '可用'
  },
  save: '保存',
  elDialogSite: {
    title: '编辑位置',
    text1: '您必须为产品选择至少一个位置。',
    text2: '选择存放此产品的位置。',
    btn1: '取 消',
    btn2: '保 存'
  },
  elDialogPrice: {
    title: '编辑价格',
    text1: '将价格应用于所有多属性',
    btn1: '全部应用',
    btn2: '取 消',
    btn3: '保 存'
  },
  elDialogLocation: {
    title: '编辑数量',
    span1: '编辑',
    span2: '处的数量',
    text1: '将数量应用于所有多属性',
    btn1: '全部应用',
    btn2: '取 消',
    btn3: '保 存',
    btn4: '已完成',
    text2: '选择要编辑数量的位置'
  },
  elDialogSku: {
    title: '编辑 SKU （货号）',
    btn1: '取 消',
    btn2: '已完成'
  },
  elDialogCode: {
    title: '编辑条码',
    btn1: '取 消',
    btn2: '已完成'
  },
  elDialogEdit: {
    title: '正在编辑:',
    elCheckbox: '创建此多属性',
    span1: '价格',
    span2: '预计利润率：',
    span3: '成本价',
    span4: 'SKU （货号）',
    span5: '条码 （ISBN、UPC、GTIN 等）',
    span6: '数量',
    span7: '编辑位置',
    span8: '位置名称',
    span9: '可用',
    btn1: '取 消',
    btn2: '已完成'
  },
  hint: {
    text1: '最多只能上传',
    text2: '张图片！',
    text3: '添加重复',
    text4: '输入重复'
  }
}
// ===========================批量编辑
export const bulkEdit = {
  header: {
    title: '批量编辑器',
    back: '返回'
  },
  content: {
    text1: '目前正在编辑这些字段：',
    btn1: '添加字段',
    lable1: '标题',
    lable2: '价格',
    lable3: '原价',
    lable4: '成本价',
    lable5: 'SKU',
    lable6: '条码',
    lable7: '重量单位',
    lable8: '重量'
  },
  save: '保存',
  ziDuanData: [
    {
      title: '属性',
      property: [
        {
          text: '标题',
          fields: 'goodsname',
          judge: true
        }
      ]
    },
    {
      title: '定价',
      property: [
        {
          text: '价格',
          fields: 'price',
          judge: true
        },
        {
          text: '原价',
          fields: 'oldprice',
          judge: false
        },
        {
          text: '成本价',
          fields: 'costprice',
          judge: false
        }
      ]
    },
    {
      title: '库存',
      property: [
        {
          text: 'SKU',
          fields: 'sku',
          judge: true
        },
        {
          text: '条码',
          fields: 'itemcode',
          judge: false
        },
        {
          text: '重量单位',
          fields: 'unitid',
          judge: false
        },
        {
          text: '重量',
          fields: 'weight',
          judge: false
        }
      ]
    }
  ]
}
// ===========================产品详情
export const productDetails = {
  header: {
    back: '返回'
  },
  shopName: '产品名称',
  shopMs: '产品描述',
  proImg: {
    shopUp: '上传图片',
    shopImg: '产品图片',
    content1: '预览',
    content2: '删除'
  },
  price: {
    title: '价格',
    text1: '现价',
    text2: '原价',
    text3: '成本价',
    text4: '预计利润率：'
  },
  repertory: {
    title: '库存',
    text1: 'SKU(货号)',
    text2: '条码 (ISBN、UPC、GTIN 等)',
    text3: '跟踪数量',
    text4: '缺货后继续销售',
    text5: '数量',
    text6: '编辑位置',
    span1: '查看库存历史记录',
    span2: '位置名称',
    text7: '传入',
    text8: '可用',
    span3: '按以下内容调整',
    span4: '新数量',
    span5: '初始',
    span6: '新的数量',
    btn1: '取 消',
    btn2: '保 存',
    span7: '总计'
  },
  transportation: {
    title: '运输',
    text1: '需要运输',
    text2: '重量',
    text3: '用于在结账时计算运费。',
    text4: '重量',
    text5: '购买此产品时，客户不会输入他们的送货地址或选择送货方式。'
  },
  haveMultiAttribute: {
    title: '多个属性',
    span1: '添加多属性',
    span2: '其它操作',
    li: '编辑选项',
    span3: '显示',
    span4: '个 多属性',
    span5: '已选择',
    span6: '个',
    btn1: '打开批量编辑器',
    btn2: '编辑多属性',
    li1: '编辑价格',
    li2: '编辑数量',
    li3: '编辑选项值',
    li4: '编辑SKU',
    li5: '编辑条码',
    li6: '删除多属性',
    span7: '处的总库存',
    span8: '件在销售'
  },
  noMultiAttribute: {
    title: '多个属性',
    elCheckbox: '此产品有多个选项，例如不同的尺寸或颜色',
    text1: '选项名称',
    text2: '选项值',
    btn: '添加其他选项',
    showText1: '显示',
    showText2: '属性',
    showText3: '已选择',
    showText4: '个',
    li1: '编辑价格',
    li2: '编辑数量',
    li3: '编辑SKU',
    li4: '编辑条码',
    btn2: '编辑多属性',
    text3: '在售渠道',
    text4: '位置',
    text5: '可用'
  },
  delBtn: '删除产品',
  saveBtn: '保存',
  // ===========================有多属性模态框
  haveElDialogSite: {
    title: '编辑位置',
    text1: '您必须为产品选择至少一个位置。',
    text2: '选择存放此产品的位置。',
    text3: '此位置的。',
    text4: '个库存单位将被删除。',
    btn1: '取 消',
    btn2: '保 存'
  },
  haveElDialogPrice: {
    title: '编辑价格',
    text1: '将价格应用于所有多属性',
    text2: '成本价 •',
    text3: '预计利润率：',
    btn1: '全部应用',
    btn2: '取 消',
    btn3: '保 存'
  },
  haveElDialogOptions: {
    title: '编辑选项值',
    btn1: '取 消',
    btn2: '保 存'
  },
  haveElDialogLocation: {
    title: '编辑数量',
    span1: '编辑',
    span2: '处的数量',
    text1: '将数量应用于所有多属性',
    btn1: '全部应用',
    span3: '未存放在该',
    span4: '位置',
    span5: '无法编辑库存，因为',
    span6: '处没有存放任何多属性。',
    btn2: '取 消',
    btn3: '保 存',
    btn4: '已完成',
    text2: '选择要编辑数量的位置'
  },
  haveElDialogOption: {
    title: '编辑选项',
    text1: '请确保填写所有字段。',
    text2: '删除',
    text3: '添加其它选项',
    btn1: '取 消',
    btn2: '保 存'
  },
  haveElDialogImg: {
    title: '编辑上传多属性图片',
    btn1: '取消选中',
    btn2: '取 消',
    btn3: '保 存',
    btn4: '上传图片'
  },
  haveElDialogSku: {
    title: '编辑 SKU （货号）',
    btn1: '取 消',
    btn2: '保 存'
  },
  haveElDialogCode: {
    title: '编辑条码',
    btn1: '取 消',
    btn2: '保 存'
  },
  // ===========================无多属性模态框
  elDialogSite: {
    title: '编辑位置',
    text1: '您必须为产品选择至少一个位置。',
    text2: '选择存放此产品的位置。',
    btn1: '取 消',
    btn2: '保 存'
  },
  elDialogPrice: {
    title: '编辑价格',
    text1: '将价格应用于所有多属性',
    text2: '成本价 •',
    text3: '预计利润率：',
    btn1: '全部应用',
    btn2: '取 消',
    btn3: '保 存'
  },
  elDialogLocation: {
    title: '编辑数量',
    span1: '编辑',
    span2: '处的数量',
    text1: '将数量应用于所有多属性',
    btn1: '全部应用',
    btn2: '取 消',
    btn3: '保 存',
    btn4: '已完成',
    text2: '选择要编辑数量的位置'
  },
  elDialogSku: {
    title: '编辑 SKU （货号）',
    btn1: '取 消',
    btn2: '已完成'
  },
  elDialogCode: {
    title: '编辑条码',
    btn1: '取 消',
    btn2: '已完成'
  },
  elDialogEdit: {
    title: '正在编辑:',
    elCheckbox: '创建此多属性',
    span1: '价格',
    span2: '预计利润率：',
    span3: '成本价',
    span4: 'SKU （货号）',
    span5: '条码 （ISBN、UPC、GTIN 等）',
    span6: '数量',
    span7: '编辑位置',
    span8: '位置名称',
    span9: '可用',
    btn1: '取 消',
    btn2: '已完成'
  },
  hint: {
    text1: '所有位置',
    text2: '调整数量',
    text3: '设置数量',
    text4: '添加重复',
    text5: '输入重复',
    text6: '请确保字段填写完整',
    text7: '此操作将永久删除选中的多属性, 是否继续?',
    btn1: '提示',
    btn2: '确定',
    btn3: '取消',
    btn4: '删除成功',
    btn5: '已取消删除',
    btn6: '确认关闭？',
    text8: '当前没有可以修改的',
    text9: '最多只能上传',
    text10: '张图片！',
    text11: '此操作将永久删除该图片, 是否继续?',
    text12: '请添加产品名称',
    text13: '此操作将永久删除该产品，无法撤回, 是否继续?'
  }
}
// ========================产品系列详情
export const productLineDetail = {
  header: {
    back: '返回'
  },
  content: {
    text1: '产品名称',
    text2: '描述 （选填）',
    title1: '产品系列图片',
    text3: '上传图片',
    text4: '更改图片',
    text5: '编辑图片替换文字',
    text6: '删除',
    text7: '编辑',
    text8: '产品',
    place1: '搜索产品',
    place2: '请选择',
    btn1: '浏览',
    text9: '此产品系列中没有产品',
    text10: '删除产品系列',
    text11: '保存'
  },
  elDialogPro: {
    title: '编辑产品',
    place: '搜索产品',
    text1: '找不到“',
    text2: '”的相关结果',
    btn1: '取 消',
    btn2: '保 存'
  },
  elDialogImg: {
    title: '编辑图片替换文字',
    text1: '图片替代文字',
    text2: '写下此图片的简短描述，从而针对视觉障碍客户改善搜索引擎优化 (SEO) 和可访问性。',
    btn1: '取 消',
    btn2: '保 存'
  },
  elDialogDel: {
    title1: '删除',
    title2: '?',
    text1: '此操作无法撤消。',
    btn1: '取 消',
    btn2: '删除产品系列'
  },
  options: [
    { value: 'LA', label: '产品名称A-Z' },
    { value: 'LD', label: '产品名称Z-A' },
    { value: 'PA', label: '最高价格' },
    { value: 'PD', label: '最低价格' },
    { value: 'TA', label: '时间新-旧' },
    { value: 'TD', label: '时间旧-新' }
  ],
  hint: {
    text1: '请添加产品名称'
  }
}
// =========================创建产品系列
export const addProductLine = {
  header: {
    title: '创建产品系列',
    back: '返回'
  },
  content: {
    text1: '产品名称',
    text2: '描述 （选填）',
    title1: '产品系列图片',
    text3: '上传图片',
    text4: '更改图片',
    text5: '编辑图片替换文字',
    text6: '删除',
    text7: '编辑',
    span1: '产品系列类型',
    span2: '手动',
    span3: '手动将产品添加到此系列中。详细了解',
    span4: '手动创建的产品系列。',
    span5: '自动',
    span6: '符合您所设置的条件的现有产品和将来的产品会自动被添加到此产品系列中。详细了解',
    span7: '自动生成的产品系列。',
    span8: '条件',
    span9: '条件匹配选项：',
    span10: '所有条件',
    span11: '任何条件',
    span12: '为“',
    span13: '”输入一些文本。',
    place1: '请选择',
    btn1: '添加其它条件',
    btn2: '保存'
  },
  elDialogImg: {
    title: '编辑图片替换文字',
    text1: '图片替代文字',
    text2: '写下此图片的简短描述，从而针对视觉障碍客户改善搜索引擎优化 (SEO) 和可访问性。',
    btn1: '取 消',
    btn2: '保 存'
  },
  ifData: [
    {
      mulTitle: '1', // 多属性的标题
      mulJudgement: '7', // 多属性判断条件
      titleOptions: [
        {
          value: '1',
          label: '产品名称'
        }, {
          value: '2',
          label: '产品类别'
        }, {
          value: '3',
          label: '产品供应商'
        }, {
          value: '4',
          label: '产品价格'
        }, {
          value: '5',
          label: '产品标签'
        }, {
          value: '6',
          label: '原价'
        }, {
          value: '7',
          label: '重量'
        }, {
          value: '8',
          label: '库存'
        }, {
          value: '9',
          label: '多属性的标题'
        }
      ], // 多属性的标题的下拉选项
      judgemenToptions: [
        {
          value: '1',
          label: '等于',
          disabled: false
        }, {
          value: '2',
          label: '不等于',
          disabled: false
        }, {
          value: '3',
          label: '大于',
          disabled: true
        }, {
          value: '4',
          label: '小于',
          disabled: true
        }, {
          value: '5',
          label: '开头为',
          disabled: false
        }, {
          value: '6',
          label: '结尾为',
          disabled: false
        }, {
          value: '7',
          label: '包含',
          disabled: false
        }, {
          value: '8',
          label: '不包含',
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
    text1: '请添加产品名称'
  }
}
// =============================多属性详情
export const mulAttrDetails = {
  header: {
    back: '返回'
  },
  editSetNum: [{ text: '调整数量' }, { text: '设置数量' }],
  content: {
    text1: '多属性',
    text2: '种属性',
    text3: '选项',
    text4: '添加图片',
    text5: '更改图片',
    text6: '定价',
    text7: '现价',
    text8: '原价',
    text9: '成本价',
    text10: '预计利润率：',
    text11: '需要税收',
    siteNum: {
      text1: '库存',
      text2: 'SKU(货号)',
      text3: '条码 (ISBN、UPC、GTIN 等)',
      text4: '跟踪数量',
      text5: '缺货后继续销售',
      slot: '数量',
      text6: '查看库存历史记录',
      text7: '编辑位置',
      text8: '位置名称',
      text9: '传入',
      text10: '可用',
      text11: '按以下内容调整',
      text12: '新数量',
      text13: '初始',
      text14: '新的数量',
      btn1: '取 消',
      btn2: '保 存',
      slot2: '总计',
      text15: '发货',
      text16: '需要运输',
      text17: '重量',
      text18: '用于计算运费',
      text19: '购买此产品时，客户不会输入他们的送货地址或选择送货方式。'
    }
  },
  elDialogImg: {
    title: '编辑上传多属性图片',
    text1: '取消选中',
    btn: '上传图片',
    btn1: '取 消',
    btn2: '已完成'
  },
  elDialogSite: {
    title: '编辑位置',
    text1: '您必须为产品选择至少一个位置。',
    text2: '选择存放此产品的位置。',
    text3: '此位置的 ',
    text4: '个库存单位将被删除。 ',
    btn1: '取 消',
    btn2: '保存'
  }
}
// ===================设置
export const setting = {
  header: {
    title: '设置'
  },
  setData: [
    {
      class: 'iconfont icon-location',
      text1: '位置',
      text2: '管理存放存库的位置，发货订单和销售产品',
      href: '/settings/setDetail',
      permission: ['11']
    },
    {
      class: 'iconfont icon-yonghu1',
      text1: '账户',
      text2: '管理您的账户和权限',
      href: '/settings/userControl',
      permission: ['12']
    },
    {
      class: 'iconfont icon-qian',
      text1: '订单金额',
      text2: '查看您的商店金额',
      href: '/settings/ordersStatistics',
      permission: ['12']
    },
    {
      class: 'iconfont icon-shezhi1',
      text1: '一般设置',
      text2: '查看并更新您的商店详细信息',
      href: '/settings/userControl',
      permission: ['12']
    },
    // {
    // class: 'iconfont icon-bangding',
    // text1: '运输',
    // text2: '管理您向客户发送订单的方式',
    // href: '/administratorPanel/settings/transport/shipping',
    // permission: ['12']
    // },
    {
      class: 'iconfont icon-shezhi1',
      text1: '设置banner',
      text2: '设置轮播图',
      href: '/administratorPanel/settings/slideshow',
      permission: ['12']
    }
  ]
}
// ==================员工登录查看个人资料
export const staffDetail = {
  title: '个人资料',
  text1: '详细信息',
  text2: '首选语言',
  text3: '登录 无际 后，这将是您看到的语言。这不会影响您的在线商店向您的客户显示的语言。',
  text4: '语言',
  place: '请选择',
  text5: '个人信息'
}
// ===================仓库位置
export const setDetail = {
  header: {
    back: '返回',
    title: '位置',
    btn1: '添加位置'
  },
  content: {
    title: '位置',
    text1: '管理存放库存的位置、发货订单并销售产品。',
    text2: '您正在使用适用于您的套餐的',
    slot1: '个（最多 4 个）位置。',
    text3: '比较套餐',
    li1: '已停用位置',
    text4: '发货先后顺序',
    text5: '选择首先向哪些位置分配新订单。',
    text6: '详细了解',
    text7: '将订单分配给各个位置。',
    text8: '位置',
    text9: '编辑发货优先顺序',
    span1: '显示',
    span2: '个已停用位置',
    span3: '隐藏',
    span4: '个已停用位置'
  },
  elDialog: {
    title: '编辑发货优先顺序',
    text1: '拖动位置以对其重新排序。首先向位于列表顶部的位置分配订单。如果一个位置无法发货整个订单，则将拆分该订单，并将其分配给多个位置。',
    btn1: '取 消',
    btn2: '保 存'
  }
}
// ================添加仓库和仓库详情
export const addSet = {
  header: {
    back: '返回',
    text1: '添加位置'
  },
  hint: {
    text1: '请输入位置名称',
    text2: '选择位置',
    text3: '请选择替换位置'
  },
  label: {
    text1: '地址',
    text2: '公寓、套房、房号等（可选）',
    text3: '城市',
    text4: '国家/地区',
    text5: '省份',
    text6: '邮政编码'
  },
  content: {
    text1: '位置',
    text2: '管理存放库存的位置、发货订单并销售产品。',
    text3: '您正在使用适用于您的套餐的 2 个（最多 4 个）位置。',
    text4: '比较套餐',
    text5: '位置名称',
    place1: '巴黎仓库',
    text6: '发货此位置的在线订单',
    text7: '此位置的库存可用于在线销售',
    slot: '地址',
    label1: '电话',
    place2: '请输入内容',
    place3: '请选择',
    btn1: '删除位置',
    btn2: '保 存'
  },
  elDialogSite: {
    title: '停用位置',
    text1: '您可以随时重新激活此位置。',
    text2: '要停用',
    text3: ', 您需要选择一个接替位置：',
    text4: '目的地',
    btn1: '取 消',
    btn2: '保 存'
  },
  elDialogDel: {
    title: '删除位置',
    text1: '您是否确定要删除 位置。',
    text2: '？此操作无法撤消。',
    btn1: '取 消',
    btn2: '删除位置'
  },
  blockData: {
    title: '停用位置',
    text1: '乙停用的位置不会计入位置限制（4 个）',
    text2: '详情了解',
    text3: '位置限制',
    p1: '如果此位置不用于存放库存、发货订单或销售产品，请将其停用。',
    btn: '停用位置'
  },
  blockData1: {
    title: '激活位置',
    text1: '活跃的位置会影响您的 4 位置限制。',
    text2: '详情了解',
    text3: '位置限制',
    p1: '如果此位置用于存放库存、发货订单或销售产品，则将其激活。',
    btn: '激活位置'
  }
}
// ===============添加员工
export const addUser = {
  header: {
    title: '添加员工账号',
    back: '返回',
    btn: '发送邀请'
  },
  content: {
    text1: '员工账号',
    text2: '通过向员工发送邀请为他们提供访问您商店的权限。如果您与设计人员、开发人员或营销人员合作，请了解如何 允许合作者访问您的商店',
    label1: '名字',
    label2: '姓氏',
    label3: '电子邮件',
    text3: '此员工帐户将拥有完全权限',
    text4: '编辑权限'
  }
}
// =============邮箱邀请员工注册
export const inviteUser = {
  header: {
    title: '创建账户',
    text1: '接受 wuLiStore 的邀请'
  },
  content: {
    label1: '电子邮件',
    label2: '名字',
    label3: '姓氏',
    label4: '密码',
    place1: '请输入密码',
    title1: '显示密码',
    title2: '隐藏密码',
    label5: '强度:',
    label6: '确认密码'
  },
  save: '创建账户'
}
// ================账户管理
export const userControl = {
  header: {
    title: '账户',
    back: '返回'
  },
  content: {
    text1: '帐户概览',
    text2: '查看我们的',
    text3: '服务条款',
    text4: '和',
    text5: '隐私政策',
    text6: '。',
    text7: '比较套餐',
    text8: '具有不同功能和费率',
    text9: '加入时间',
    text10: '当前套餐',
    text11: 'Trial/月',
    text12: '状态',
    text13: '活跃',
    text14: '帐户和权限',
    text15: '账号所有者',
    text16: '上次登录时间：',
    text17: '员工账户 （',
    text18: '个，共2个）',
    btn1: '添加员工',
    li1: '已发送邀请',
    li2: '未登录',
    li3: '上次登录时间：',
    li4: 'Full access',
    li5: '已停用员工帐户',
    li6: '显示停用',
    li7: '隐藏停用'
  }
}
// ================账户详情和员工详情
export const userDetail = {
  header: {
    back: '返回',
    text1: '验证电子邮件地址',
    text2: '为帮助确保您的帐户安全，请验证您的电子邮件地址。请点击下方按钮，向 ',
    text3: '发送验证电子邮件或先更新',
    text4: '发送电子邮件'
  },
  content: {
    title: '帐户信息',
    text2: '员工资料',
    text3: '上传照片',
    text4: '删除照片',
    label1: '名字',
    label2: '姓氏',
    label3: '电子邮件',
    label4: '电话 （可选）'
  },
  content2: {
    title: '详细信息',
    label1: '个人简介 （可选）',
    place1: '请输入内容',
    text2: '您可以从模版编辑器中选择此选项，以显示在 我靠 发布的博客帖子上。',
    text3: '通知',
    text4: '允许通过电子邮件发送重要通知',
    text5: '我们会定期通过电子邮件向用户发送有关 Shopify 的重要新闻。我们会将电子邮件量保持在最低限度。',
    text6: '重置密码',
    text7: '更改用于登录 getGun 的密码。',
    text8: '更改密码',
    label2: '新密码',
    label3: '确认密码',
    text9: '重置密码',
    text10: '您可以将说明通过电子邮件发送到 ',
    text11: '来帮助 ma 重置密码。 ',
    btn: '通过电子邮件发送说明'
  },
  content3: {
    title: '后台访问权限',
    text1: '自定义权限',
    text2: '启用或限制 我靠 对此商店各个部分的访问权限。',
    text3: '拥有完全权限',
    text4: '编辑权限'
  },
  content4: {
    title: '管理员工访问权限',
    text1: '删除',
    text2: '已删除的员工帐户将从您的商店中永久删除。此操作不可逆。',
    text3: '删除',
    text4: '保存'
  },
  elDialogPwd: {
    title: '账户更改',
    text1: '输入当前密码以保存对您帐户的更改。',
    btn1: '取 消',
    btn2: '确 认'
  },
  elDialogStaff: {
    title: '暂停帐户访问权限',
    text1: '您是否确定要暂停',
    text2: '的帐户访问权限？',
    btn1: '取 消',
    btn2: '暂 停'
  },
  elDialogDel: {
    title: '确认撤销帐户',
    text1: '您是否确定要撤销',
    text2: '的帐户？此操作不可逆。',
    text3: '输入当前密码以继续：',
    btn1: '取 消',
    btn2: '撤 销'
  },
  textArea: [
    {
      text1: '暂停访问权限',
      text2: '此帐户将无法再访问您的商店。您可以随时恢复访问权限。',
      btn: '暂停访问权限'
    },
    {
      text1: '重新激活',
      text2: '当前已停用此帐户的访问权限，不计入您的员工帐户限制。',
      btn: '重新激活'
    }
  ],
  hint: {
    text1: '请填写完整'
  }
}
// =================购物车详情
export const shopTrolley = {
  header: {
    title: '购物车',
    text: '继续购物'
  },
  table: {
    thead: {
      th1: '全选',
      th2: '商品信息',
      th3: '单价',
      th4: '数量',
      th5: '总计',
      th6: '操作'
    }
  },
  content: {
    text1: '删除所选产品',
    text2: '件商品',
    text3: '总计',
    btn: '结算',
    hint: '购物车空空如也'
  },
  hint: {
    text1: '您确定要删除该商品吗？',
    text2: '提示',
    btn1: '确定',
    btn2: '取消',
    text3: '已取消删除',
    text4: '您确定要删除所选中商品吗？',
    text5: '您还未选中商品，请选中后在点击结算'
  }
}
// ==================购物车结算
export const submitOrderFive = {
  header: {
    title: '确认收货地址'
  },
  site: {
    text2: '收)',
    text3: '设置为默认',
    text4: '默认地址',
    text5: '删除'
  },
  table: {
    thead: {
      th1: '全选',
      th2: '商品信息',
      th3: '单价',
      th4: '数量',
      th5: '总计'
    }
  },
  discount: {
    text1: '小计',
    text2: '运输',
    text3: '税费',
    text4: '折扣:',
    btn1: 'Apply',
    span1: '件商品',
    span2: '总计',
    btn2: '提交订单'
  },
  elDialog: {
    label1: '收货人姓名：',
    label2: '邮编：',
    label3: '地址信息：',
    label4: '详细地址：',
    label5: '手机号码：',
    label6: '邮箱：',
    place1: '长度不超过25字符',
    place2: '请输入邮编',
    place3: '请输入详情地址信息',
    place4: '请输入邮箱'
  },
  elDialogMoney: {
    title: '银行卡支付',
    text1: '输入银行卡号',
    text2: '支付 $ ',
    btn1: '确认支付',
    text3: '正在支付中···',
    btn2: '确认付款'
  },
  title: {
    text1: '添加地址信息',
    text2: '修改地址信息'
  },
  setSite: {
    text1: '添加地址',
    text2: '修改地址'
  },
  saveOrSet: {
    text1: '保存',
    text2: '修改'
  },
  hint: {
    text1: '正在支付中····',
    text2: '请先添加地址，在提交订单',
    text3: '您还未选中商品，请选中后在点击提交订单',
    text4: '修改失败',
    text5: '您确定要删除该地址信息吗？',
    text6: '提示',
    text7: '确定',
    text8: '取消',
    text9: '删除成功',
    text10: '已取消删除',
    place: '请选择',
    loading: '正在加载中·····',
    text11: '请先添加地址，在输入折扣码',
    text12: '地址添加成功',
    text13: '修改地址成功'
  },
  listDetails: {
    text1: '排序方式：'
  },
  indexContent: {
    text1: '选购',
    text2: '特色资源',
    text3: '更多 >',
    text4: '请先添加地址，在输入折扣码'
  }
}
// =================商城产品目录
export const shopProduct = {
  title: '产品目录',
  content: {
    text1: '排列方式',
    place1: '请选择',
    text2: '个产品'
  },
  options: [{
    value: 'TA',
    label: '时间由近到远'
  }, {
    value: 'TD',
    label: '时间由远到近'
  }, {
    value: 'LA',
    label: '按字母顺序排列 A-Z'
  }, {
    value: 'LD',
    label: '按字母顺序排列 Z-A'
  }, {
    value: 'PA',
    label: '价格从低到高'
  }, {
    value: 'PD',
    label: '价格从高到低'
  }]
}
// ==============validator验证
export const validator = {
  vaIsPwd: {
    err1: '请输入密码',
    err2: '密码为6-20位数字字母组合，支持非空格字符',
    err3: '请再次输入密码',
    err4: '两次输入密码不一致!'
  }
}
// ====================临时提示语
export const temporary = {
  nextShopPwd: {
    text1: '恭喜你，成功激活账号',
    text2: '店铺密码不能和邮箱密码相同'
  },
  regMessage: {
    text1: '请将内容填写完善'
  }
}
// ===================设置轮播图
export const slideShow = {
  header: {
    title: 'banner管理',
    btn: '上传轮播图'
  },
  main: {
    bannerTitle: '图像与文本覆盖',
    bannerText: '使用叠加文字可让您的客户了解您的品牌。选择与您的风格和故事相关的图像 和文字。',
    text1: '精选系列',
    text2: '您的产品名称'
  },
  elDialog: {
    title: '管理banner',
    text1: '编辑标题和链接',
    title2: '编辑标题和链接',
    label1: '标题',
    label2: '文本',
    label3: '链接',
    btn1: '已完成'
  },
  hint: {
    text1: '请先上传图片'
  }
}
// ================订单金额总计
export const ordersStatistics = {
  title: '订单金额',
  text1: '已付金额',
  text2: '未付款金额',
  text3: '税务金额'
}
// 订单打印
export const printOrder = {
  title: '订单打印',
  text1: '订单编号:',
  text2: '客户姓名:',
  text3: '客户地址:',
  text4: '订购时间:',
  text5: '联系方式:',
  th1: '商品编号',
  th2: '商品名称',
  th3: '数量',
  th4: '商品金额',
  td1: '商品总金额：',
  td2: '运费：',
  td3: '税费：',
  td4: '元',
  td5: '折扣：',
  sum: '订单支付金额：',
  btn1: '打印订单'
}
// 提交订单完成以后订单详情
export const subSuccessfully = {
  title: '订单',
  text1: '你的订单已经提交',
  text2: '客户信息',
  text3: '付款方式',
  text4: '发货地址',
  btn1: '继续购物',
  text5: '小计',
  text6: '折扣',
  text7: '运费',
  text8: '税费',
  text9: '共计',
  text10: '在线支付'
}
// 在线模板
export const optionalModule = {
  title: '模板',
  text1: '在线商店正在受密码保护',
  text2: '仅拥有密码的访客才能访问您的在线商店。',
  text3: '移除密码',
  text4: '当前模板',
  text5: '这是客户在访问您的商店时会看到的模版。',
  text6: '使用我们的默认模板来展示您的品牌和产品。',
  text7: '预览',
  text8: '编辑',
  text9: '自定义',
  text10: '库',
  text11: '管理商店的模版。添加和发布模版以更改在线商店的外观。',
  text12: '免费模板',
  text13: '浏览 无际 的免费模版，所有这些模版都旨在提供最佳的主页定制效果。',
  text14: '浏览免费模板',
  text15: '模板1',
  text16: '模板2',
  text17: '模板3',
  text18: '模板4',
  text19: '模板5'
}
// 简化模板1
export const simplifyOne = {
  routerData: [
    {
      title: '主页',
      href: '/simplifyOneContent'
    },
    {
      title: '目录',
      href: '/shopProductOne/page1'
    }
  ],
  nav: {
    text1: '图像与文本覆盖',
    text2: '使用叠加文字可让您的客户了解您的品牌。选择与您的风格和故事相关的图像 和文字。'
  },
  main: {
    text1: '更多系列',
    text2: '图像与文本',
    text3: '将大文本与图像配对，以便将焦点放在所选产品，集合或博客文 章上。添加有关可用性，样式的详细信息，甚至提供评论。',
    text4: '更多产品'
  },
  footer: {
    text1: '快速链接',
    text2: '搜索',
    text3: '谈谈你的业务',
    text4: '与你的客户共享商品详细信息，促 销或品牌内容',
    text5: '通讯',
    text6: '订阅'
  }
}
// 简化模板3
export const simplifyThree = {
  routerData: [
    {
      title: '主页',
      href: '/simplifyThreeContent'
    },
    {
      title: '目录',
      href: '/shopProductThree/page3'
    }
  ],
  setData: [
    {
      src: require('../../assets/administratorPanel/templateImg/198.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/252.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/26.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/1.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/198.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/252.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/26.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    },
    {
      src: require('../../assets/administratorPanel/templateImg/1.png'),
      text: '示例产品标题',
      price: '$ 19.99'
    }
  ],
  header: {
    text1: '在这里宣布一些事',
    text2: '购物车'
  },
  main: {
    text1: '本周流行',
    text2: '更多系列',
    text3: '示例产品标题',
    text4: '添加到购物车',
    text5: '详细→',
    text6: '添加到购物车',
    text7: '更多产品→'
  },
  footer: {
    text1: '最新消息',
    text2: '链接',
    text3: '搜索',
    text4: '关注我们',
    text5: '注册最新新闻，优惠和款式',
    text6: '通讯',
    text7: '订阅',
    text8: '版权所有©2019，mall。由无际提供支持'
  }
}

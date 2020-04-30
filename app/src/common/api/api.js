import ajax from '../../ajax'
// export const XgetData = (data) => {
//   return ajax.post('/public/index.php/product/goods/productlist', data)
// }
// 填写个人信息
export const Fillmsg = (data) => {
  return ajax.post('/Shop/public/index.php/User/Register/fillinfo', data)
}
// 忘记店铺地址
export const ForShop = (data) => {
  return ajax.post('/Shop/public/index.php/User/Forget/forgetshopname', data)
}
// 忘记店铺密码
export const ForPwd = (data) => {
  return ajax.post('/Shop/public/index.php/User/Forget/forgetshoppwd', data)
}
// 重置密码
export const ResetPwd = (data) => {
  return ajax.post('/Shop/public/index.php/User/Forget/resetshoppwd', data)
}
// ===========================================产品管理
// 添加商品/ 产品新增接口
export const AddShop = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/addproduct', data)
}
// 产品新增的时候显示该店的存放位置信息
export const showlocation = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/showlocation', data)
}
// 产品列表(搜索商品)
export const productlist = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/productlist', data)
}
// 产品详情页选择不同的位置显示多属性的库存
export const numberlocation = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/numberlocation', data)
}
// 产品详情页编辑多属性的价格
export const editprice = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/editprice', data)
}
// 保存产品详情页多属性价格编辑
export const saveprice = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveprice', data)
}
// 保存产品多属性编辑sku
export const savesku = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/savesku', data)
}
// 保存多属性编辑的产品条码
export const saveitemcode = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveitemcode', data)
}
// 产品详情页编辑多属性的数量
export const editnumber = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/editnumber', data)
}
// 保存产品详情页多属性数量编辑
export const savenumber = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/savenumber', data)
}
// 产品详情页编辑多属性的选项值
export const editattr = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/editattr', data)
}
// 保存产品详情页多属性选项值的编辑
export const saveattr = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveattr', data)
}
// 编辑产品多属性的图片(展示已经有的图片)
export const editattrimg = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/editattrimg', data)
}
// 编辑多属性图片的时候添加图片
export const saveattrupload = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveattrupload', data)
}
// 删除图片列表中的图片
export const deleteimglist = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/deleteimglist', data)
}
// 选中某个产品作为多属性的图片
export const saveattrimg = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveattrimg', data)
}
// 删除当前的多属性图片
export const deleteattrimg = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/deleteattrimg', data)
}
// 产品编辑(进入产品详情)
export const editproduct = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/editproduct', data)
}
// 产品列表选中某个产品进行上架下架等操作
export const ProductShelves = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/handle', data)
}
// 产品列表选中某个商品进行编辑（显示列表数据）
export const listedit = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/listedit', data)
}
// 产品列表编辑之后保存修改
export const listsave = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/listsave', data)
}
// 产品详情页点击多属性进入到多属性页面详情
export const showmultity = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/showmultity', data)
}
// 产品多属性详情页编辑位置
export const editmultlocation = (data) => {
  return ajax.post('/Shop/public/index.php/product/goods/editmultlocation', data)
}
// 产品多属性详情页编辑位置，删除位置
export const deletelocate = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/deletelocate', data)
}
// 产品详情页编辑选项
export const showoption = (data) => {
  return ajax.post('/Shop/public/index.php/product/goods/showoption', data)
}
// 产品多属性编辑sku货号
export const editsku = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/editsku', data)
}
// 编辑产品多属性的条码
export const edititemcode = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/edititemcode', data)
}
// 多属性详情页修改后保存
export const savemultity = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/savemultity', data)
}
// 保存产品详情页编辑选项
export const saveoption = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveoption', data)
}
// 删除当前产品的产品详情
export const detaildelete = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/detaildelete', data)
}
// 保存所有编辑好的产品详情
export const saveproduct = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveproduct', data)
}
// 库存列表(展示产品库存信息)
export const inventoryMsg = (data) => {
  return ajax.post('/Shop/public/index.php/product/Storage/index', data)
}
// 更新产品库存
export const updatenum = (data) => {
  return ajax.post('/Shop/public/index.php/product/Storage/updatenum', data)
}
// 选中产品批量更新数量
export const showupdatenum = (data) => {
  return ajax.post('/Shop/public/index.php/product/Storage/showupdatenum', data)
}
// 产品详情页添加多属性进入页面
export const showaddattr = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/showaddattr', data)
}
// 产品详情页选择多属性进入批量编辑器
export const attreditor = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/attreditor', data)
}
// 产品详情页添加多属性保存
export const saveaddattr = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/saveaddattr', data)
}
// 选中多属性进行删除
export const deleteattr = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/deleteattr', data)
}
// =======================================================

// ============================================买家页面模板购物车
// 买家home页展示的特色产品
export const ShopExhibition = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/index/home', data)
}
// 展示商品的详情页面
export const ShopDetails = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Goodsdetail/show', data)
}
// 买家加入购物车
export const addCart = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/add', data)
}
// 获取商品对应的价格
export const getPrice = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/goodsdetail/mulitisearch', data)
}
// 头部显示购物车中商品的数量
export const getNum = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/shopcart/carnum', data)
}
// 买家点击头部菜单查看购物车
export const lookCart = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/show', data)
}
// 删除购物车中的某个商品
export const delSingleShop = (data) => {
  return ajax.post('/Shop/public/index.php/buyer/shopcart/delete', data)
}
// 更新购物车中的数量也就是 + -的变化
export const updateNum = (data) => {
  return ajax.post('/Shop/public/index.php/buyer/shopcart/update', data)
}
// 买家目录页显示的排序的所有产品
export const catalogShop = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/index/catalog', data)
}
// 买家目录页以及home页搜索产品
export const serachShop = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/index/serach', data)
}
// 从购物车中选择商品进行结算
export const selectorder = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/selectorder', data)
}
// 支付
export const paymoney = (data) => {
  return ajax.post('/Shop/public/index.php/payment/stripe/pay', data)
}
// 提交订单验证库存是否足够
export const submitorder = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/submitorder', data)
}
// 下单页面使用折扣码
export const applydiscount = (data) => {
  return ajax.post('/Shop/public/index.php/Discount/Code/applydiscount', data)
}
// 买家添加位置显示国家,省,市
export const lookarea = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/lookarea', data)
}
// 买家页面获取运费计算
export const countship = (data) => {
  return ajax.post('/Shop/public/index.php/buyer/goodsdetail/countship', data)
}
// 支付成功以后显示订单支付成功页面
export const showorder = (data) => {
  return ajax.post('/Shop/public/index.php/buyer/showorder/index', data)
}
// 添加收货地址
export const saveaddress = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/saveaddress', data)
}
// 查询收货地址
export const showaddress = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/showaddress', data)
}
// 删除收获地址
export const deleteaddress = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/deleteaddress', data)
}
// 更新收货地址
export const updateaddress = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/updateaddress', data)
}
// 设置默认地址
export const setdefault = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Shopcart/setdefault', data)
}
// 立即购买
export const purchase = (data) => {
  return ajax.post('/Shop/public/index.php/Buyer/Goodsdetail/purchase', data)
}
// 计算订单金额中的税费及总金额
export const ordercount = (data) => {
  return ajax.post('/Shop/public/index.php/order/allorder/ordercount', data)
}
// 订单详情打印
export const printerOrder = (data) => {
  return ajax.post('/Shop/public/index.php/Order/Allorder/printerOrder', data)
}
// =========================================================================
// =====================产品系列接口
// 产品系列列表
export const Xcollection = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/index', data)
}
// 产品系列列表编辑
export const Xhandle = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/handle', data)
}
// 添加产品系列
export const Xadd = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/add', data)
}
// 上传文本编辑器图片返回路径
export const uploadeditimg = (data) => {
  return ajax.post('/Shop/public/index.php/Product/Goods/uploadeditimg', data)
}
// 产品系列详情页面(编辑)
export const Xshowdetail = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/showdetail', data)
}
// 产品系列详情修改后保存
export const Xsavedetail = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/savedetail', data)
}
// 所有产品编辑：添加/删除产品系列，展示展品系列
export const Xshowcollect = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/showcollect', data)
}
// 产品系列详情对产品进行排序
export const Xgoodsorder = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/goodsorder', data)
}
// 产品系列详情删除
export const Xdetaildelete = (data) => {
  return ajax.post('/Shop/public/index.php/product/collection/detaildelete', data)
}
// 支付返回配置参数
export const showpay = (data) => {
  return ajax.post('/Shop/public/index.php/payment/stripe/showpay', data)
}
// ============================================ 设置
// 获取仓库位置
export const Slocation = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/index', data)
}
// 点击查看位置详情仓库详情
export const Sshowdetail = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/showdetail', data)
}
// 位置详情修改后保存
export const Ssavedetail = (data) => {
  return ajax.post('/Shop/public/index.php/Basic/location/savedetail', data)
}
// 添加位置保存
export const Sadd = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/add', data)
}
// 编辑发货顺序
export const Seditsort = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/editsort', data)
}
// 位置详情激活/停用位置
export const Shandele = (data) => {
  return ajax.post('/Shop/public/index.php/Basic/location/handle', data)
}
// 停用位置详情中删除位置
export const Sdelete = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/delete', data)
}
// 停用位置时显示可替换的位置
export const Sshowreplace = (data) => {
  return ajax.post('/Shop/public/index.php/basic/location/showreplace', data)
}
// 添加员工账户显示所有的权限
export const Sshowprivilege = (data) => {
  return ajax.post('/Shop/public/index.php/basic/account/showprivilege', data)
}
// 买家主页显示产品系列分类
export const collectlist = (data) => {
  return ajax.post('/Shop/public/index.php/buyer/index/collectlist', data)
}
// 买家产品系列更多list
export const lookcollect = (data) => {
  return ajax.post('/Shop/public/index.php/buyer/index/lookcollect', data)
}
// 添加员工权限，点击发送邀请
export const Sinvite = (data) => {
  return ajax.post('/Shop/public/index.php/basic/account/invite', data)
}
export const showDmain = () => { // 域名列表
  return ajax.get('/Shop/public/index.php/basic/Transport/showDmain')
}
export const editDmain = (data) => { // 编辑域名
  return ajax.post('/Shop/public/index.php/basic/Transport/editDmain', data)
}
export const addTransport = (data) => { // 添加运输资料
  return ajax.post('/Shop/public/index.php/basic/Transport/add', data)
}
// ====================================设置轮播图上传
export const editBanner = (data) => {
  return ajax.post('/Shop/public/index.php/basic/Transport/Banner', data)
}
// ============================获取保存的轮播列表
export const bannerList = (data) => {
  return ajax.get('/Shop/public/index.php/basic/Transport/bannerList', data)
}
export const delBanner = (data) => { // 删除轮播图
  return ajax.post('/Shop/public/index.php/basic/Transport/delBanner', data)
}
// ================================设置 > 设置账户
// 点击进入账户
export const Uaccount = (data) => {
  return ajax.post('/Shop/public/index.php/basic/account/index', data)
}
// 从邮件中点击创建员工账号,在跳转的页面输入后保存
export const Uconfirminvite = (data) => {
  return ajax.post('/Shop/public/index.php/basic/account/confirminvite', data)
}
// 点击账号昵称显示账户详细信息
export const Ulookinfo = (data) => {
  return ajax.post('/Shop/public/index.php/basic/Account/lookinfo', data)
}
// 保存账户详细信息的修改
export const Uupdateinfo = (data) => {
  return ajax.post('/Shop/public/index.php/basic/Account/updateinfo', data)
}
// 账户所有者暂停员工账号访问权限
export const Uhandleaccess = (data) => {
  return ajax.post('/Shop/public/index.php/basic/account/handleaccess', data)
}
// 账户所有者删除员工账号
export const Udeletestaff = (data) => {
  return ajax.post('/Shop/public/index.php/basic/account/deletestaff', data)
}
// ================================设置 > 运输
export const getTransportInformationList = () => { // 获取运输资料列表
  return ajax.get('/Shop/public/index.php/basic/Transport/totalRateList')
}
export const createTransportInformation = (data) => { // 创建运输资料
  return ajax.post('/Shop/public/index.php/basic/Transport/add', data)
}
export const fixTransportInformation = (data) => { // 修改运输资料
  return ajax.post('/Shop/public/index.php/basic/Transport/edit', data)
}
export const deleteTransportInformation = (data) => { // 删除运输资料
  return ajax.post('/Shop/public/index.php/basic/Transport/del', data)
}
export const getTransportInformation = () => { // 获取运输资料信息
  return ajax.get('/Shop/public/index.php/basic/Transport/rateList')
}
// =========================================================================
// 登录注册
export const getPermissionsList = (data) => {
  return ajax.post('/Shop/public/index.php/user/login/privilege', data)
}
export const ELoginOfMall = (data) => {
  return ajax.post('/Shop/public/index.php/User/Login/first', data)
}
export const ELoginOfEmail = (data) => {
  return ajax.post('/Shop/public/index.php/User/Login/second', data)
}

export const ELoginOfPassword = (data) => {
  return ajax.post('/Shop/public/index.php/User/Login/startlogin', data)
}

export const ALogin = (data) => {
  return ajax.post('/Shop/public/index.php/User/Login/maillogin', data)
}

export const ALoginOfshopPsw = (data) => {
  return ajax.post('/Shop/public/index.php/User/Login/startlogin', data)
}

export const ARegisterOfIndex = (data) => {
  return ajax.post('/Shop/public/index.php/User/Register/first', data)
}

export const recentLogin = (data) => {
  return ajax.post('/Shop/public/index.php/User/Login/verifytoken', data)
}
export const loginOut = (data) => {
  return ajax.post('/Shop/public/index.php/user/Login/exitlogin', data)
}
// =========================================================================
// =========================================================================
// 订单管理
export const getOrdersList = (data) => { // 获取订单列表
  return ajax.post('/Shop/public/index.php/Order/Allorder/index', data)
}
export const getOrderDetailPageInfo = (data) => { // 订单详情页面数据
  return ajax.post('/Shop/public/index.php/Order/Allorder/showdetail', data)
}
export const getDeliveryPageInfo = (data) => { // 手动发货页面数据
  return ajax.post('/Shop/public/index.php/Order/Allorder/manualdeliver', data)
}
export const submitDeliveryInfo = (data) => { // 确定发货
  return ajax.post('/Shop/public/index.php/Order/Allorder/confirmdeliver', data)
}
export const getRefundPageInfo = (data) => { // 退款页面数据
  return ajax.post('/Shop/public/index.php/Order/Allorder/showrefund', data)
}
export const getRefundMoneyInfo = (data) => { // 根据选择的退款数量来计算不同的费用(重新入库,取消订单都是同一个接口)
  return ajax.post('/Shop/public/index.php/Order/Allorder/searchrefund', data)
}
export const submitRefund = (data) => { // 确定退款
  return ajax.post('/Shop/public/index.php/Order/Allorder/confirmrefund', data)
}
export const getCancelOrderPageInfo = (data) => { // 获取取消订单页面数据
  return ajax.post('/Shop/public/index.php/Order/Allorder/showcancel', data)
}
export const submitCancleOrder = (data) => { // 确定取消订单
  return ajax.post('/Shop/public/index.php/Order/Allorder/confirmcancel', data)
}
export const submitCancleDelivery = (data) => { // 确定取消订单
  return ajax.post('/Shop/public/index.php/Order/Allorder/canceldeliver', data)
}
export const saveTraceInformation = (data) => { // 确定取消订单
  return ajax.post('/Shop/public/index.php/Order/Allorder/editlogistics', data)
}
export const modifyDeliveryAdress = (data) => { // 编辑收货地址
  return ajax.post('/Shop/public/index.php/Order/Allorder/editaddress', data)
}
export const editContactInformation = (data) => { // 编辑联系信息
  return ajax.post('/Shop/public/index.php/Order/Allorder/editconcatinfo', data)
}
export const editorNote = (data) => { // 编辑备注信息
  return ajax.post('/Shop/public/index.php/order/allorder/editcomment', data)
}
export const getReputInStoragePageInfo = (data) => { // 获取重新入库页面信息
  return ajax.post('/Shop/public/index.php/Order/Allorder/restocking', data)
}
export const submitReputInStorage = (data) => { // 确定重新入库
  return ajax.post('/Shop/public/index.php/Order/Allorder/confirmrestock', data)
}
export const showlocationOfDelivery = (data) => { // 发货页面选择不同的位置显示不同的产品
  return ajax.post('/Shop/public/index.php/Order/Allorder/showlocation', data)
}
//  *************************************************************************
// *************************折扣*********************************************

export const getDiscountsList = (data) => { // 获取折扣列表
  return ajax.post('/Shop/public/index.php/Discount/Code/codelist', data)
}
export const getDiscountDetail = (data) => { // 获取折扣/自动折扣详情页
  return ajax.post('/Shop/public/index.php/discount/code/showdetail', data)
}
export const addDiscountOrAutodiscount = (data) => { // 新增折扣/折扣码
  return ajax.post('/Shop/public/index.php/discount/code/add', data)
}
export const getProductSpecificInformation = (data) => { // 新增折扣特定产品浏览页面/折扣详情页特定产品编辑页面
  return ajax.post('/Shop/public/index.php/discount/code/showgoods', data)
}
export const getSeriedOfSpecificProductInformation = (data) => { // 折扣新增浏览产品系列/产品详情页浏览特定产品系列
  return ajax.post('/Shop/public/index.php/discount/code/showcollect', data)
}
export const discountOperation = (data) => { // 折扣列表页操作(启用,禁用,删除)
  return ajax.post('/Shop/public/index.php/discount/code/handle', data)
}
export const savediscountAutodiscount = (data) => { // 折扣/自动折扣编辑之后保存
  return ajax.post('/Shop/public/index.php/discount/code/savediscount', data)
}
export const getCountryInfo = (data) => { // 国家查询
  return ajax.post('/Shop/public/index.php/discount/Code/searcharea', data)
}

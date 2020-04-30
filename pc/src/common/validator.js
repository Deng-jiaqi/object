import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCookies from 'vue-cookies' // cookie
// 使用Vue引入i18n，不然虽然能编译过，但所有页面都会变成空白，好像是webpack打包会失败，无法找到config
Vue.use(VueI18n)
let lang = VueCookies.get('think_var') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang, // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-cn': require('@/common/lang/zh'), // 中文语言包
    'en-us': require('@/common/lang/en') // 英文语言包
  }
})
// 创建一个Vue实例，并传入i18n去绑定多语言 (每个vue单文件就是一个实例)
const vueInstance = new Vue({ i18n })
// 金钱格式
const digitsRE = /(\d{3})(?=\d)/g

// 检测密码强度
export function checkStrong(sValue) {
  var modes = 0
  // 正则表达式验证符合要求的
  if (sValue.length < 1) return modes
  if (/\d/.test(sValue)) modes++ // 数字
  if (/[a-z]/.test(sValue)) modes++ // 小写
  if (/[A-Z]/.test(sValue)) modes++ // 大写
  if (/\W/.test(sValue)) modes++ // 特殊字符

  // 逻辑处理
  switch (modes) {
    case 1:
      return 1
    case 2:
      return 2
    case 3:
    case 4:
      return sValue.length < 12 ? 3 : 4
  }
  return modes
}

export function currency(value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') + _float
}

// 金钱格式
export function formatMoney(value, type) {
  if (/[^0-9/.]/.test(value)) {
    return ''
  }
  if (value == null || value === '') {
    return ''
  }
  value = value.toString().replace(/^(\d*)$/, '$1.')
  value = (value + '00').replace(/(\d*\.\d\d)\d*/, '$1')
  value = value.replace('.', ',')
  var re = /(\d)(\d{3},)/
  while (re.test(value)) {
    value = value.replace(re, '$1,$2')
  }
  value = value.replace(/,(\d\d)$/, '.$1')
  if (type === 0) { // 不带小数位(默认是有小数位)
    var a = value.split('.')
    if (a[1] === '00') {
      value = a[0]
    }
  }
  return value
}
// 输入的只能是汉字和英文
export function validateName(rule, value, callback) {
  const reg = /^[ \u4E00-\u9FA5a-zA-Z/ ]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text17')))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error(vueInstance.$t('lang.validate.text18')))
    } else {
      callback()
    }
  }
}

// 产品不能为空
export function validateValue(rule, value, callback) {
  const reg = /^.{1,50}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入产品名称'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入1-50个字符'))
    } else {
      callback()
    }
  }
}

// fistname   填写个人信息
export function validateFname(rule, value, callback) {
  const reg = /^[0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text5')))
  } else {
    if (reg.test(value)) {
      callback(new Error(vueInstance.$t('lang.validate.text22')))
    } else {
      callback()
    }
  }
}

// fistname
export function validateChFname(rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text5')))
  } else {
    callback()
  }
}

// lastname不能为空
export function validateChLname(rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text6')))
  } else {
    callback()
  }
}

// lastname不能为空   填写个人信息
export function validateLname(rule, value, callback) {
  const reg = /^[0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text6')))
  } else {
    if (reg.test(value)) {
      callback(new Error(vueInstance.$t('lang.validate.text22')))
    } else {
      callback()
    }
  }
}

// 地址不能为空
export function validateDiZhi(rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text10')))
  } else {
    callback()
  }
}

// 输入的5-60个字符
export function validateLength(rule, value, callback) {
  const reg = /^.{5,60}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text20')))
  } else {
    if (!reg.test(value)) {
      callback(new Error(vueInstance.$t('lang.validate.text20')))
    } else {
      callback()
    }
  }
}

// 判断地区是否选中
export function validateSite(rule, value, callback) {
  if (value === '请选择国家') {
    callback(new Error('请选择国家'))
  } else {
    callback()
  }
}

// 输入的只能是数字
export function validatetoNum(rule, value, callback) {
  const reg = /^[0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入邮编'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确邮编号码'))
    } else {
      callback()
    }
  }
}

// 电话号码验证
export function validatePhone(rule, value, callback) {
  const reg = /^[0-9]*$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error(vueInstance.$t('lang.validate.text4')))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error(vueInstance.$t('lang.validate.text19')))
    } else {
      callback()
    }
  }
}

/* 是否邮箱 */
export function validateEMail(rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error(vueInstance.$t('lang.validate.text3')))
  } else {
    if (!reg.test(value)) {
      callback(new Error(vueInstance.$t('lang.validate.text3')))
    } else {
      callback()
    }
  }
}

// 校验密码：只能输入6-20个字母、数字、下划线
export function isPassword(rule, value, callback) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error('邮箱地址格式错误'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('密码只能输入6-20个字母、数字、下划线'))
    } else {
      callback()
    }
  }
}
// 运单号校验
export function deliverNumberValidator(rule, value, callback) {
  // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error(vueInstance.$t('lang.validate.text1')))
  } else {
    callback()
  }
}

// 电话号码校验
export function phoneNumberValidator(rule, value, callback) {
  // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error(vueInstance.$t('lang.validate.text4')))
  } else {
    callback()
  }
}

// 公司名校验
export function companyValidator(rule, value, callback) {
  // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error(vueInstance.$t('lang.validate.text7')))
  } else {
    callback()
  }
}
// 城市名校验
export function cityNameValidator(rule, value, callback) {
  // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error(vueInstance.$t('lang.validate.text8')))
  } else {
    callback()
  }
}
// 邮编
export function zipcodeValidator(rule, value, callback) {
  // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error(vueInstance.$t('lang.validate.text9')))
  } else {
    callback()
  }
}
// 正数
export function positiveNumberValidator(rule, value, callback) {
  const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
  if (!reg.test(value)) {
    callback(new Error(vueInstance.$t('lang.validate.text11')))
  } else {
    callback()
  }
}

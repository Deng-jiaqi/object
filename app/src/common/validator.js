
// 金钱格式
const digitsRE = /(\d{3})(?=\d)/g

// 检测密码强度
export function checkStrong (sValue) {
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

export function currency (value, currency, decimals) {
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
export function formatMoney (value, type) {
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
export function validateName (rule, value, callback) {
  const reg = /^[\u0391-\uFFE5A-Za-z]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入姓名'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('输入的只能是汉字和英文'))
    } else {
      callback()
    }
  }
}

// 产品不能为空
export function validateValue (rule, value, callback) {
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

// fistname
export function validateFname (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter the name of'))
  } else {
    callback()
  }
}

// fistname
export function validateChFname (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入名字'))
  } else {
    callback()
  }
}

// lastname不能为空
export function validateChLname (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入姓氏'))
  } else {
    callback()
  }
}

// lastname不能为空
export function validateLname (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter the last name'))
  } else {
    callback()
  }
}

// 地址不能为空
export function validateDiZhi (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入地址'))
  } else {
    callback()
  }
}

// 输入的5-60个字符
export function validateLength (rule, value, callback) {
  const reg = /^.{5,60}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入5-60个字符'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入5-60个字符'))
    } else {
      callback()
    }
  }
}

// 判断地区是否选中
export function validateSite (rule, value, callback) {
  if (value === '请选择国家') {
    callback(new Error('请选择国家'))
  } else {
    callback()
  }
}

// 输入的只能是数字
export function validatetoNum (rule, value, callback) {
  const reg = /^[0-9]*$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入邮编'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('输入的只能是数字'))
    } else {
      callback()
    }
  }
}

/* 是否手机号码 */
export function validatePhone (rule, value, callback) {
  const reg = /^[0-9]*$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入电话号码'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('电话号码格式错误'))
    } else {
      callback()
    }
  }
}

/* 是否邮箱 */
export function validateEMail (rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error('请输入邮箱地址'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('邮箱地址格式错误'))
    } else {
      callback()
    }
  }
}

// 校验密码：只能输入6-20个字母、数字、下划线
export function isPassword (rule, value, callback) {
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

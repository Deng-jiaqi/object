
// 输入的只能是汉字和英文
export function EvalidateName (rule, value, callback) {
  const reg = /^[\u0391-\uFFE5A-Za-z]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter your name'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('Input only Chinese characters and English'))
    } else {
      callback()
    }
  }
}

// 产品不能为空
export function EvalidateValue (rule, value, callback) {
  const reg = /^.{1,50}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter the product name'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('Please enter 1-50 characters'))
    } else {
      callback()
    }
  }
}

// fistname  填写个人信息  收货地址
export function EvalidateFname (rule, value, callback) {
  const reg = /^\d+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter the name of'))
  } else {
    if (reg.test(value)) {
      callback(new Error("Can't enter a number"))
    } else {
      callback()
    }
  }
}

// fistname
export function EvalidateChFname (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter your name'))
  } else {
    callback()
  }
}

// lastname不能为空
export function EvalidateChLname (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter last name'))
  } else {
    callback()
  }
}

// lastname不能为空   填写个人信息   收货地址
export function EvalidateLname (rule, value, callback) {
  const reg = /^\d+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter the name of'))
  } else {
    if (reg.test(value)) {
      callback(new Error("Can't enter a number"))
    } else {
      callback()
    }
  }
}

// 地址不能为空
export function EvalidateDiZhi (rule, value, callback) {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter address'))
  } else {
    callback()
  }
}

// 输入的5-60个字符
export function EvalidateLength (rule, value, callback) {
  const reg = /^.{5,60}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter 5-60 characters'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('Please enter 5-60 characters'))
    } else {
      callback()
    }
  }
}

// 判断地区是否选中
export function EvalidateSite (rule, value, callback) {
  if (value === '请选择国家') {
    callback(new Error('Please select country'))
  } else {
    callback()
  }
}

// 输入的只能是数字
export function EvalidatetoNum (rule, value, callback) {
  const reg = /^[0-9]+$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter zip code'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('Please enter the correct zip code'))
    } else {
      callback()
    }
  }
}

/* 是否手机号码 */
export function EvalidatePhone (rule, value, callback) {
  const reg = /^[0-9]*$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('Please enter your telephone number'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('Wrong format of phone number'))
    } else {
      callback()
    }
  }
}

/* 是否邮箱 */
export function EvalidateEMail (rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error('Please enter your email address'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('Email address format error'))
    } else {
      callback()
    }
  }
}

// 校验密码：只能输入6-20个字母、数字、下划线
export function EisPassword (rule, value, callback) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error('Email address format error'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('Passwords can only be entered with 6-20 letters, Numbers, and underscores'))
    } else {
      callback()
    }
  }
}

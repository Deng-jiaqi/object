module.exports = {
  storeNameValidate: function (storeName) {
    if (storeName.length > 0 && storeName.length <= 20) {
      return true
    } else {
      return false
    }
  },
  emailValidate: function (email) {
    // eslint-disable-next-line no-useless-escape
    const emailRegular = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!emailRegular.test(email)) {
      return false
    } else {
      return true
    }
  },
  passwordValidate: function (password) {
    const passwordRegular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (!passwordRegular.test(password)) {
      return false
    } else {
      return true
    }
  }
}

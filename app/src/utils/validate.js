module.exports = {
  storeNameValidate: function (storeName) {
    if (storeName !== '') {
      return true
    } else {
      return false
    }
  },
  emailValidate: function (email) {
    const emailRegular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!emailRegular.test(email)) {
      return false
    } else {
      return true
    }
  },
  passwordValidate: function (password) {
    const passwordRegular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
    if (!passwordRegular.test(password)) {
      return false
    } else {
      return true
    }
  }
}

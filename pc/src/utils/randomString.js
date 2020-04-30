module.exports = {
  randomString () {
    let str = 'abcdefghijklmnopqrstuvwxyz'
    let newStr = ''
    for (let i = 0; i < 10; i++) {
      newStr += str[Math.floor(Math.random() * 26)]
    }
    return newStr.toUpperCase()
  }
}

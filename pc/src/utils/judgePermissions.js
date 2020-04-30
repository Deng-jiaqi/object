
const includePermission = (arrOne, arrTwo) => { // 完全符合权限要求 arrowOne是账号的权限集合，Two是路由所需要的权限的集合
  if (arrTwo.length === 0) {
    return true
  }
  let x = true
  for (let item of arrTwo) {
    if (arrOne.indexOf(item) === -1) {
      x = false
      return x
    }
  }
  return x
}
export default includePermission

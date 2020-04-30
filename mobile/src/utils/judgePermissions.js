
const includePermission = (arrOne, arrTwo) => {
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

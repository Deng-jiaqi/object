// export const addAnimateCSS = (_this, ref, className) => {
//   _this.$refs[ref].classList.add('animated', className)
// }
export const animateCSS = (_this, ref, animationName, callback) => {
  const node = _this.$refs[ref]
  console.log(_this.$refs)
  console.log(node)
  node.classList.add('animated', animationName)

  function handleAnimationEnd () {
    node.classList.remove('animated', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)
    console.log(node)

    if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

<template>
  <button v-preventReClick :class="{simple:type==='simple',primary:type==='primary',warning:type==='warning'}">{{text}}</button>
</template>
<script>
export default {
  name: 'edgButton',
  props: {
    text: {
      type: String
    },
    type: {
      required: false,
      default: 'simple'
    }
  }
}
</script>
<style lang="less" scoped>
button {
  min-width: 68px;
  min-height: 43px;
  border: 1px solid rgba(238,238,238,1);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  word-spacing: 2px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 17px;
  padding-bottom: 17px;
  cursor: pointer;
  outline: none;
}
.simple {
  background-color: #fff;
  color: rgba(51, 51, 51, 1);
}
.simple:active {
    background-color: red;
}
.simple:hover,.simple:focus {
  background: linear-gradient(180deg, #f9fafb, #f4f6f8);
  border-color: #c4cdd5;
}
.primary {
  background-color: rgba(0, 159, 255, 1);
  color: #fff;
}
.primary:hover,.primary:focus {
  background-color: #3a8ee6;
  border-color: #3a8ee6;
}
.warning {
  background: linear-gradient(180deg, #e6391a, #d53417);
  color: #fff;
}
.warning:hover,.warning:focus {
  background: linear-gradient(180deg, #de3618, #c73016);
  border-color: #c4cdd5;
}
</style>

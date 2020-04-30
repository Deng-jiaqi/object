<template>
  <button v-preventReClick :style="{width}" :class="{primary:type==='primary'}">{{text}}</button>
</template>
<script>
export default {
  name: 'CircleButton',
  props: {
    text: {
      // type: String
    },
    width: {
      type: String
    },
    type: {
      required: false,
      default: 'primary'
    }
  }
}
</script>
<style lang="less" scoped>
button {
  height: 1.625rem;
  border: 1px solid rgba(160, 160, 160, 1);
  border-radius: 0.8125rem;
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.03125rem;
  word-spacing: 0.0625rem;
  padding-left: 0.3125rem;
  padding-right: 0.3125rem;
  cursor: pointer;
  outline:none;
}
.primary {
  background-color: #4267b2;
  color: #fff;
}
.primary:hover,
.primary:focus {
  background-color: rgb(36, 79, 165);
  border-color: #c4cdd5;
}
</style>

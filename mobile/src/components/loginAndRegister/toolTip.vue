<template>
 <transition name="fade">
  <span class="c-tooltip" ref='tooltip' v-show='visible'>{{text}}</span>
  </transition>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    text: {
      type: String,
      required: false
    },
    visible: {
      default: false
    }
  }
}
</script>

<style scoped lang="less">
.c-tooltip {
  min-width: 160px;
  max-width: 200px;
  text-align: center;
  position: absolute;
  z-index: 1000;
  background: rgba(0, 0, 0, 1);
  opacity: 0.71;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.4375rem;
  padding: 0.9375rem;
  line-height: 1.6;
  letter-spacing: 0.0625rem;
  word-spacing: 0.0625rem;
  word-break: break-all;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div class="c-tooltip" :style="{'width':width,'height':height,'top':top,'left':left}">{{text}}</div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    },
    top: {
      type: String,
      required: false
    },
    left: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="less">
.c-tooltip {
  opacity: 0.7;
  background:rgba(255,255,255,1);
  border-radius:6px;
  border:2px solid rgba(253,208,127,1);
  color:rgba(102,102,102,1);
  font-size: 24px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  padding-left: 35px;
  padding-right: 35px;
  line-height: 40px;
}
</style>

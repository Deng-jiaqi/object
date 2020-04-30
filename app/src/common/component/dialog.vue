<template>
  <div class="dialog" v-if='forshow'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    forshow: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style scoped lang='less'>
.dialog {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

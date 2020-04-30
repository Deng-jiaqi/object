<template>
  <input type="checkBox"
         :checked="value"
         class="check_box tui-checkbox"
         @click.stop />
</template>

<script>
export default {
  name: 'checkboxCss',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
</style>

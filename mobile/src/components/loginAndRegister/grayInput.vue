<template>
    <input
      readonly
      onfocus="this.removeAttribute('readonly');"
      ref="input"
      @input="$emit('input', $event.target.value)"
      :style="{'height':height,'width':width}"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :autofocus="true"
    />
</template>

<script>
export default {
  name: 'Grayinput',
  props: {
    width: {
      type: String,
      required: false,
      default: 'calc(100% - 0.59375rem)'
    },
    height: {
      type: String,
      required: false,
      default: '48px'
    },
    value: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      passed: true
    }
  }
}
</script>

<style scoped lang="less">
input {
  background: rgba(244, 244, 244, 1);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 0.0625rem;
  outline: none;
  padding-left: 0.53125rem;
  display: inline-block;
}
input::-ms-clear,
input::-ms-reveal {
  display: none;
}
input::-webkit-input-placeholder {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
input::-moz-placeholder {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
input::-ms-input-placeholder {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
</style>

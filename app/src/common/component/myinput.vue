<template>
  <div class="c-input">
    <input
      :style="{'height':height,'width':width}"
      :type="type"
      ref="input"
      @input="$emit('input', $event.target.value)"
      :value="value"
      :placeholder="placeholder"
      :autofocus="true"
    />
  </div>
</template>

<script>
export default {
  name: 'Myinput',
  props: {
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
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
  }
}
</script>

<style scoped lang="less">
.c-input {
  position: relative;
  display: inline-block;
  input {
    outline: none;
    border: none;
    padding-left: 10px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(240, 224, 196, 1);
    font-size: 24px;
  }
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }
  input::-webkit-input-placeholder {
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
  }
  input::-moz-placeholder {
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
  }
  input::-ms-input-placeholder {
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
  }
}
</style>

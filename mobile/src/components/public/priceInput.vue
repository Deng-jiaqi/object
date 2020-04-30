<template>
  <div class="priceInput">
    <span>￥</span>
    <input
        ref="input"
        class="myInput"
        @blur="moneyFormat($event)"
        @input="$emit('input', $event.target.value)"
        :style="{'height':height,'width':width}"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :autofocus="true"
    />
  </div>
</template>

<script>
import { currency, formatMoney } from '../../common/validator'
export default {
  name: 'pricceInput',
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
      type: null,
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
  filters: {
    currency: currency
  },
  data () {
    return {
      passed: true,
      input: ''
    }
  },
  methods: {
    // 金钱格式
    moneyFormat (e) {
      e.target.value = formatMoney(e.target.value)
    }
  }
}
</script>

<style scoped lang="less">
.priceInput{
  position: relative;
  font-size: 16px;
  >span{
    position: absolute;
    top: 12px;
    left: 6px;
  }
  .myInput{
    padding: 10px 0 10px 30px;
    border: 1px solid rgba(181, 181, 181, 1);
    border-radius: 4px;
    outline: none;
  }
  .myInput:focus{
    border: 1px solid #385CA5;
  }
}
</style>

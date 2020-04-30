<template>
  <div class="counter clearfix">
    <div class="reduce" @click="reduceProductNumber"></div>
    <input class="number" ref="input" :value="counterNumber" @input="inputChange" />
    <div class="increase" @click="increaseProductNumber">
      <div class="line-vertical"></div>
      <div class="line-cross"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Counter',
  props: {
    value: {
      default: 0
    }
  },
  // watch: {
  //   // 避免直接改变prop报错
  //   value () {
  //     this.counterNumber = this.value
  //   }
  // },
  data () {
    return {
      counterNumber: 999,
      originalNumber: 999 // 用来使点增加时不能超过原来的最大数量
    }
  },
  methods: {
    inputChange () {
      console.log(this.checkNumber('123w'))
      if (parseInt(this.$refs.input.value) > parseInt(this.originalNumber)) {
        this.$refs.input.value = this.originalNumber
      }
      if (parseInt(this.$refs.input.value) < 0) {
        this.$refs.input.value = 0
      }
      if (!this.$refs.input.value) {
        return
      }
      if (!this.checkNumber(this.$refs.input.value)) {
        this.$refs.input.value = 1
      }
      if (this.$refs.input.value.indexOf('.') !== -1) {
        this.$refs.input.value = 1
      }
      this.$emit('input', this.$refs.input.value)
    },
    checkNumber (theObj) {
      let reg = /^\d+$/
      if (reg.test(theObj)) {
        return true
      }
      return false
    },
    reduceProductNumber () {
      if (this.counterNumber > 1) {
        this.counterNumber -= 1
      } else {
        this.counterNumber = 0
      }
      this.$refs.input.value = this.counterNumber // input的value的值方法结束后才给input，会少1，所以先赋值
      this.$emit('input', this.$refs.input.value)
    },
    increaseProductNumber () {
      if (parseInt(this.counterNumber, 0) < parseInt(this.originalNumber, 0)) {
        this.counterNumber++
        this.$refs.input.value = this.counterNumber
        this.$emit('input', this.$refs.input.value)
      } else {
      }
    }
  },
  created () {
    this.counterNumber = this.value
    this.originalNumber = this.value
  }
}
</script>
<style lang="less" scoped>
.counter {
  display: inline-block;
  width: 121px;
  .reduce {
    width: 35px;
    height: 32px;
    background: rgba(230, 230, 230, 1);
    border-radius: 2px;
    float: left;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .reduce::after {
    display: block;
    content: "";
    width: 14px;
    height: 3px;
    background-color: rgba(137, 137, 137, 1);
  }
  .reduce:hover {
    cursor: pointer;
  }
  .number {
    width: 35px;
    height: 30px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(141, 141, 141, 1);
    border-radius: 2px;
    float: left;
    margin-left: 3px;
    margin-right: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    text-align: center;
  }
  .increase {
    width: 35px;
    height: 32px;
    background: rgba(230, 230, 230, 1);
    border-radius: 2px;
    float: left;
    position: relative;
    .line-cross {
      position: absolute;
      top: 15px;
      left: 9px;
      display: block;
      content: "";
      width: 15px;
      height: 3px;
      background-color: rgba(166, 164, 164, 1);
    }
    .line-vertical {
      position: absolute;
      top: 10px;
      left: 15px;
      display: block;
      content: "";
      width: 3px;
      height: 14px;
      background-color: rgba(166, 164, 164, 1);
    }
  }
  .increase:hover {
    cursor: pointer;
  }
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>

<template>
<transition name="fade">
  <div class="c-search-page" ref="page">
    <div class="c-input animated slideInDown">
      <input ref="input" @input="$emit('input', $event.target.value)" :value="value" type="text" />
      <span @click="search" class="iconfont icontongxunlusousuokuang_fangdajing"></span>
      <span @click="close()" class="iconfont iconclose"></span>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SearchPage',
  props: {
    value: {
      type: String,
      required: false
    }
  },
  methods: {
    ...mapMutations(['changeForshowSearchPage']),
    search () {
      console.log(this.$refs.test.classList)
      console.log(this.value)
    },
    close () {
      // animateCSS(this, 'page', 'fadeOut', this.changeForshowSearchPage)
      this.changeForshowSearchPage()
    }
  }
}
</script>

<style scoped lang='less'>
.c-search-page {
  position: fixed;
  left: 0;
  right: 0;
  top: 110px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  // animation-duration: 0.3s;
  // animation-timing-function: ease-out;
  .c-input {
    width: 100%;
    height: 130px;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: absolute;
    top: -110px;
    left: 0;
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
    input {
      height: 88px;
      width: 562px;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(119, 119, 119, 1);
      border-radius: 4px;
      outline: none;
      padding-left: 20px;
      margin-left: 40px;
    }
    input::-ms-clear,
    input::-ms-reveal {
      display: none;
    }
    .iconclose {
      font-size: 80px;
      margin-left: 20px;
    }
    .icontongxunlusousuokuang_fangdajing {
      font-size: 40px;
      position: absolute;
      left: 560px;
      top: 40px;
    }
  }
}
 .fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div class="c-lr-layout">
    <header class="layout-header">
      <span @click="back" class="iconfont icon-fanhui1"></span>
      <img src="../../assets/loginAndRegister/logo@2x.png" alt />
      <p class="lr-title">EDGEMARKET</p>
    </header>
    <transition
      mode="out-in"
      enter-active-class="fadeIn faster"
      leave-active-class="fadeOut faster"
    >
      <router-view class="animated" />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'LoginRegisterLayout',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.c-lr-layout {
  .layout-header {
    position: relative;
    background-image: url("../../assets/loginAndRegister/main-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    height: 200px;
    .icon-fanhui1 {
      color: #fff;
      font-size: 20px;
      position: absolute;
      top: 15px;
      left: 10px;
    }
    img {
      margin-top: 60px;
    }
    .lr-title {
      text-align: center;
      font-size: 16px;
      color: #fff;
      letter-spacing: 1px;
      font-weight: bold;
    }
  }
}
</style>

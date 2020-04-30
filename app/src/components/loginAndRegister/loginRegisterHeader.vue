<template>
  <div>
    <div class="container">
      <img class="logo" src="../../assets/loginRegister/LOGO.png" alt />
      <p>{{$t('lang.loginRegisterHead.text1')}}</p>
      <img class="wave" src="../../assets/loginRegister/wave.gif" alt />
      <span @click='back' class="iconfont icon-jiantou4"></span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LoginRegisterHeader',
  data () {
    return {
      lastPath: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  //   height: 332px;
  height: 440px;
  background-image: url("../../assets/loginRegister/main-bg.png");
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .logo {
    width: 140px;
    height: 140px;
    position: absolute;
    left: 305px;
    top: 100px;
  }
  p {
    text-align: center;
    font-size: 32px;
    color: #fff;
    font-weight: bold;
    margin: 0;
    margin-top: 286px;
  }
  .wave {
    position: absolute;
    bottom: -80px;
    left: 0;
    height: 200px;
    width: 750px;
  }
  .icon-jiantou4 {
    color: rgba(255, 255, 255, 1);
    font-size: 40px;
    position: absolute;
    left: 10px;
    top:15px;
  }
}
</style>

<template>
  <div>
    <div class="c-bg">
      <div class="c-logo" v-if="exist">
        <img src="../../assets/loginAndRegister/logo@2x.png" alt />
        <span class="text">EDGEMARKET</span>
      </div>
    </div>
    <transition
      mode="out-in"
      enter-active-class="fadeIn faster"
      leave-active-class="fadeOut faster"
    >
      <router-view class="animated"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Background',
  data () {
    return {
      // ui
      exist: true
    }
  },
  created () {
    const lenth = this.$route.path.split('/').length
    if (this.$route.path.split('/')[lenth - 1] === 'AregMessage') {
      this.exist = false
    } else {
      this.exist = true
    }
  }
}
</script>

<style scoped lang="less">
.c-bg {
  background-color: #efdfc4;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-height: 750px;
}
.c-logo {
  width: 267px;
  display: flex;
  height: 69px;
  justify-content: space-between;
  align-items: center;
  margin-left: 18.8vw;
  margin-top: 7vh;
  img {
    width: 69px;
    height: 69px;
  }
}
.text {
  font-size: 24px;
  color: black;
  font-weight: bold;
}
</style>

<template>
  <div class="page">
    <!-- 页面内容区 -->
    <div class="container" :class="toLeft?'toLeft':''">
      <div class="c-adminPanelNav">
        <span @click="back" class="iconfont icon-jiantou4"></span>
        <span @click="showNav" class="iconfont icon-gengduo"></span>
      </div>
      <router-view />
      <!-- 点击后灰色背景 -->
      <div class="c-nav" v-if="navVisible" @click="closeNav"></div>
    </div>
    <!-- 隐藏导航 -->
    <NavigationPane/>
  </div>
</template>

<script>
import NavigationPane from '@/views/administratorPanel/navigationPane'
import { mapMutations } from 'vuex'
export default {
  name: 'adminPanelHeader',
  data () {
    // ui
    return {
      navVisible: false,
      toLeft: false
    }
  },
  methods: {
    ...mapMutations(['changeForAdministratorPanelNavigation']),
    back () {
      this.$router.go(-1)
    },
    showNav () {
      this.toLeft = true
      this.navVisible = true
      setTimeout(() => {
        this.changeForAdministratorPanelNavigation('open')
      }, 300)
    },
    closeNav () {
      this.toLeft = false
      this.navVisible = false
      this.changeForAdministratorPanelNavigation('close')
    }
  },
  components: {
    NavigationPane
  }
}
</script>

<style scoped lang='less'>
.toLeft {
  transform: translateX(-630px);
}
.page {
  .container {
    width: 100%;
    transition: transform 0.5s ease-in-out;
    position: relative;
    background-color: #fff;
    .c-adminPanelNav {
      width: 100%;
      height: 78px;
      background: linear-gradient(
        90deg,
        rgba(0, 159, 255, 1) 0%,
        rgba(0, 198, 255, 1) 100%
      );
      box-shadow: 0px 10px 40px -15px rgba(0, 159, 255, 0.65);
      position: relative;
      .icon-jiantou4 {
        color: rgba(255, 255, 255, 1);
        font-size: 40px;
        position: absolute;
        left: 10px;
        top: 15px;
      }
      .icon-gengduo {
        color: rgba(255, 255, 255, 1);
        font-size: 50px;
        position: absolute;
        right: 12px;
        top: 13px;
      }
    }
    .c-nav {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
  }
}
</style>

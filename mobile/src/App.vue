<template>
  <div id="app">
    <transition
      mode="out-in"
      enter-active-class="fadeIn faster"
      leave-active-class="fadeOut faster"
    >
      <router-view v-if="isRouterShow" class="animated" />
    </transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterShow: true
    }
  },
  computed: {
  },
  watch: {
    $route (to, from) {
      this.forRightLoadingVisible(false)
    }
  },
  methods: {
    ...mapMutations(['forRightLoadingVisible']),
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
  },
  async created () {
  }
}
</script>
<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  font-size: 14px;
}
a {
  text-decoration: none;
}
ul {
  padding-left: 0;
  list-style: none;
}
</style>

<template>
  <div>
    <span class="iconfont icon-gengduo"></span>
    <div @click="debounce">防抖动</div>
    <Dialog :forshow="qqq">
      <div class="dia"></div>
    </Dialog>
    <div class="test" ref='test'></div>
    <button @click='test'>test</button>
  </div>
</template>

<script>
import Dialog from '@/common/component/dialog'
export default {
  name: 'Test',
  methods: {
    debounce () {},
    test () {
      this.$refs.test.classList.add('wow')
    }
  },
  components: {
    Dialog
  },
  data () {
    return {
      qqq: true
    }
  }
}
</script>

<style scoped lang='less'>
.test {
  width: 100px;
  // height: 100px;
    height: 0;
  background-color: red;
  // transform: translateX(10px);
  transition: all 2s;
}
.wow {
  height: 100px;
}
.dia {
  width: 200px;
  height: 200px;
  background-color: blue;
}
.qqq {
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>

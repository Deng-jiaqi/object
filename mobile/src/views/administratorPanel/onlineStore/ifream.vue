<template>
    <div>
                <iframe ref='iframe' width=800 height=500 frameborder=0 scrolling=auto src='http://localhost:8080/#/templateOne'></iframe>
        <div @click="sendMessage">向iframe发送信息</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      iframeWin: {}
    }
  },
  methods: {
    sendMessage () {
      console.log(11)
      // 外部vue向iframe内部传数据
      this.iframeWin.postMessage({
        cmd: '修改头部',
        params: {
          abc: 'abc'
        }
      }, 'http://localhost:8080')
    },
    handleMessage (event) {
    // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      switch (data.cmd) {
        case 'returnFormJson':
        // 业务逻辑
          break
        case 'returnHeight':
        // 业务逻辑
          break
      }
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
    this.iframeWin = this.$refs.iframe.contentWindow
  }
}
</script>
<style lang="less" scoped>

</style>

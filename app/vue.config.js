module.exports = {
  devServer: {
    proxy: {
      '/Shop': { // 代理api
        // target: 'http://192.168.5.114', // 服务器api地址
        target: 'http://192.168.5.176', // 服务器api地址
        changeOrigin: true, // 是否跨域
        ws: true // proxy websockets
      }
    }
  }
}

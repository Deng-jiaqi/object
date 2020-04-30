const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-cssnext')
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/Shop': { // 代理api
        // target: 'http://192.168.5.185', // 服务器api地址
        target: 'https://www.edgelessstore.com', // 服务器api地址
        changeOrigin: true, // 是否跨域
        ws: true // proxy websockets
      }
    }
  },
  configureWebpack: {
    externals: { // 使用CDN引入创建使用
      'vue': 'Vue',
      'element-ui': 'ELEMENT'
    },
    optimization: {
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       chunks: 'all'
      //     },
      //     common: {
      //       chunks: 'all'
      //     }
      //   }
      // }
    },
    plugins: [
      new CompressionWebpackPlugin({ // Gzip压缩JS和CSS
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
  publicPath: './', // 打包后静态资源路径
  productionSourceMap: false // 取消默认打包生成的map文件
}

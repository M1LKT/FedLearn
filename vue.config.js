const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  // 开启代理服务器
  // devServer: {
  //   host: "www.fedlearnwithad.com",
  //   proxy: {
  //     '/guo': {
  //       target: 'http://192.168.43.34:8000',
  //       pathRewrite: {'^/guo': ''}, // 将/api开头的请求地址重写
  //       changeOrigin: true,
  //       ws: true,
  //     },
  //     '/wjx': {
  //       target: 'https://aip.baidubce.com',
  //       pathRewrite: {'^/wjx': ''},
  //       ws: true,
  //       changeOrigin: true
  //     },
  //   }
  // }
  devServer: {
    host: "localhost", // 将host修改为localhost
    proxy: {
      '/guo': {
        target: 'http://localhost:8000', // 将target修改为你的本地服务器地址
        pathRewrite: {'^/guo': ''}, // 将/api开头的请求地址重写
        changeOrigin: true,
        ws: true,
      },
      '/wjx': {
        target: 'http://localhost:8000', // 将target修改为你的本地服务器地址
        pathRewrite: {'^/wjx': ''},
        ws: true,
        changeOrigin: true
      },
    }
  }
})

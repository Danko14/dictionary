const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/words': {
        target: process.env.VUE_APP_BACKEND_URL,
        // target: 'http://0.0.0.0:8085',
        ws: true,
        changeOrigin: true
      },
    }
  },
  module: {
    rules:[
      {use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]}
    ]
  }
})

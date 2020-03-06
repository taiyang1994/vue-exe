module.exports = {
  devServer: {
    port: 8080,
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/ele': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        pathRewrite: {
          '^/ele': '/'
        }
      }
    }
  }

}

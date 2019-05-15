const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],

  chainWebpack: config => {
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@http', resolve('src/http'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@styles', resolve('src/styles'))
      .set('@directive', resolve('src/directive'))
  }
}

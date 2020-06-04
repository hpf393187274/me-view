const path = require('path')
// const fs = require('fs')
const md = require('markdown-it')() // 引入markdown-it
const mdContainer = require('markdown-it-container')
const processPath = process.cwd()
function resolve (dir) {
  return path.join(processPath, dir)
}

module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  filenameHashing: false,
  devServer: {
    port: 8000,
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://10.130.36.240:7091',
        target: 'http://localhost:8081',
        ws: false,
        // 将主机标头的原点更改为目标URL~
        changeOrigin: false
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @ 是 src/assets 的别名
        // 所以这里假设你有 `@styles/variable` 这个文件
        prependData: '@import "src/theme/var.scss";'
      }
    }
  },
  chainWebpack: config => {
    config.entry('app').clear().add('./example/main.js')
    config.resolve.alias
      .set('@example', resolve('./src/example'))
      .set('@src', resolve('./src/'))
      .set('me-view', resolve('./'))

    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require('markdown-it-anchor'),
            {
              level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
              permalink: true, // 开启标题锚点功能
              permalinkBefore: true // 在标题前创建锚点
            }
          ],
          [ mdContainer, 'tip' ],
          [ mdContainer, 'warning' ],
          [ mdContainer, 'demo', {
            validate (params) {
              return params.trim().match(/^demo\s*(.*)$/)
            },
            render (tokens, idx) {
              const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
              if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : ''
                return `<me-demo-block><template #description>${md.render(description)}</template>`
              }
              return '</me-demo-block>'
            }
          } ]
        ]
      })
  }
}

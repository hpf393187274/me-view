const path = require('path')
const md = require('markdown-it')() // 引入markdown-it
const mdContainer = require('markdown-it-container')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  devServer: {
    port: 8000,
    disableHostCheck: true,
    proxy: {
      '/portal/': {
        // target: 'http://10.130.36.240:7091',
        target: 'http://127.0.0.1:8081',
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
        // @assets/ 是 src/assets 的别名
        // 所以这里假设你有 `@assets/styles/variable` 这个文件
        prependData: '@import "@assets/styles/variable.scss";'
      }
    }
  },
  chainWebpack: config => {
    config
      // Interact with entry points
      .entry('app')
      .clear()
      .add('./example/main.js')

    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@example', resolve('example'))
      .set('@router', resolve('example/router'))
      .set('@docs', resolve('example/docs'))

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

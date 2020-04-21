const path = require('path')
const md = require('markdown-it')() // 引入markdown-it
const mdContainer = require('markdown-it-container')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  transpileDependencies: ['resize-detector'],
  devServer: {
    port: 8100,
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.resolve.extensions
      .add('.js').add('.vue').add('.json').add('.css')
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@router', resolve('src/router'))
      .set('@docs', resolve('src/docs'))

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
          [mdContainer, 'tip'],
          [mdContainer, 'warning'],
          [mdContainer, 'demo', {
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
          }]
        ]
      })
  }
}

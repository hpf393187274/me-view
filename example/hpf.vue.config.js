const path = require('path')
const md = require('markdown-it')() // 引入markdown-it
const mdContainer = require('markdown-it-container')

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  transpileDependencies: ['resize-detector'],
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, 'dist'),
          // outputDir: path.join(__dirname, './'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: [
            '/',
            '/basic/flex',
            '/basic/icon',
            '/basic/line',
            '/basic/link',
            '/basic/scrollbar',
            '/basic/slidebar',
            '/common/database',
            '/common/storage',
            '/common/tools',
            '/common/type',
            '/form/button',
            '/form/checkbox',
            '/form/combo-select',
            '/form/combo-table',
            '/form/combo-tree',
            '/form/form',
            '/form/input',
            '/guide/start',
            '/guide/install',
            '/layout/dialog',
            '/layout/message',
            '/layout/paging',
            '/layout/panel',
            '/layout/table',
            '/layout/tabs',
            '/layout/transfer',
            '/layout/tree'
          ],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      ]
    }
  },
  devServer: {
    port: 8100,
    disableHostCheck: true
  },
  chainWebpack: config => {
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

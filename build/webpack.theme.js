const path = require('path')
const fs = require('fs')
const md = require('markdown-it')() // 引入markdown-it
const mdContainer = require('markdown-it-container')
function resolve (dir) {
  return path.join(__dirname, dir)
}

function formatFileName (target) {
  const connector = '-'
  target = target.replace(/([A-Z])/g, $1 => connector + $1.toLowerCase())
  if (target.startsWith(connector)) {
    target = target.substr(1)
  }
  return target
}
function findFiles (dir) {
  const result = {}
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const [ fileName ] = file.split('.')
    const targetFileName = formatFileName(fileName)
    Reflect.set(result, targetFileName, {
      entry: path.join(dir, file),
      filename: targetFileName,
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ],
      template: 'public/index.html'
    })
  }
  return result
}
findFiles(resolve('src/script'))
module.exports = {
  lintOnSave: undefined,
  runtimeCompiler: true,
  filenameHashing: false,
  // pages: findFiles(resolve('src/script')),
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
        prependData: '@import "src/theme/variable.scss";'
      }
    }
  },
  configureWebpack: {
    entry: {
      type: './src/script/Type.class.js'
    }
    // u
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.output.filename('[name].js')
      config.entry('type').clear().add('./src/script/Type.class.js')
    } else {
      // 为开发环境修改配置...
      // config.entry('app').clear().add('./example/main.js')
    }
    config.entry('app').clear().add('./example/main.js')
    // config.entry('type').clear().add('./src/script/Type.class.js')
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

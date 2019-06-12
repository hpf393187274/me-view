const path = require('path')
const md = require('markdown-it')(); // 引入markdown-it
const slugify = require('transliteration').slugify; // 引入transliteration中的slugify方法
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
      .set('@styles', resolve('src/styles'))

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
              level: 3, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点 
              slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性 
              permalink: true, // 开启标题锚点功能 
              permalinkBefore: true // 在标题前创建锚点
            }
          ],
          [
            require('markdown-it-container'), 'demo',
            {
              validate: function (params) {
                return params.trim().match(/^demo\s+(.*)$/)
              },
              render(tokens, index) {
                let { nesting, info } = tokens[index]
                debugger
                if (nesting === 1) {
                  // 1.获取代码块的描述内容
                  const content = info.trim().match(/^demo\s+(.*)$/) || []
                  let description = content.length > 1 ? content[1] : ''
                  if (description) {
                    description = md.render(description)
                  }
                  // 2.获取代码块内的html和js代码
                  const code = tokens[index + 1].content
                  // 3.代码块包裹
                  return `
                    <me-demo-block>
                      <div class="source" slot="source">${code}</div>
                        ${description}
                      <div class="highlight" slot="code">
                  `
                }
                return ` 
                  </div>
                </me-demo-block>
                `
              }
            }
          ]
        ]
      })
  }
}

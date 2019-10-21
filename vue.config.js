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
                const m = tokens[index].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[index].nesting === 1) {
                  let description = m && m.length > 1 ? m[1] : '';
                  // const content = tokens[index + 1].type === 'fence' ? tokens[index + 1].content : '';
                  if (description) {
                    description = md.render(description)
                  }
                  // console.log('description', '-->', 'index = ', index, '-->', description)
                  const content = tokens[index + 1].content
                  // console.log('content', '-->', 'index = ', index, '-->', content)
                  return `<demo-block>
                    <template #source>${content}</template>
                    <div>${description}</div>
                  `
                }
                return '</demo-block>';
              }
            }
          ]
        ]
      })
  }
}

module.exports = {
  title: 'me-view',
  head: [
    ['script', { type: 'text/javascript', src: "//at.alicdn.com/t/font_1180504_oajz0neruss.js" }]
  ],
  themeConfig: {
    nav: [
      {
        text: '组件',
        link: '/module/'
      }
    ],
    sidebar: [
      {
        title: 'Basic',
        collapsable: false,
        children: [
          '/module/basic/'
        ]
      },
      {
        title: 'Form',
        collapsable: false,
        children: [
          '/module/form/'
        ]
      },
      {
        title: 'Layout',
        collapsable: false,
        children: [
          '/module/layout/tree.md',
          '/module/layout/transfer.md'
        ]
      }
    ]
  }
}
module.exports = {
  title: 'me-view',
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
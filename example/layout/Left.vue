<template>
  <me-tree :data="data" :expandable="false" @click-node-leaf="handleClick" />
</template>
<script>
export default {
  name: 'LayoutLeft',
  data() {
    return {
      data: [
        {
          label: '开发指南',
          children: [
            { label: '安装', path: '/guide/install' },
            { label: '快速上手', path: '/guide/easystart' },

          ]
        },
        {
          label: 'Common 公共',
          children: [
            { label: 'Tools 常用工具', path: '/common/tools' },
            { label: 'Type 类型判断', path: '/common/type' },
            { label: 'Storage 数据存储', path: '/common/storage' },
          ]
        },
        {
          label: 'Basic 基础',
          children: [
            { label: 'Row 行布局', path: '/basic/row' },
            { label: 'Column 列布局', path: '/basic/column' },
            { label: 'Icon 图标库', path: '/basic/icon' },
            { label: 'Link 连接', path: '/basic/link' },
            { label: 'LineH 水平线', path: '/basic/line-h' },
            { label: 'LineV 垂直线', path: '/basic/line-v' },
            { label: 'Scrollbar 滚动条', path: '/basic/scrollbar' },
            { label: 'Slidebar 滑动条', path: '/basic/slidebar' },
          ]
        },
        {
          label: 'Form 表单',
          children: [
            { label: 'Form 表单', path: '/form/form' },
            { label: 'Input 输入框', path: '/form/input' },
            { label: 'Button 按钮', path: '/form/button' },
            { label: 'Checkbox 复选框', path: '/form/checkbox' },
            { label: 'ComboSelect 组合框', path: '/form/combo-select' },
            { label: 'ComboTree 组合树', path: '/form/combo-tree' },
            { label: 'ComboTable 组合表', path: '/form/combo-table' }
          ]
        },
        {
          label: 'Layout 布局',
          children: [
            { label: 'Table 表格', path: '/layout/table' },
            { label: 'Paging 分页', path: '/layout/paging' },
            { label: 'Tree 树型控件', path: '/layout/tree' },
            { label: 'Dialog 对话框', path: '/layout/dialog' },
            { label: 'Message 提示', path: '/layout/message' },
            { label: 'Transfer 穿梭框', path: '/layout/transfer' }
          ]
        }
      ]
    }
  },
  created() {
    this.$local.get('routeList');
  },
  methods: {
    handleClick({ path }) {
      this.$router.push(path)
    }
  }
}
</script>
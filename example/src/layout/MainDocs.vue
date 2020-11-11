<template>
  <div class="me-row me-flex">
    <me-tree class="layout-left" :data="data" highlight @click-leaf="handleClick" accordion/>
    <router-view class="layout-right me-flex" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          label: '开发指南',
          children: [
            { label: '安装', path: '/doc/guide/install' },
            { label: '快速上手', path: '/doc/guide/start' }
          ]
        },
        {
          label: 'Common 公共',
          children: [
            { label: 'Tools 常用工具', path: '/doc/common/tools' },
            { label: 'Type 类型判断', path: '/doc/common/type' },
            { label: 'Storage 数据存储', path: '/doc/common/storage' },
            { label: 'Database 数据库存储', path: '/doc/common/database' }
          ]
        },
        {
          label: 'Basic 基础',
          children: [
            { label: 'Flex 布局', path: '/doc/basic/flex' },
            { label: 'Icon 图标库', path: '/doc/basic/icon' },
            { label: 'Link 链接', path: '/doc/basic/link' },
            { label: 'Line 线条', path: '/doc/basic/line' },
            { label: 'Scrollbar 滚动条', path: '/doc/basic/scrollbar' },
            { label: 'Slidebar 滑动条', path: '/doc/basic/slidebar' }
          ]
        },
        {
          label: 'Form 表单',
          children: [
            { label: 'Form 表单', path: '/doc/form/form' },
            { label: 'Input 输入框', path: '/doc/form/input' },
            { label: 'Textarea 文本域', path: '/doc/form/textarea' },
            { label: 'Button 按钮', path: '/doc/form/button' },
            { label: 'Checkbox 复选框', path: '/doc/form/checkbox' },
            { label: 'ComboSelect 组合框', path: '/doc/form/combo-select' },
            { label: 'ComboTree 组合树', path: '/doc/form/combo-tree' },
            { label: 'ComboTable 组合表', path: '/doc/form/combo-table' },
            { label: 'EditorText 文本编辑器', path: '/doc/form/editor-text' }
          ]
        },
        {
          label: 'Layout 布局',
          children: [
            { label: 'Panel 面板', path: '/doc/layout/panel' },
            { label: 'Tabs 标签页', path: '/doc/layout/tabs' },
            { label: 'Table 表格', path: '/doc/layout/table' },
            { label: 'List 列表', path: '/doc/layout/list' },
            { label: 'Paging 分页', path: '/doc/layout/paging' },
            { label: 'Tree 树型控件', path: '/doc/layout/tree' },
            { label: 'Modal 模态框', path: '/doc/layout/modal' },
            { label: 'Dialog 对话框', path: '/doc/layout/dialog' },
            { label: 'Message 提示', path: '/doc/layout/message' },
            { label: 'Transfer 穿梭框', path: '/doc/layout/transfer' }
          ]
        },
        {
          label: 'View 视图',
          children: [
            { label: 'Image 图片', path: '/doc/view/image' }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick ({ data }) {
      const clientRect = this.$tools.clientRect(this)
      console.log('---------------------', clientRect)
      this.$router.push(data.path).catch(error => { console.debug(error) })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-left {
  width: 300px;
  overflow: auto;
  margin: 0px 20px;
}

.layout-right {
  overflow: auto;
  padding: 0px 100px;
}
</style>

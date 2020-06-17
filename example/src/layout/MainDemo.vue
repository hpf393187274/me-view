<template>
  <div class="me-row me-flex">
    <me-tree class="layout-left" :data="data" highlight :expandable="false" @click-leaf="handleClick" />
    <router-view class="layout-right me-flex"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          label: 'Common 公共',
          children: [
            { label: 'Tools 常用工具', path: '/demo/common/tools' },
            { label: 'Type 类型判断', path: '/demo/common/type' },
            { label: 'Storage 数据存储', path: '/demo/common/storage' },
            { label: 'Database 数据库存储', path: '/demo/common/database' }
          ]
        },
        {
          label: 'Basic 基础',
          children: [
            { label: 'Flex 布局', path: '/demo/basic/flex' },
            { label: 'Icon 图标库', path: '/demo/basic/icon' },
            { label: 'Link 链接', path: '/demo/basic/link' },
            { label: 'Line 线条', path: '/demo/basic/line' },
            { label: 'Scrollbar 滚动条', path: '/demo/basic/scrollbar' },
            { label: 'Slidebar 滑动条', path: '/demo/basic/slidebar' }
          ]
        },
        {
          label: 'Form 表单',
          children: [
            { label: 'Form 表单', path: '/demo/form/form' },
            { label: 'Input 输入框', path: '/demo/form/input' },
            { label: 'Button 按钮', path: '/demo/form/button' },
            { label: 'Checkbox 复选框', path: '/demo/form/checkbox' },
            { label: 'ComboSelect 组合框', path: '/demo/form/combo-select' },
            { label: 'ComboTree 组合树', path: '/demo/form/combo-tree' },
            { label: 'ComboTable 组合表', path: '/demo/form/combo-table' }
          ]
        },
        {
          label: 'Layout 布局',
          children: [
            { label: 'Panel 面板', path: '/demo/layout/panel' },
            { label: 'Tabs 标签页', path: '/demo/layout/tabs' },
            { label: 'Table 表格', path: '/demo/database' },
            { label: 'Paging 分页', path: '/demo/layout/paging' },
            { label: 'Tree 树型控件', path: '/demo/layout/tree' },
            { label: 'Dialog 对话框', path: '/demo/layout/dialog' },
            { label: 'Message 提示', path: '/demo/layout/message' },
            { label: 'Transfer 穿梭框', path: '/demo/layout/transfer' }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick ({ data }) {
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
  margin: 0px 60px;
}
</style>

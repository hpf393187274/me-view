<template>
  <div class="me-column me-flex">
    <div class="me-row" style="align-items: center;">
      <img height="60" src="/logo.png"> Me-View
    </div>
    <me-line-h/>
    <div class="me-row me-flex" style="overflow: auto;">
      <me-tree :data="data" :expandable="false" @click="handleClick" style="width:200px;"/>
      <me-line-v/>
      <div class="me-row me-flex" style="overflow: auto; padding:5px 10px;">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: 'Basic 基础',
          children: [
            { label: 'Row 行布局', path: '/basic/row' },
            { label: 'Column 列布局', path: '/basic/column' },
            { label: 'Icon 图标库', path: '/basic/icon' },
            { label: 'Link 连接', path: '/basic/link' },
            { label: 'LineH 水平线', path: '/basic/line/h' },
            { label: 'LineV 垂直线', path: '/basic/line/v' }
          ]
        },
        {
          label: 'Form 表单',
          children: [
            { label: 'Form 表单', path: '/form/form' },
            { label: 'Input 输入框', path: '/form/input' },
            { label: 'Button 按钮', path: '/form/button' },
            { label: 'Checkbox 复选框', path: '/form/checkbox' },
            { label: 'ComboSelect 组合框', path: '/form/combo/select' },
            { label: 'ComboTree 组合树', path: '/form/combo/tree' },
            { label: 'ComboTable 组合表', path: '/form/combo/table' }
          ]
        },
        {
          label: 'Layout 布局',
          children: [
            { label: 'Table 表格', path: '/layout/table' },
            { label: 'Paging 分页', path: '/layout/paging' },
            { label: 'Tree 树型控件', path: '/layout/tree' },
            { label: 'Transfer 穿梭框', path: '/layout/transfer' }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick({ path }) {
      this.$router.push(path)
    }
  }
}
</script>
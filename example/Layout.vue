<template>
  <div class="me-column me-flex">
    <div class="me-row" style="align-items: center;">
      <img height="60" src="/logo.png"> Me-View
    </div>
    <me-line-row/>
    <div class="me-row me-flex" style="overflow: auto;">
      <me-tree :data="data" :expandable="false" @click="handleClick" style="width:200px;"/>
      <me-line-column/>
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

          ]
        },
        {
          label: 'Form 表单',
          children: [
            { label: 'Form 表单', path: '/form/form' },
            { label: 'Input 输入框', path: '/form/input' },
            { label: 'Button 按钮', path: '/form/button' }
          ]
        },
        {
          label: 'layout 布局',
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
<template>
  <div class="me-row me-flex">
    <me-tree :data="data" :expandable="false" @click="handleClick" style="width:200px;"/>
    <div class="me-row me-flex me-border" style="overflow: auto;">
      <router-view/>
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
            { label: 'Input 输入框', path: '/form/input' }
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
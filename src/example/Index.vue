<template>
  <div class="me-row me-flex">
    <me-tree :data="data" style="width:200px;" :expandable="false" @click="handleClick"/>
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
          label: 'Form 表单'
        },
        {
          label: 'layout 布局',
          children: [
            { label: 'Table', path: '/layout/table' },
            { label: 'Tree', path: '/layout/tree' },
            { label: 'Transfer', path: '/layout/transfer' }
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
<template>
  <div :class="addClass('row','flex')">
    <me-panel lable="基础用法">
      <me-tree-basic/>
      <div>sss</div>
    </me-panel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { text: 'Tree', router: '/layout/tree' },
        { text: 'Transfer', router: '/layout/transfer' }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
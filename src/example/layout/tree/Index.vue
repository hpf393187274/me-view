<template>
  <div class="me-flex" style="overflow: auto;">
    <me-tree-basic class="me-flex"/>
    <me-tree-checkbox class="me-flex"/>
    <me-tree-all class="me-flex"/>
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
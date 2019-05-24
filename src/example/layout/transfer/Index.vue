<template>
  <div :class="addClass('row','flex')">transfer</div>
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
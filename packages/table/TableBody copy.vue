<template>
  <me-scrollbar @scroll-render-v="handlerDifference" @scroll="onScroll" class="table-body">
    <table border="0" cellpadding="0" cellspacing="0" ref="table">
      <tbody>
        <slot />
      </tbody>
    </table>
  </me-scrollbar>
</template>

<script>
export default {
  name: 'MeTableBody',
  methods: {
    onScroll () {
      this.$emit('scroll-body', this.$el.scrollLeft)
    },
    handlerDifference (value) {
      this.$emit('scroll-render-v', value)
    }
  }
}
</script>

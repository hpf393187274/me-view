<template>
  <div @scroll="onScroll" class="table-body">
    <table border="0" cellpadding="0" cellspacing="0" ref="table">
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'MeTableBody',
  methods: {
    onScroll() {
      this.$emit('scroll-body', this.$el.scrollLeft)
    }
  }
}
</script>

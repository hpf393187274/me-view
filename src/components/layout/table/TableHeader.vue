<template>
  <div class="table-header">
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <slot />
      </thead>
    </table>
  </div>
</template>
<script>
export default {
  name: 'MeTableHeader',
  props: { scrollLeft: Number },
  watch: {
    scrollLeft(newValue) {
      this.$el.scrollLeft = newValue
    }
  }
}
</script>

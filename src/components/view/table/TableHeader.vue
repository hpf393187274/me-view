<template>
  <div class="table-header me-row">
    <table border="0" cellpadding="0" cellspacing="0" class="me-flex">
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
    scrollLeft (newValue) {
      this.$el.scrollLeft = newValue
    }
  },
  data () {
    return {
      hasScrollbar: false
    }
  }
}
</script>

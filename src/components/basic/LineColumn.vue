<template>
  <div :class="addClass('line-column')">
    <div :style="{'background-color': color}">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'LineColumn',
  props: {
    color: {
      type: String,
      default: '#DDE9F6'
    }
  }
}
</script>

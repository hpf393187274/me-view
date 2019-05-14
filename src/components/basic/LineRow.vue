<template>
  <div :class="addClass('line-row')">
    <div :style="{'background-color': color}">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'LineRow',
  props: {
    color: {
      type: String,
      default: '#DDE9F6'
    }
  }
}
</script>

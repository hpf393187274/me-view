<template>
  <div class="me-row me-line-row">
    <div :style="{'background-color': color}">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'MeLineRow',
  props: {
    color: { type: String, default: '#DDE9F6' }
  }
}
</script>

<template>
  <div class="me-row me-line-h">
    <div :style="{'background-color': color}">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'LineH',
  props: {
    color: { type: String, default: '#DDE9F6' }
  }
}
</script>

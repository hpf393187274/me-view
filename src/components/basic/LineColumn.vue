<template>
  <div class="me-column me-line-column">
    <div :style="{'background-color': color}">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'MeLineColumn',
  props: {
    color: { type: String, default: '#DDE9F6' }
  }
}
</script>

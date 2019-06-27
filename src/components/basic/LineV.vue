<template>
  <div class="me-column me-line-v">
    <div :style="{'background-color': color}">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'MeLineV',
  props: {
    color: { type: String, default: '#DDE9F6' }
  }
}
</script>

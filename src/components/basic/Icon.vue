<template>
  <svg class="me-icon" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="`#${$slots.default[0].text}`"></use>
  </svg>
</template>

<script>
export default { name: 'MeIcon' }
</script>

<template>
  <svg @click="$emit('click')" aria-hidden="true" class="me-icon">
    <use :xlink:href="`#${$slots.default[0].text}`"></use>
  </svg>
</template>

<script>
export default { name: 'MeIcon' }
</script>

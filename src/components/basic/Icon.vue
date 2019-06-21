<template>
  <span :title="title" class="me-row me-center me-icon">
    <svg @click="$emit('click')" aria-hidden="true" class="icon-inner">
      <use :xlink:href="`#${$slots.default[0].text}`"></use>
    </svg>
  </span>
</template>

<script>
export default { name: 'MeIcon' }
</script>

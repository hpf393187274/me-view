<template>
  <!-- <svg :title="title" @click="$emit('click')" aria-hidden="true" class="me-icon">
    <use :xlink:href="`#${$slots.default[0].text}`"></use>
  </svg>-->
  <i :class="`iconfont ${$slots.default[0].text} me-icon `" :title="title" @click="$emit('click')"/>
</template>

<script>
export default { name: 'MeIcon' }
</script>

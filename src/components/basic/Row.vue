<template>
  <div :class="addClass('row')">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Row'
}
</script>

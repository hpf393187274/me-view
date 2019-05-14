<template>
  <div :class="addClass('column')">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Column'
}

</script>

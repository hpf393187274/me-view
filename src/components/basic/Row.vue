<template>
  <div class="me-row">
    <slot :data="data" />
  </div>
</template>

<script>
export default {
  name: 'MeRow',
  props: {
    data: Object
  }
}
</script>

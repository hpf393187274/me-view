<template>
  <div class="me-column me-flex">
    <layout-header />
    <router-view class="layout-main me-flex"/>
  </div>
</template>
<style lang="scss" scoped>
  .layout-main {
    overflow: auto;
  }
</style>
<script>
import LayoutHeader from './Header'
export default {
  components: { LayoutHeader }
}
</script>

<template>
  <div class="me-flex container">
    <layout-header style="grid-area: header;" />
    <layout-left style="grid-area: left;" />
    <router-view class="container-main"/>
  </div>
</template>
<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: 260px minmax(1000px,auto);
    grid-template-rows: 80px auto;
    grid-template-areas: 'header header' 'left main';
    .container-main {
      grid-area: main;
      overflow: auto;
      padding:5px 100px;
    }
  }
</style>
<script>
import LayoutHeader from './Header'
import LayoutLeft from './Left'
export default {
  components: { LayoutHeader, LayoutLeft }
}
</script>

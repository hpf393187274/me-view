<template>
  <div class="me-column me-flex">
    <layout-header />
    <div class="me-row me-flex" style="overflow: auto; ">
      <layout-left style="width:240px;" />
      <layout-main style="padding:5px 100px;" />
    </div>
  </div>
</template>
<script>
import Header from './Header'
import Main from './Main'
import Left from './Left'
export default {
  components: {
    [Header.name]: Header,
    [Main.name]: Main,
    [Left.name]: Left
  }
}
</script>

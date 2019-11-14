<template>
  <div class="me-row me-cross-center header">
    <div class="me-row me-flex me-cross-center left">
      <img height="40" src="/logo.png" /> Me-View
    </div>
    <div class="me-row me-center right">
      <me-form-item style="width: 300px">
        <me-input icon-prefix="icon-sousuo" />
      </me-form-item>
      <me-link>语言选择</me-link>
      <me-link url="https://github.com/hpf393187274/me-view">源码查看</me-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutHeader'
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  .left {
    padding-left: 10px;
  }
  .right {
    padding: 0px 10px;
    > * {
      margin: 0px 10px;
    }
  }
}
</style>
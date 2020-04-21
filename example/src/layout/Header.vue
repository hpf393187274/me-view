<template>
  <div class="me-row me-cross-center header">
    <div class="me-row me-flex me-cross-center left">
      <img height="40" src="/logo.png" /> Me-View
    </div>
    <me-row class="me-center right">
      <me-input icon-prefix="icon-sousuo" style="width: 300px" />
      <me-link>语言选择</me-link>
      <me-link url="https://github.com/hpf393187274/me-view">源码查看</me-link>
    </me-row>
    <!-- <div class="me-row me-center right">
      <me-input icon-prefix="icon-sousuo" style="width: 300px" />
      <me-link>语言选择</me-link>
      <me-link url="https://github.com/hpf393187274/me-view">源码查看</me-link>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
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

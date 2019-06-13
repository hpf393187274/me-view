<template>
  <div class="me-column me-flex">
    <div class="me-row me-border" style="min-height: 100px;padding: 5px 10px;">
      <slot name="source"></slot>
    </div>
    <div class="me-row me-center me-border" style="height: 35px;">
      <me-icon @click="showCode=!showCode" title="显示代码">{{showCode?'icon-sort-down':'icon-sort-up'}}</me-icon>
    </div>
    <div class="me-row me-border" style="min-height: 80px;padding: 5px 10px;" v-show="showCode">
      <slot name="highlight"></slot>sdfsfsfsd
    </div>
  </div>
</template>
<script>

export default {
  name: 'DemoBlock',
  data() {
    return {
      showCode: false
    };
  }
};
</script>
<style lang="less" scoped>
</style>




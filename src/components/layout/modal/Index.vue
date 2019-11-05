<template>
  <div @click.self="value__=false" class="me-row me-center me-modal" v-if="value__">
    <div :style="styles" class="me-column modal-container">
      <slot />
    </div>
  </div>
</template>
<script>
import Modal from '../modal.mixin'
export default {
  name: 'MeModal',
  mixins: [Modal],
}
</script>

<style lang="less" scoped>
.me-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgba(216, 216, 216, 0.4);
  z-index: 10;
  .modal-container {
    background-color: aliceblue;
    z-index: 20;
    color: black;
  }
}
</style>
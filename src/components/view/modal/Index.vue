<template>
  <div @click.self="onClick" class="me-row me-center me-modal" v-if="value__">
    <div :style="styles" @mousedown="onMouseDown" class="me-column modal-container">
      <slot />
    </div>
  </div>
</template>
<script>
import Modal from '../modal.mixin'
import Draggable from '@components/mixins/draggable'
export default {
  name: 'MeModal',
  mixins: [Modal, Draggable],
  methods: {
    onClick() {
      if (this.closableModal === true) {
        this.onCancel()
      }
    },
    handlerDragging() { this.handlerDrag() },
    handlerDragEnd() { this.handlerDrag() },
    handlerDrag() {
      this.position = { ...this.pointEnd }
    },
    initPosition() {
      this.position = { x: 500, y: 200 }
      Object.assign(this.pointStart, this.position)
    }
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
        cursor: 'pointer',
        left: `${this.position.x}px`,
        top: `${this.position.y}px`
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      var container = window.document.body
      Object.assign(this.pointMax, {
        x: container.scrollWidth, y: container.scrollHeight
      })
      this.initPosition()
    })
  },
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
    position: absolute;
  }
}
</style>
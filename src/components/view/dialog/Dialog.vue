
<template>
  <me-modal
    :closable-modal="closableModal"
    :draggable="draggable"
    :height="height"
    :width="width"
    @cancel="$emit('cancel')"
    class-container="me-dialog"
    v-model="value__"
  >
    <div class="me-row dialog-header">
      <slot name="header">
        <span :class="{'me-cursor-move': moveable}" class="me-flex">{{title}}</span>
        <me-icon @click="onCancel" v-if="closable">icon-shanchu</me-icon>
      </slot>
    </div>
    <me-line-h />
    <div @mousedown.stop class="me-row me-flex dialog-body">
      <slot />
    </div>
    <me-line-h />
    <div @mousedown.stop class="me-row dialog-footer">
      <slot name="footer">
        <me-button @click="onCancel" width="80px">取 消</me-button>
        <me-button :disabled="btnDisabledConfirm" @click="onConfirm" type="primary" width="80px">确 定</me-button>
      </slot>
    </div>
  </me-modal>
</template>

<script>

import Modal from '../modal.mixin'
export default {
  name: 'MeDialog',
  mixins: [Modal],
  props: {
    title: String,
    height: { type: String, default: '300px' },
    width: { type: String, default: '300px' },
    draggable: { type: Boolean, default: true },
    closable: { type: Boolean, default: true }
  },
  data() {
    return {
      btnDisabledConfirm: false
    }
  },
  methods: {
    onConfirm() {
      this.btnDisabledConfirm = true
      setTimeout(() => { this.btnDisabledConfirm = false }, 1000)
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="less" scoped>
.me-dialog {
  .dialog-header {
    align-items: center;
    padding: 15px 10px;
  }
  .dialog-body {
    padding: 5px;
    overflow: auto;
  }
  .dialog-footer {
    align-items: center;
    padding: 5px;
    justify-content: flex-end;
  }
}
</style>

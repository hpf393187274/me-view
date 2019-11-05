
<template>
  <me-modal v-model="value__">
    <div class="me-column me-flex me-dialog">
      <div class="me-row dialog-header">
        <slot name="header">
          <span :class="{'me-cursor-move': moveable}" class="me-flex">{{label}}</span>
          <me-icon @click="onCanel">icon-shanchu</me-icon>
        </slot>
      </div>
      <me-line-h />
      <div class="me-row me-flex dialog-body">
        <slot />
      </div>
      <me-line-h />
      <div class="me-row dialog-footer">
        <slot name="footer">
          <me-button @click="onCanel" width="80px">取 消</me-button>
          <me-button :disabled="btnDisabledConfirm" @click="onConfirm" type="primary" width="80px">确 定</me-button>
        </slot>
      </div>
    </div>
  </me-modal>
</template>

<script>

import Modal from './modal.mixin'
export default {
  name: 'MeDialog',
  mixins: [Modal],
  props: {
    label: String
  },
  data() {
    return {
      btnDisabledConfirm: false
    }
  },
  methods: {
    onCanel() {
      this.value__ = false
      this.$emit('canel')
    },
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
    .dialog-label {
    }
  }
  .dialog-body {
    padding: 5px;
    overflow: auto;
  }
  .dialog-footer {
    align-items: center;
    padding: 5px;
    justify-content: flex-end;
    > * {
      margin: 0px 10px;
    }
  }
}
</style>

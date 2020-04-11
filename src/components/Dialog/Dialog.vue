
<template>
  <me-modal
    :closable-modal="closableModal"
    :draggable="draggable"
    :height="height"
    :width="width"
    :z-index="zIndex"
    @cancel="$emit('cancel')"
    class-container="me-dialog"
    v-model="value__"
  >
    <div class="me-row dialog-header">
      <slot name="header">
        <span :class="{'me-cursor-move': moveable}" class="me-flex">{{title}}</span>
        <me-icon @click="handlerCancel" v-if="closable">icon-cross</me-icon>
      </slot>
    </div>
    <me-line-h />
    <div @mousedown.stop class="me-row me-flex dialog-body">
      <slot />
    </div>
    <me-line-h />
    <div @mousedown.stop class="me-row dialog-footer">
      <slot name="footer">
        <me-button @click="handlerCancel" width="80px">取 消</me-button>
        <me-button :disabled="btnDisabledConfirm" @click="handlerConfirm" type="primary" width="80px">确 定</me-button>
      </slot>
    </div>
  </me-modal>
</template>

<script>

import Modal from '../Modal/modal.mixin'
import MeModal from '../Modal'
import MeButton from '../Button'
import MeIcon from '../Icon'
import MeLineH from '../LineH'
let zIndex = 1000
export default {
  name: 'MeDialog',
  components: { MeButton, MeIcon, MeLineH, MeModal },
  mixins: [ Modal ],
  props: {
    title: { type: String, default: '' },
    height: String,
    width: String,
    draggable: { type: Boolean, default: true },
    closable: { type: Boolean, default: true }
  },
  data () {
    return {
      zIndex,
      btnDisabledConfirm: false
    }
  },
  created () {
    zIndex += 10
    this.zIndex = zIndex
  },
  watch: {
    /**
     * dialog 添加事件：显示 隐藏
     */
    value (newValue) { this.$emit(newValue === true ? 'dialog-show' : 'dialog-hide', newValue) }
  },
  methods: {
    handlerConfirm () {
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

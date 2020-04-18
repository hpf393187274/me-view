
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

import Modal from '../modal/modal.mixin'
import MeModal from '../modal/index'
import MeButton from '../button/index'
import MeIcon from '../icon/index'
import MeLineH from '../line-h/index'
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


<template>
  <me-modal
    :closable-modal="closableModal"
    :draggable="draggable"
    :min-height="minHeight"
    :min-width="minWidth"
    :height="height"
    :width="width"
    :z-index="zIndex"
    @cancel="$emit('cancel')"
    :vertical-align='verticalAlign'
    class-container="me-dialog"
    v-model="visibility"
  >
    <div class="me-row dialog-header">
      <slot name="header">
        <span :class="{'me-cursor-move': moveable}" class="me-flex">{{title}}</span>
        <me-icon @click="handlerCancel" v-if="closable">icon-cross</me-icon>
      </slot>
    </div>
    <div @mousedown.stop class="me-row me-flex dialog-body">
      <slot />
    </div>
    <template v-if="hideFooter !== true">
      <me-line-h />
      <div @mousedown.stop class="me-row dialog-footer">
        <slot name="footer">
          <me-button @click="handlerCancel">取 消</me-button>
          <me-button :disabled="btnDisabledConfirm" @click="handlerConfirm" type="primary">确 定</me-button>
        </slot>
      </div>
    </template>
  </me-modal>
</template>

<script>

import Modal from '../modal/modal.mixin'
let zIndex = 1000
export default {
  name: 'Dialog',
  mixins: [ Modal ],
  props: {
    title: { type: String, default: '' },
    minHeight: String,
    minWidth: String,
    height: String,
    width: String,
    hideFooter: Boolean,
    verticalAlign: String,
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
    value (newValue) {
      this.$emit('me-dialog--visible-change', newValue)
      this.$emit('me-attribute--visible-change', newValue)
      this.$emit(`me-attribute--visible-${newValue}`)
      this.$emit(`me-dialog--visible-${newValue}`)
    }
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

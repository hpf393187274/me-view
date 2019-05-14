
<template>
  <div :class="addClass('dialog')" v-if="value">
    <div class="dialog-container" :style="{ height: height, width: width}">
      <div class="dialog-header">
        <slot name="header">
          <span class="dialog-title" :class="{[preClass('cursor-move')]:moveable}">{{title}}</span>
          <me-icon @click="value=false">icon-shanchu</me-icon>
        </slot>
      </div>
      <div class="dialog-body">
        <slot/>
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <me-button @click="$emit('handleConfirm')">确 定</me-button>
          <me-button @click="value = false">取 消</me-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    value: Boolean,
    center: Boolean,
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '300px'
    },
    moveable: Boolean
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue)
    }
  },
  data() {
    return {}
  }
}
</script>

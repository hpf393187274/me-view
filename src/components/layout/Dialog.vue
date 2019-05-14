
<template>
  <div :class="addClass('dialog')" v-if="value">
    <div class="dialog-container" :style="{ height: height, width: width}">
      <div class="dialog-header">
        <slot name="header">
          <span class="dialog-title" :class="{[preClass('cursor-move')]:moveable}">{{title}}</span>
          <vv-icon @click="value=false">icon-shanchu</vv-icon>
        </slot>
      </div>
      <div class="dialog-body">
        <slot/>
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <vv-button @click="$emit('handleConfirm')">确 定</vv-button>
          <vv-button @click="value = false">取 消</vv-button>
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


<template>
  <div class="me-row me-center me-dialog" v-if="value">
    <div :style="{ height: height, width: width}" class="me-column dialog-container">
      <div class="me-row dialog-header">
        <slot name="header">
          <span :class="{'me-cursor-move':moveable}" class="me-flex dialog-label">{{label}}</span>
          <me-icon @click="value=false">icon-shanchu</me-icon>
        </slot>
      </div>
      <div class="me-row me-flex dialog-body">
        <slot/>
      </div>
      <div class="me-row dialog-footer">
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
  name: 'MeDialog',
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

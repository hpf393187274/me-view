
<template>
  <transition appear name="move-up">
    <div class="me-row me-cross-center me-message" :style="{ background }">
      <me-icon :class="type">{{icon}}</me-icon>
      <slot name="header">
        <div class="me-flex">
          <span>{{content}}</span>
        </div>
      </slot>
      <me-icon @click="$emit('remove', uniqueValue)" v-if="closable">icon-cross</me-icon>
    </div>
  </transition>
</template>

<script>
import MeIcon from '../icon/index'
export default {
  name: 'MeMessageItem',
  components: {
    MeIcon
  },
  props: {
    icon: String,
    content: String,
    uniqueValue: String,
    background: { type: String, default: '#ffffff' },
    type: String,
    duration: { type: Number, default: 2 },
    closable: { type: Boolean, default: true }
  },
  data () {
    return { closeTimer: null }
  },
  created () {
    this.clearCloseTimer()
    this.closeTimer = setTimeout(() => {
      this.$emit('remove', this.uniqueValue)
    }, this.duration * 1000)
  },
  methods: {
    clearCloseTimer () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    beforeDestroy () {
      this.clearCloseTimer()
    }
  }
}
</script>

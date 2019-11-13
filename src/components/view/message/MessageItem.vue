
<template>
  <transition appear name="move-up">
    <div class="me-row me-cross-center me-message">
      <me-icon :class="type">{{icon}}</me-icon>
      <slot name="header">
        <div class="me-flex">
          <span>{{content}}</span>
        </div>
      </slot>
      <me-icon @click="$emit('remove', primaryKey)" v-if="closable">icon-shanchu</me-icon>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'MeMessageItem',
  props: {
    icon: String,
    content: String,
    type: String,
    duration: { type: Number, default: 2 },
    closable: { type: Boolean, default: true }
  },
  data() {
    return { closeTimer: null }
  },
  created() {
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      this.$emit('remove', this.primaryKey)
    }, this.duration * 1000)
  },
  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    beforeDestroy() {
      this.clearCloseTimer();
    }
  }
}
</script>

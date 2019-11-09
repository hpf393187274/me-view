
<template>
  <div class="me-row me-cross-center me-message">
    <me-icon :class="type">{{icon}}</me-icon>
    <slot name="header">
      <div class="me-flex">
        <span>{{content}}</span>
      </div>
    </slot>
    <me-icon @click="$emit('remove', primaryKey)" v-if="closable">icon-shanchu</me-icon>
  </div>
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
  created() {
    setTimeout(() => {
      this.$emit('remove', this.primaryKey)
    }, this.duration * 1000)
  }
}
</script>

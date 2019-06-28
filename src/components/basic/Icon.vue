<template>
  <i
    :class="`iconfont ${$slots.default[0].text} me-icon`"
    :title="title"
    @click="handlerEvent('click')"
    @mouseout="handlerEvent('mouseout')"
    @mouseover="handlerEvent('mouseover')"
  />
</template>

<script>
export default {
  name: 'MeIcon',
  methods: {
    handlerEvent(eventName) {
      this.disabled === false && this.$emit(eventName)
    }
  }
}
</script>

<template>
  <i
    :class="`iconfont ${$slots.default[0].text} me-icon`"
    :title="title"
    @click.self="handlerEvent('click')"
    @mouseout="handlerEvent('mouseout')"
    @mouseover="handlerEvent('mouseover')"
  />
</template>

<script>
export default {
  name: 'MeIcon',
  props: {
    /**
     * 标题
     */
    title: { type: String, default: '' },
    disabled: Boolean
  },
  methods: {
    handlerEvent(eventName) {
      this.disabled === false && this.$emit(eventName)
    }
  }
}
</script>

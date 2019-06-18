<template>
  <button :class="classes" :disabled="disabled" :margin="margin" @click="click">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'MeButton',
  props: {
    type: { type: String, default: 'default' },
    ghost: Boolean
  },
  computed: {
    classes() {
      return [
        'me-btn',
        `me-btn-${this.type}`,
        {
          'me-btn-ghost': this.ghost
        }
      ]
    }
  },
  methods: {
    click() {
      console.log('click button 了一次')
      this.$emit('click')
    }
  }
}
</script>

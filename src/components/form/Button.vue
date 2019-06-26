<template>
  <button :class="classes" :disabled="disabled" :margin="margin" :style="styles" :title="label" @click="click">
    <me-icon v-if="boolean(icon)">{{icon}}</me-icon>
    <span class="button-inner" v-if="$slots.default">
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  name: 'MeButton',
  props: {
    type: { type: String, default: 'default' },
    shape: { type: String, default: 'default', validator: value => ['default', 'round', 'circle'].includes(value) },
    plain: Boolean
  },
  computed: {
    radius() {
      let value = ''
      return value
    },
    styles() {
      return {
        // 'border-radius': this.radius
      }
    },
    classes() {
      return [
        'me-btn',
        'me-row',
        'me-center',
        `me-btn-${this.type}`,
        {
          'me-btn-plain': this.plain,
          'me-btn-disabled': this.disabled,
          'me-btn-shape--round': this.shape === 'round',
          'me-btn-shape--circle': this.shape === 'circle'
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

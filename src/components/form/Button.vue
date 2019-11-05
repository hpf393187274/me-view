<template>
  <button :class="classes" :disabled="disabled" :margin="margin" :style="{width:width}" @click.stop="click">
    <me-icon v-if="boolean(icon)">{{icon}}</me-icon>
    <span class="button-inner">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'MeButton',
  props: {
    type: { type: String, default: 'default' },
    disabled: Boolean,
    width: String,
    margin: String,
    shape: { type: String, default: 'default', validator: value => ['default', 'round', 'circle'].includes(value) },
    plain: Boolean,
    icon: String
  },
  computed: {
    radius() {
      let value = ''
      return value
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
      this.$emit('click')
    }
  }
}
</script>

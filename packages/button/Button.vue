<template>
  <button
    v-bind="$props"
    v-on="$listeners"
    :class="classes"
    :style="{ width }"
    type="button"
    @click.stop="handlerClick">
    <me-icon v-if="isBoolean(icon)">{{icon}}</me-icon>
    <span class="button-inner">
      <slot />
    </span>
  </button>
</template>

<script>
import emitter from 'me-view/src/mixins/emitter'
import Common from 'me-view/src/mixins/common'
export default {
  name: 'Button',
  mixins: [ Common, emitter ],
  props: {
    name: { type: [ String, Number ], default: new Date().getTime() + '' },
    type: { type: String, default: 'default' },
    disabled: Boolean,
    width: String,
    margin: String,
    shape: { type: String, default: 'default', validator: value => [ 'default', 'round', 'circle' ].includes(value) },
    plain: Boolean,
    icon: String
  },
  computed: {
    classes () {
      return [
        'me-btn',
        'me-row',
        'me-center',
        `me-btn-${this.type__}`,
        {
          'me-btn-plain': this.plain,
          'me-btn-disabled': this.disabled,
          'me-btn-shape--round': this.shape === 'round',
          'me-btn-shape--circle': this.shape === 'circle'
        }
      ]
    }
  },
  data () {
    return {
      type__: this.type
    }
  },
  created () {
    this.dispatchParent(`${this.mePrefix}-button-group--register`, { name: this.name, component: this })
  },
  beforeDestroy () {
    this.dispatchParent(`${this.mePrefix}-button-group--destroy`, { name: this.name })
  },
  methods: {
    resetType () {
      this.type__ = this.type
    },
    handlerActivate () {
      this.type__ = 'primary'
    },
    handlerClick () {
      if (this.existParentComponent([ 'ButtonGroup' ])) {
        this.dispatchParent(`${this.mePrefix}-button-group--click`, { name: this.name, component: this })
        this.handlerActivate()
      }
    }
  }
}
</script>

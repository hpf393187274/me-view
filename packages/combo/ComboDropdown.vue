<template>
  <div class='me-column me-border combo-dropdown' :class='className' :style='styles' v-on="$listeners">
    <slot></slot>
  </div>
</template>
<script>
import emitter from 'me-view/src/mixins/emitter'
import { createPopper } from '@popperjs/core'
export default {
  name: 'ComboDropdown',
  mixins: [ emitter ],
  props: {
    placement: {
      default: 'bottom-start'
    },
    className: String
  },
  data () {
    return {
      popper: null,
      width: '',
      popperStatus: false
    }
  },
  computed: {
    styles () {
      const style = {}
      if (this.width) {
        style.width = `${this.width}px`
      }
      return style
    }
  },
  methods: {
    async update () {
      await this.$nextTick()
      if (this.popper) {
        console.log('methods --> update ----- this.popper = true')
        this.popper.forceUpdate()
        this.popperStatus = true
      } else {
        console.log('methods --> update ----- this.popper = false')
        this.popper = createPopper(this.$parent.$refs.input.$el, this.$el, {
          placement: this.placement,
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false // true by default
              }
            },
            {
              name: 'preventOverflow',
              options: {
                mainAxis: false,
                boundary: Window
              }
            }
          ],
          onFirstUpdate: () => {
            console.log('popper --> onFirstUpdate')
            this.resetTransformOrigin()
            this.$nextTick(this.popper.forceUpdate())
          }
        })
      }
      if (this.$parent.$options.name === 'MeCombo') {
        this.width = this.$parent.$el.getBoundingClientRect().width
      }
    },
    destroy () {
      if (this.popper) {
        setTimeout(() => {
          if (this.popper && !this.popperStatus) {
            this.popper.destroy()
            this.popper = null
          }
          this.popperStatus = false
        }, 300)
      }
    },
    resetTransformOrigin () {
      // 不判断，Select 会报错，不知道为什么
      if (!this.popper) { return }
      const { placement } = this.popper.state
      const [ direction ] = placement.split('-')
      if ([ 'bottom', 'top' ].includes(direction)) {
        this.popper.state.styles.popper.transformOrigin = direction === 'bottom' ? 'center top' : 'center bottom'
      }
    }
  },
  created () {
    this.listener('ComboDropdown--update-popper', this.update)
    this.listener('ComboDropdown--destroy-popper', this.destroy)
  },
  beforeDestroy () {
    if (this.popper) {
      this.popper.destroy()
    }
  }
}
</script>

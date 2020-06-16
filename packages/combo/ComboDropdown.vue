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
        this.popper.update()
        this.popperStatus = true
      } else {
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
          onCreate: () => {
            this.resetTransformOrigin()
            this.$nextTick(this.popper.update())
          },
          onUpdate: () => {
            this.resetTransformOrigin()
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
      if (!this.popper) return

      const placement = this.popper.getAttribute('x-placement')
      const [ placementStart, placementEnd ] = placement.split('-')
      const leftOrRight = placement === 'left' || placement === 'right'
      if (leftOrRight === false) {
        this.popper.popper.style.transformOrigin =
          placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
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

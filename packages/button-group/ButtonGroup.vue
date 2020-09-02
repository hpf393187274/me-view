<template>
  <div :class="[`${prefix}-button-group`]" :style="styles">
    <slot />
  </div>
</template>

<script>
import emitter from 'me-view/src/mixins/emitter'
import Tools from 'me-view/src/script/tools'
export default {
  name: 'ButtonGroup',
  mixins: [ emitter ],
  props: {
    value: [ String, Number ],
    gap: { type: String, default: '0px' }
  },
  data () {
    return {
      activeButton: null,
      buttonMap: {}
    }
  },
  created () {
    this.handlerEvent()
    this.$nextTick(() => {
      this.handlerInit()
    })
  },
  watch: {
    value (value) {
      this.handlerInit()
    }
  },
  computed: {
    size () {
      return Object.keys(this.buttonMap).length
    },
    styles () {
      return {
        'grid-template-columns': `repeat(${this.size}, 1fr)`,
        'grid-gap': this.gap
      }
    }
  },
  methods: {
    handlerInit () {
      if (Tools.notEmpty(this.value)) {
        const target = Reflect.get(this.buttonMap, this.value)
        if (target) {
          this.activeButton = target
          target.handlerActivate()
        }
      }
    },
    handlerEvent () {
      this.listener(`${this.prefix}-button-group--click`, ({ name, component }) => {
        if (this.activeButton) {
          this.activeButton.resetType()
        }
        this.$emit('input', name)
        this.activeButton = component
        this.$emit('click', name)
      })
      this.listener(`${this.prefix}-button-group--register`, ({ name, component }) => {
        this.$set(this.buttonMap, name, component)
      })
      this.listener(`${this.prefix}-button-group--destroy`, ({ name }) => {
        Reflect.deleteProperty(this.buttonMap, name)
      })
    }
  }
}
</script>

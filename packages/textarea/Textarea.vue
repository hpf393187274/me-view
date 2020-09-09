<template>
  <div :class="classes" :style="styles">
    <textarea
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="styletextarea"
      @change="handlerChange"
      @blur="$emit('blur', value__)"
      @focus="$emit('focus', value__)"
      @click.stop="$emit('click', value__)"
      class="me-flex textarea-inner"
      ref="target"
      :value="value__"
    ></textarea>
    <div class="me-row textarea-icon" ref="suffix" style="right: 5px;" v-if="showClear || isBoolean(iconSuffix) || $slots.suffix">
      <me-icon :disabled="disabled" @click="handlerClear" v-if="showClear">icon-cross</me-icon>
    </div>
  </div>
</template>

<script>
import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'
import common from 'me-view/src/mixins/common'
import emitter from 'me-view/src/mixins/emitter'
const alignEnum = [ 'left', 'center', '' ]
export default {
  name: 'Textarea',
  mixins: [ common, emitter ],
  model: {
    props: 'value', event: 'change'
  },
  props: {
    required: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    alignContent: { type: String, default: 'left', validator: value => alignEnum.includes(value) },
    width: String,
    height: String,
    value: String,
    rules: Array,
    minLength: Number,
    maxLength: Number,
    iconPrefix: String,
    iconSuffix: String,
    placeholder: String,
    readonly: Boolean
  },
  data () {
    return {
      left: 8,
      right: 8,
      value__: undefined,
      valueValid: undefined,
      validateStatus: '',
      rules__: [ ...this.rules || [] ],
      active: false
    }
  },
  created () {
    this.valueUpdate(this.value)
  },
  async mounted () {
    await this.$nextTick()
    this.$refs.prefix && (this.left += this.$refs.prefix.offsetWidth)
    this.$refs.suffix && (this.right += this.$refs.suffix.offsetWidth)
    this.$on('focus-input', this.handlerFocusInput)
    this.listenerUpward([ 'Label' ], 'me-label--status', status => {
      this.validateStatus = status
    })

    this.listenerUpward([ 'Label' ], 'me-label--reset', value => {
      this.valueUpdate(value)
      this.$emit('change', this.value__)
    })
  },
  computed: {
    showClear () {
      return this.disabled === false && this.clearable
    },
    classes () {
      return [
        'me-row',
        'me-textarea',
        'me-flex',
        {
          'me-readonly': this.readonly,
          'me-disabled': this.disabled,
          'me-textarea-error': this.validateStatus === 'error'
        }
      ]
    },
    styletextarea () {
      return {
        'padding-left': `${this.left}px`,
        'padding-right': `${this.right}px`,
        'text-align': this.alignContent
      }
    },
    styles () {
      const width = this.width
      const height = this.height
      const styles = { }
      if (width) {
        Object.assign(styles, { width, flex: '0 1 auto' })
      }
      if (height) {
        Object.assign(styles, { height, flex: '0 1 auto' })
      }
      return styles
    },
    paddingLeft () {
      return this.clearable ? 20 : 10
    },
    paddingRight () {
      return this.clearable ? 10 : 0
    }
  },
  watch: {
    value () {
      const newValue = Type.isArray(this.value) ? this.value.toString() : this.value
      const oldValue = Type.isArray(this.value__) ? this.value__.toString() : this.value__
      if (newValue !== oldValue) {
        this.dispatchUpward('Label', 'me-label--default-change', newValue)
        this.valueUpdate(newValue)
      }
    },
    rules: {
      deep: true,
      handler (value) {
        this.rules__ = [ ...value || [] ]
      }
    }
  },
  methods: {
    async validateValue (value) {
      if (Type.isArray(this.rules__) && Tools.notBlank(this.rules__)) {
        try {
          await Tools.validate(undefined, this.value__, this.rules__)
          console.debug('me-textarea valueUpdate -> then')
          return true
        } catch (message) {
          console.debug(`me-textarea valueUpdate ->catch message=${message}`)
          this.value__ = this.valueValid
          this.$emit('change', this.value__)
          return false
        }
      }
    },
    async valueUpdate (value, verify = false) {
      const newValue = value
      this.value__ = newValue
      this.validateValue(this.value__)
      if (verify === true) {
        const verify = await this.validateValue(value)
        if (verify === false) { return }
      }
      this.valueValid = newValue
      this.dispatchUpward('Label', 'me-label--change', { value: newValue, verify })
    },
    handlerChange ({ target }) {
      console.debug('handlerChange ---------> value')
      this.valueUpdate(target.value, true)
      this.$emit('change', this.value__)
    },
    /**
     * 重置
     */
    handlerClear () {
      this.valueUpdate(null)
      this.$emit('change', null)
    },
    handlerFocusInput () {
      this.$refs.target.focus()
    }
  }
}
</script>

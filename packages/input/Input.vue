<template>
  <div :class="classes" :style="styles">
    <input
      :multiple="multiple"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="styleInput"
      :type="type__"
      @change="handlerChange"
      @blur="$emit('blur', value__)"
      @focus="$emit('focus', value__)"
      @click.stop="$emit('click', value__)"
      class="me-flex input-inner"
      ref="target"
      :value="value__"
    />
    <div class="me-row input-icon" ref="prefix" style="left: 5px;" v-if="isBoolean(iconPrefix) || $slots.prefix">
      <slot name="prefix">
        <me-icon :disabled="disabled" @click="handlerClickPrefix" v-if="isBoolean(iconPrefix)">{{iconPrefix}}</me-icon>
      </slot>
    </div>

    <div class="me-row input-icon" ref="suffix" style="right: 5px;" v-if="showClear || isBoolean(iconSuffix) || $slots.suffix">
      <me-icon :disabled="disabled" @click="handlerClear" v-if="showClear">icon-cross</me-icon>
      <slot name="suffix">
        <me-icon :disabled="disabled" @click="handlerClickSuffix" v-if="isBoolean(iconSuffix)">{{iconSuffix}}</me-icon>
      </slot>
    </div>
  </div>
</template>

<script>
import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'
import common from 'me-view/src/mixins/common'
import emitter from 'me-view/src/mixins/emitter'
const typeNumberEnum = [ 'number', 'integer', 'float' ]
const typeEnum = [
  'text', 'email', 'password', ...typeNumberEnum
]
const alignEnum = [ 'left', 'center', '' ]
export default {
  name: 'Input',
  mixins: [ common, emitter ],
  model: {
    props: 'value', event: 'input-change'
  },
  props: {
    required: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    alignContent: { type: String, default: 'left', validator: value => alignEnum.includes(value) },
    width: String,
    height: String,
    type: { type: String, default: 'text', validator: value => typeEnum.includes(value) },
    value: [ Number, String, Array ],
    rules: Array,
    min: Number,
    max: Number,
    multiple: Boolean,
    minLength: Number,
    maxLength: Number,
    iconPrefix: String,
    iconSuffix: String,
    placeholder: String,
    pattern: String,
    readonly: Boolean
  },
  data () {
    return {
      left: 8,
      right: 8,
      type__: this.type === 'number' ? 'text' : this.type,
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

    this.handlerLableEvent(() => {
      const height = this.$el.getBoundingClientRect().height
      this.dispatchUpward('Label', 'me-label--label-height', height)
      this.listenerUpward([ 'Label' ], 'me-label--reset', value => {
        this.valueUpdate(value)
        this.$emit('input-change', this.value__)
      })
    })
  },
  computed: {
    showClear () {
      return this.disabled === false && this.clearable
    },
    classes () {
      return [
        'me-row',
        'me-input',
        'me-flex',
        {
          'me-readonly': this.readonly,
          'me-disabled': this.disabled,
          'me-input-error': this.validateStatus === 'error'
        }
      ]
    },
    styleInput () {
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
        this.handlerLableEvent(() => {
          this.dispatchUpward('Label', 'me-label--default-change', newValue)
        })
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
    convertType (value) {
      if (Tools.isBlank(value)) { return value }
      if (typeNumberEnum.includes(this.type) && /^(-?\d+)(\.\d+)?$/.test(value)) {
        // 转换为数字类型
        return Number(value)
      }
      return value
    },
    async validateValue (value) {
      if (Type.isArray(this.rules__) && Tools.notBlank(this.rules__)) {
        try {
          await Tools.validate(undefined, this.value__, this.rules__)
          console.debug('me-input valueUpdate -> then')
          return true
        } catch (message) {
          console.debug(`me-input valueUpdate ->catch message=${message}`)
          this.value__ = this.valueValid
          this.$emit('input-change', this.value__)
          return false
        }
      }
    },
    async valueUpdate (value, verify = false) {
      const newValue = this.convertType(value)
      this.value__ = newValue
      this.validateValue(this.value__)
      if (verify === true) {
        const verify = await this.validateValue(value)
        if (verify === false) { return }
      }
      this.valueValid = newValue
      this.handlerLableEvent(() => {
        this.dispatchUpward('Label', 'me-label--change', { value: newValue, verify })
      })
    },
    handlerChange ({ target }) {
      console.debug('handlerChange ---------> value')
      this.valueUpdate(target.value, true)
      this.$emit('input-change', this.value__)
      this.$emit('change', this.value__)
    },
    /**
     * Input
     */
    handlerLableEvent (callback = () => { }) {
      if (this.existParentComponent([ 'Combo' ])) { return }
      callback && callback.call(this)
    },
    /**
     * 重置
     */
    handlerClear () {
      this.valueUpdate(null)
      this.$emit('input-change', null)
      this.$emit('change', null)
    },
    handlerFocusInput () {
      this.$refs.target.focus()
    },
    handlerClickPrefix () {
      this.$emit('click-prefix-before', this.value__)
      this.$emit('click-prefix', this.value__)
      this.$emit('click-prefix-after', this.value__)
    },
    handlerClickSuffix () {
      this.$emit('click-suffix-before', this.value__)
      this.$emit('click-suffix', this.value__)
      this.$emit('click-suffix-after', this.value__)
    }
  }
}
</script>

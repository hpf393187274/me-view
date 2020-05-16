<template>
  <div :class="classes" :style="styles">
    <input
      :disabled="disabled"
      :max="max"
      :min="min"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="styleInput"
      :type="type__"
      @change="handlerChange"
      @blur="handleBlur"
      @click.stop="handleClick"
      @focus="handleFocus"
      class="me-flex input-inner"
      ref="target"
      v-model.trim.lazy="value__"
    />
    <div class="me-row input-icon" ref="prefix" style="left: 5px;" v-if="isBoolean(iconPrefix) || $slots.prefix">
      <slot name="prefix">
        <me-icon :disabled="disabled" @click="onClickPrefix" v-if="isBoolean(iconPrefix)">{{iconPrefix}}</me-icon>
      </slot>
    </div>

    <div class="me-row input-icon" ref="suffix" style="right: 5px;" v-if="showClear || isBoolean(iconSuffix) || $slots.suffix">
      <me-icon :disabled="disabled" @click="handlerReset" v-if="showClear">icon-cross</me-icon>
      <slot name="suffix">
        <me-icon :disabled="disabled" @click="onClickSuffix" v-if="isBoolean(iconSuffix)">{{iconSuffix}}</me-icon>
      </slot>
    </div>
  </div>
</template>

<script>
import common from 'me-view/src/mixins/common'
import emitter from 'me-view/src/mixins/emitter'
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'

const types = [ 'text', 'number', 'email', 'password' ]
const patterns = {
  number: /[0-0]+/,
  email: /^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$/
}

export default {
  name: 'MeInput',
  mixins: [ common, emitter ],
  model: {
    props: 'value', event: 'change'
  },
  props: {
    required: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    width: String,
    type: { type: String, default: 'text', validator: value => types.includes(value) },
    value: { type: [ Number, String, Array ], default: '' },
    min: Number,
    max: { type: Number, default: 1000000 },
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
      valueReset: undefined,
      validateStatus: '',
      active: false
    }
  },
  created () {
    this.valueInit(this.value)
    if (Tools.notEmpty(this.valueReset)) {
      this.handlerLableEvent(() => {
        this.dispatchUpward('MeLabel', 'on-label-init', this.valueReset)
      })
    }
  },
  async mounted () {
    await this.$nextTick()
    this.$refs.prefix && (this.left += this.$refs.prefix.offsetWidth)
    this.$refs.suffix && (this.right += this.$refs.suffix.offsetWidth)
    this.$on('focus-input', this.onFocusInput)
    this.listenerUpward('MeLabel', 'on-label-status', status => { this.validateStatus = status })

    this.handlerLableEvent(() => {
      this.listenerUpward('MeLabel', 'on-label-reset', this.valueUpdate)
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
        'padding-right': `${this.right}px`
      }
    },
    styles () {
      if (this.width) {
        return { width: this.width, flex: '0 1 auto' }
      }
      return { }
    },
    paddingLeft () {
      return this.clearable ? 20 : 10
    },
    paddingRight () {
      return this.clearable ? 10 : 0
    },
    pattern__ () {
      const value = Reflect.get(patterns, this.type)
      if (value) {
        return value
      }
      return this.pattern
    }
  },
  watch: {
    value (newValue) {
      this.value__ = newValue
    }
  },
  methods: {
    convertType (value) {
      if (this.type === 'number' && isNaN(value) === false) {
        // 转换为数字类型
        return Number(value)
      }
      return value
    },
    valueUpdate (value) {
      const newValue = this.convertType(value)
      const oldValue = this.value
      if (this.type === 'number') {
        if (isNaN(newValue) || newValue < this.min || newValue > this.max) {
          this.value__ = oldValue
          return
        }
      }
      this.value__ = newValue
      this.$emit('change', newValue)
      this.handlerLableEvent(() => {
        this.dispatchUpward('MeLabel', 'on-label-change', newValue)
      })
    },
    handlerChange ({ target }) {
      this.valueUpdate(target.value)
    },
    /**
     * MeInput
     */
    handlerLableEvent (callback = () => { }) {
      if (this.existParentComponent([ 'MeCombo' ])) { return }
      callback && callback.call(this)
    },
    valueInit (value) {
      if (Type.isArray(value)) {
        this.value__ = [ ...value ]
        this.valueReset = [ ...value ]
        return
      }
      this.value__ = value
      this.valueReset = value
    },
    /**
     * 重置
     */
    handlerReset () {
      this.valueUpdate(Tools.clone(this.valueReset, true))
    },
    handleFocus () {
      this.$emit('on-focus', this.value__)
    },
    handleBlur () {
      this.$emit('on-blur', this.value__)
    },
    setValue (value) {
      this.value__ = value
    },
    getValue () {
      return this.value__
    },
    handleClick () {
      this.$emit('on-click', this.value__)
    },
    onFocusInput () {
      this.$refs.target.focus()
    },
    onClickPrefix () {
      this.$emit('click-prefix-before', this.value__)
      this.$emit('click-prefix', this.value__)
      this.$emit('click-prefix-after', this.value__)
    },
    onClickSuffix () {
      this.$emit('click-suffix-before', this.value__)
      this.$emit('click-suffix', this.value__)
      this.$emit('click-suffix-after', this.value__)
    },
    onMouseenter () {
      if (this.disabled) { return }
      this.active = true
    },
    onMouseleave () {
      if (this.disabled) { return }
      this.active = false
    }
  }
}
</script>

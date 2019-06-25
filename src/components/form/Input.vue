<template>
  <div class="me-row me-input">
    <label :class="{'input-required': required}" class="me-row input-label" v-if="boolean(label)">{{ label }}：</label>
    <div :class="classWrap" :title="invalid.message" @mouseenter="active = true" @mouseleave="active = false">
      <input
        :disabled="disabled"
        :max="max"
        :min="min"
        :placeholder="placeholder"
        :readonly="readonly"
        :style="styles"
        :type="type"
        class="me-flex input-inner"
        ref="target"
        v-model="currentValue"
      >
      <div class="input-icon me-row" ref="prefix" style="left:5px;">
        <slot name="prefix">
          <me-icon @click="$emit('handle-prefix', currentValue)" v-if="boolean(iconPrefix)">{{iconPrefix}}</me-icon>
        </slot>
      </div>
      <div class="input-icon me-row" ref="suffix" style="right:5px;">
        <me-icon @click="reset" v-if="clearable" v-show="active">{{$config.icon.clear}}</me-icon>
        <slot name="suffix">
          <me-icon @click="$emit('handle-suffix', currentValue)" v-if="boolean(iconSuffix)">{{iconSuffix}}</me-icon>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
const types = ['text', 'number', 'email']
export default {
  name: 'MeInput',
  data() {
    return {
      left: 6,
      right: 6,
      currentValue: this.value,
      initValue: this.value,
      showClear: false,
      active: false,
      message: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.left += this.$refs.prefix.offsetWidth
      this.right += this.$refs.suffix.offsetWidth
    })
  },
  computed: {
    styles() {
      return {
        'padding-left': `${this.left}px`,
        'padding-right': `${this.right}px`
      }
    },
    paddingLeft() {
      let value = 10
      this.clearable === true && (value += 10)
      return value
    },
    paddingRight() {
      let value =
        this.clearable === true && (value += 10)
      return value
    },
    pattern__() {
      let value = this.pattern
      this.type === 'number' && (value = '[0-0]+')
      this.type === 'email' && (value = '^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$')
      return value
    },
    classWrap() {
      return [
        'me-row', 'me-flex', 'input-wrap',
        { 'input-invalid': this.invalid.status }
      ]
    },
    invalid() {
      if (this.required && this.$tools.isEmpty(this.currentValue)) {
        return { status: true, message: '内容不能为空' }
      }
      return { status: false }
    }
  },
  props: {
    placeholder: { type: String, default: '' },
    clearable: { type: Boolean },
    required: { type: Boolean },
    readonly: { type: Boolean },
    type: { type: String, default: 'text', validator: value => types.includes(value) },
    value: { type: [Number, String], default: '' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1000000 },
    minLength: { type: Number, default: 0 },
    maxLength: { type: Number, default: 0 },
    iconPrefix: String,
    iconSuffix: String,
    pattern: { type: String }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue, oldValue) {
      if (this.$refs.target.checkValidity() === false) {
        this.currentValue = oldValue
        return
      }
      const target = this.convertValue(newValue)
      console.log(this.$type.getType(target))
      this.$emit('input', target)
      this.$emit('change', target)
    },
    change(value) {
      this.$emit('input', this.convertValue(value))
      this.$emit('change', this.convertValue(value))
    }
  },
  methods: {
    convertValue(value) {
      if (this.type === 'number') {
        return Number(value)
      }
      return value
    },
    /**
     * 重置
     */
    reset() { this.currentValue = this.initValue }
  }
}
</script>

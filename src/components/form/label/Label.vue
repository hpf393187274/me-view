<template>
  <div :class="classes">
    <label :style="labelStyle" class="label-label" v-if="boolean(label)">
      <span style="color:red;" v-if="required__">*</span>
      {{label}}：
    </label>
    <div class="label-content me-flex">
      <slot>
        <div class="me-row me-cross-center label-content-slot">请在插巢填充元素</div>
      </slot>
      <div class="label-content-error" v-show="validateStatus==='error'">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import { type, tools } from '@assets/script/common'
import Validator from 'async-validator'
export default {
  name: 'MeLabel',
  props: {
    rules: {
      type: [Array, Object],
      validator: value => type.isObjectOrArray(value)
    },
    prop: String,
    required: Boolean,
    label: String,
    flex: Boolean,
    labelStyle: { type: Object, default() { return {} } },
    readonly: Boolean
  },
  data() {
    return {
      required__: this.required,
      validateMessage: '',
      validateStatus: '',
      FormInstance: null,
      rulesForm: {},
      rules__: [],
      valueCurrent: '',
      valueDefault: null,
    }
  },
  created() {
    this.setRules(this.rules)
  },
  computed: {
    classes() {
      return [
        'me-row me-label me-cross-start',
        { 'me-flex': this.flex }
      ]
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatchParent('MeForm', 'on-label-add', this)
      this.bindFormInstance()
    }
    this.bindFormElement()
  },
  beforeDestroy() {
    this.dispatchParent('MeForm', 'on-label-remove', this)
  },
  methods: {
    bindEventToFormElement() {
      this.$off('on-label-blur', this.validate)
      this.$on('on-label-blur', this.validate)
      this.$off('on-label-change', this.handlerElementChange)
      this.$on('on-label-change', this.handlerElementChange)
    },
    handlerElementChange(value) {
      if (!this.valueDefault) {
        Reflect.set(this, 'valueDefault', value)
      }
      this.valueCurrent = value
      this.validate('')
    },
    bindFormElement() {
      if (tools.isEmptyArray(this.$children)) { return }
      this.bindEventToFormElement()
    },
    bindFormInstance() {
      this.FormInstance = this.findParentComponent(['MeForm'])
      this.bindFormRules(/* 解析表达元素 prop */)
    },
    setRules(value) {
      if (tools.isEmpty(value)) { return }
      if (type.isArray(value) && value.length > 0) {
        this.rules__ = [...value]
      }
      if (type.isObject(value)) {
        this.rules__ = [value]
      }
    },
    bindFormRules() {
      if (this.prop && this.FormInstance) {
        this.rulesForm = this.FormInstance.rules
        const ruleProp = Reflect.get(this.rulesForm, this.prop)
        if (this.$type.isNotArray(ruleProp)) {
          return
        }
        this.setRules(ruleProp)
      }
    },
    setValidateInfo(status, message) {
      this.validateStatus = status
      this.validateMessage = message
      this.$emit('on-label-status', status)
    },
    /**
     * 校验表单元素
     */
    validate(trigger, callback = () => { }) {
      const _this = this
      const validator = new Validator({ [this.prop]: this.rules__ })
      validator.validate({ [this.prop]: this.valueCurrent }, { firstFields: true }).then(() => {
        _this.setValidateInfo('success')
        callback(true)
      }).catch(({ errors }) => {
        _this.setValidateInfo('error', errors[0].message)
        callback(false)
      })
    },
    reset() {
      console.log(`reset -> 当前值：${this.valueCurrent}, 默认值：${this.valueDefault}`)
      this.$emit('on-label-reset', this.valueDefault)
    }
  }
}
</script>

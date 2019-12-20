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
      <div class="label-content-error" v-show="validateError">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import { type, tools } from '@assets/script/common'
import Emitter from '@components/mixins/emitter'
import Validator from 'async-validator'
export default {
  mixins: [Emitter],
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
      validateError: false,
      FormInstance: null,
      rulesForm: {},
      rules__: [],
      formElement: null,
      value__: ''
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
      this.dispatch('MeForm', 'on-label-add', this)
    }
    this.bindFormElement()
    this.bindFormInstance()
  },
  beforeDestroy() {
    this.dispatch('MeForm', 'on-label-remove', this)
  },
  methods: {
    bindEventToFormElement() {
      if (!this.formElement) { return }
      this.formElement.$off('on-label-blur', this.validate)
      this.formElement.$on('on-label-blur', this.validate)
      this.formElement.$off('on-label-change', this.validate)
      this.formElement.$on('on-label-change', this.validate)
    },
    bindFormElement() {
      if (tools.isEmptyArray(this.$children)) { return }
      const elementList = ['MeInput', 'MeComboSelect', 'MeComboTable', 'MeComboTree']
      this.formElement = this.$children.find(item => elementList.includes(item.$options.name))
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
    /**
     * 校验表单元素
     */
    validate(trigger, callback = () => { }) {
      if (this.formElement) {
        const _this = this
        const validator = new Validator({ [this.prop]: this.rules__ })
        validator.validate({ [this.prop]: this.formElement.value }, { firstFields: true }).then(() => {
          _this.validateError = false
          _this.formElement && (_this.formElement.validateError = false)
          _this.validateMessage = ''
          callback(true)
        }).catch(({ errors }) => {
          _this.validateError = true
          _this.formElement && (_this.formElement.validateError = true)
          _this.validateMessage = errors[0].message
          callback(false)
        })
      } else {
        console.warn('There are no form elements in the MeLabel.')
        callback(true)
      }
    }
  }
}
</script>

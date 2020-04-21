<template>
  <div :class="classes">
    <label :style="labelStyle" class="label-label" v-if="isBoolean(label)">
      <span style="color:red;" v-if="required__">*</span>
      {{label}}：
    </label>
    <div class="label-content me-column me-flex">
      <slot>
        <div class="me-row me-cross-center label-content-slot">请在插巢填充元素</div>
      </slot>
      <div class="label-content-error" v-show="validateStatus==='error'">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import type from 'me-view/src/script/type'
import tools from 'me-view/src/script/tools'
import Assert from 'me-view/src/script/assert'
import common from 'me-view/src/mixins/common'
import emitter from 'me-view/src/mixins/emitter'
import Validator from 'async-validator'
export default {
  name: 'MeLabel',
  mixins: [ common, emitter ],
  props: {
    rules: {
      type: Array,
      default: () => {},
      validator: value => type.isArray(value)
    },
    prop: String,
    required: Boolean,
    label: String,
    flex: Boolean,
    labelStyle: { type: Object, default () { return {} } },
    readonly: Boolean
  },
  data () {
    return {
      required__: this.required,
      validateMessage: '',
      validateStatus: '',
      FormInstance: null,
      rules__: [],
      valueCurrent: '',
      valueDefault: null
    }
  },
  created () {
    this.setRules(this.rules)
  },
  computed: {
    classes () {
      return [
        'me-row me-label me-cross-start',
        { 'me-flex': this.flex }
      ]
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatchUpward('MeForm', 'on-label-add', this)
      this.bindFormInstance()
    }
    this.bindFormElement()
  },
  beforeDestroy () {
    this.dispatchUpward('MeForm', 'on-label-remove', this)
  },
  methods: {
    bindEventToFormElement () {
      this.listener('on-label-blur', this.handlerElementBlur)
      this.listener('on-label-change', this.handlerElementChange)
    },
    handlerElementBlur () {
      this.validate().catch(() => {})
    },
    handlerElementChange (value) {
      if (!this.valueDefault) {
        Reflect.set(this, 'valueDefault', value)
      }
      this.valueCurrent = value
      this.validate().catch(() => {})
    },
    bindFormElement () {
      if (tools.isEmptyArray(this.$children)) { return }
      this.bindEventToFormElement()
    },
    bindFormInstance () {
      this.FormInstance = this.findParentComponent([ 'MeForm' ])
      this.bindFormRules(/* 解析表达元素 prop */)
    },
    setRules (value) {
      if (tools.isEmpty(value)) { return }
      Assert.isArray(value, 'MeLabel rules 必须为数组')
      this.rules__ = [ value ]
    },
    bindFormRules () {
      if (this.prop && this.FormInstance) {
        const formRules = this.FormInstance.rules
        if (type.notObject(formRules)) {
          console.debug('MeForm.rules is not Object --> rules：', formRules)
          return
        }
        const ruleProp = tools.findPath(formRules, this.prop)
        this.setRules(ruleProp)
      }
    },
    setValidateInfo (status, message) {
      this.validateStatus = status
      this.validateMessage = message
      this.$emit('on-label-status', status)
    },
    /**
     * 校验表单元素
     */
    validate () {
      if (type.notArray(this.rules__)) {
        return Promise.resolve()
      }
      const validator = new Validator({ [this.prop]: this.rules__ })
      const _this = this
      return new Promise((resolve, reject) => {
        validator.validate({ [this.prop]: this.valueCurrent }, { firstFields: true })
          .then(() => {
            _this.setValidateInfo('success')
            resolve('success')
          })
          .catch(({ errors }) => {
            const [ error ] = errors
            _this.setValidateInfo('error', error.message)
            reject(error.message)
          })
      })
    },
    reset () {
      console.debug(`reset -> 当前值：${this.valueCurrent}, 默认值：${this.valueDefault}`)
      this.$emit('on-label-reset', this.valueDefault)
    }
  }
}
</script>

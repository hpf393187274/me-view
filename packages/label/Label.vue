<template>
  <div :class="classes" :style="styles">
    <label :style="labelStyle" class="label-title" v-if="isBoolean(title)">
      <span style="color:red;" v-if="required__">*</span>
      {{title}}：
    </label>
    <div class="label-content me-flex" :title="validateStatus==='error' ? validateMessage :''">
      <slot>
        <div class="me-row me-cross-center label-content-slot">请在插巢填充元素</div>
      </slot>
      <div class="label-content-error" v-if="errorStatus" v-show="validateStatus==='error'">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
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
      validator: value => Type.isArray(value)
    },
    errorStatus: { type: Boolean, default: true },
    errorWay: {
      type: String,
      default: 'down',
      validator: value => [ 'down', 'right' ].includes(value)
    },
    width: String,
    prop: String,
    required: Boolean,
    title: String,
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
    this.listenerEvents()
  },
  computed: {
    classes () {
      return [
        'me-row me-label me-cross-start me-flex'
      ]
    },
    styles () {
      if (this.width) {
        return { width: this.width, flex: '0 1 auto' }
      }
      return { }
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatchUpward('MeForm', 'on-label-add', this)
      this.bindFormInstance()
    }
  },
  beforeDestroy () {
    this.dispatchUpward('MeForm', 'on-label-remove', this)
  },
  methods: {
    listenerEvents () {
      this.listener('on-label-change', this.handlerElementChange)
      this.listener('on-label-init', value => {
        !this.valueDefault && (this.valueDefault = value)
      })
    },
    handlerElementChange (value) {
      this.valueCurrent = value
      this.validate().catch(() => {})
    },
    bindFormInstance () {
      this.FormInstance = this.findParentComponent([ 'MeForm' ])
      this.bindFormRules(/* 解析表达元素 prop */)
    },
    setRules (value) {
      if (Tools.isEmpty(value)) { return }
      Assert.isArray(value, 'MeLabel rules 必须为数组')
      this.rules__ = [ ...value ]
    },
    bindFormRules () {
      if (this.prop && this.FormInstance) {
        const formRules = this.FormInstance.rules
        if (Type.notObject(formRules)) {
          console.debug('MeForm.rules is not Object --> rules：', formRules)
          return
        }
        const ruleProp = Tools.findPath(formRules, this.prop)
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
      if (Type.notArray(this.rules__)) {
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

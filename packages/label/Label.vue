<template>
  <div :class="classes" :style="styles">
    <label :style="labelStyles" class="me-row label-title" v-if="isBoolean(title)">
      <span style="color:red;" v-if="required__">*</span>
      <span>{{title}}：</span>
    </label>
    <div class="label-content me-flex" :title="validateStatus==='error' ? validateMessage :''">
      <slot>
        <div class="me-row me-cross-center label-content-slot">请在插巢填充元素</div>
      </slot>
      <div class="label-content-error" v-if="errorHide === false" >
        <template v-show="validateStatus==='error'">
          {{validateMessage}}
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
import Assert from 'me-view/src/script/assert'
import common from 'me-view/src/mixins/common'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'Label',
  mixins: [ common, emitter ],
  props: {
    rules: {
      type: Array,
      default: () => {},
      validator: value => Type.isArray(value)
    },
    errorHide: Boolean,
    errorWay: {
      type: String,
      default: 'down',
      validator: value => [ 'down', 'right' ].includes(value)
    },
    width: String,
    prop: String,
    required: Boolean,
    title: String,
    layout: {
      type: String,
      default: 'row',
      validator: value => [ 'row', 'column' ].includes(value)
    },
    labelWidth: String,
    labelLayout: {
      type: String,
      default: 'flex-end',
      validator: value => [ 'flex-end', 'center', 'flex-start' ].includes(value)
    },
    labelHeight: { type: String, default: '35px' },
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
      valueCurrent: null,
      valueDefault: null,
      labelHeight__: this.labelHeight
    }
  },
  created () {
    if (this.required === true) {
      this.rules__.push({ required: true, message: `${this.title}不能为空` })
    }
    this.setRules(this.rules)
    this.listenerEvents()
  },
  watch: {
    required (value) {
      const rule = this.rules__.find(({ required }) => required === true)
      if (rule) {
        Reflect.set(rule, 'required', value)
      } else {
        this.rules__.push({ required: value, message: `${this.title}不能为空` })
      }
    }
  },
  computed: {
    classes () {
      return [
        `me-${this.layout}`,
        'me-label me-flex'
      ]
    },
    styles () {
      if (this.width) {
        return { width: this.width, flex: '0 1 auto' }
      }
      return { }
    },
    labelStyles () {
      return {
        ...this.labelStyle,
        width: this.labelWidth,
        height: this.labelHeight__,
        'justify-content': this.labelLayout
      }
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatchUpward('Form', 'me-form--add', this)
      this.initialize(this.valueCurrent)
      this.bindFormInstance()
    }
  },
  beforeDestroy () {
    this.dispatchUpward('Form', 'me-form--remove', this)
  },
  methods: {
    initialize (value) {
      let initialValue = value
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      this.valueDefault = initialValue
    },
    listenerEvents () {
      this.listener('me-label--change', this.handlerElementChange)
      this.listener('me-label--default-change', this.initialize)
      this.listener('me-label--label-height', value => { if (value > 0) { this.labelHeight__ = `${value}px` } })
    },
    handlerElementChange (value) {
      this.valueCurrent = value
      this.validate().catch(() => {})
    },
    bindFormInstance () {
      this.FormInstance = this.findParentComponent([ 'Form' ])
      this.bindFormRules(/* 解析表达元素 prop */)
    },
    setRules (value) {
      if (Tools.isBlank(value)) { return }
      Assert.isArray(value, 'Label rules 必须为数组')
      this.rules__.push(...value)
    },
    bindFormRules () {
      if (this.prop && this.FormInstance) {
        const formRules = this.FormInstance.rules
        if (Type.notObject(formRules)) {
          console.debug('Form.rules is not Object --> rules：', formRules)
          return
        }
        const ruleProp = Tools.findPath(formRules, this.prop)
        if (Type.isArray(ruleProp)) {
          const index = ruleProp.findIndex(({ required }) => required === true)
          if (index !== -1) {
            this.required__ = true
          }
        }
        this.setRules(ruleProp)
      }
    },
    setValidateInfo (status, message) {
      this.validateStatus = status
      this.validateMessage = message
      this.$emit('me-label--status', status)
    },
    /**
     * 校验表单元素
     */
    async validate () {
      try {
        const message = await Tools.validate(this.prop, this.valueCurrent, this.rules__)
        this.setValidateInfo(message)
        return Promise.resolve(message)
      } catch (message) {
        this.setValidateInfo('error', message)
        return await Promise.reject(message)
      }
    },
    reset () {
      this.$emit('me-label--reset', this.valueDefault)
    }
  }
}
</script>

<template>
  <div></div>
</template>
<script>
import Vue from 'vue'
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
export default {
  name: 'DynamicRender',
  props: {
    value: String,
    modelMethod: Function
  },
  data () {
    return {
      id: Tools.UUID(),
      template: null,
      style: null,
      script: null,
      defaultValue: {
        template: '<div>模板解析异常</div>',
        script: '{}',
        style: ''
      }
    }
  },
  created () {
    if (Tools.notBlank(this.value)) { this.parseValue(this.value) }
  },
  watch: {
    value (value) {
      if (Tools.notBlank(value)) { this.parseValue(value) }
    }
  },
  methods: {
    async parseValue (value) {
      await this.$nextTick()
      this.dynamicComponentTemplate()
    },
    strip (value, tag) {
      if (Tools.isBlank(value)) { return Reflect.get(this.defaultValue, tag) }
      const start = value.indexOf(`<${tag}>`)
      const end = value.lastIndexOf(`</${tag}>`)
      if (start === -1 || end === -1) {
        return Reflect.get(this.defaultValue, tag)
      }
      const target = value.substring(start, end)
      const tagLength = `<${tag}>`.length
      return target.substring(tagLength, target.length)
    },
    stripRegExp (value, tag) {
      if (Tools.isBlank(value)) { return Reflect.get(this.defaultValue, tag) }
      const regExp = new RegExp(`<${tag}[^<>]*>([\\s\\S]*)</${tag}>`)
      const rest = regExp.exec(value)
      return rest ? rest[rest.length - 1] : Reflect.get(this.defaultValue, tag)
    },
    /**
     * 动态组件 - 模板加载
     */
    async dynamicComponentTemplate () {
      if (Tools.isBlank(this.value)) { return }
      console.log(`dynamicComponentTemplate-----------${this.value}------------`, new Date().getTime())
      this.template = this.stripRegExp(this.value, 'template')
      this.script = this.stripRegExp(this.value, 'script')
      this.style = this.stripRegExp(this.value, 'style')
      const template = Vue.compile(this.template)
      const script = this.looseJsonParse(this.script)
      await this.dynamicComponent({ ...template, ...script })
      this.createStyle(this.style)
    },
    /**
     * 动态组件 - 单文件加载模式
     */
    async dynamicComponentSingle () {
      if (Tools.isBlank(this.value)) { return }
      const value = await import('@' + this.value)
      this.dynamicComponent({ ...value.default })
    },
    async dynamicComponent ({ data, ...other } = {}) {
      const newData = { dataModel: null }
      if (Tools.notEmpty(data)) {
        if (Type.isObject(data)) {
          Object.assign(newData, data)
        }
        if (Type.isFunction(data)) {
          Object.assign(newData, { ...(data() || {}) })
        }
      }
      if (Tools.notEmpty(this.modelMethod)) {
        if (Type.isAsyncFunction(this.modelMethod) || Type.isPromise(this.modelMethod) || Type.isFunction(this.modelMethod)) {
          Reflect.set(newData, 'dataModel', await this.modelMethod())
        }
      }
      const ComponentNew = Vue.extend({
        ...other,
        data () { return newData }
      })
      const childNodes = this.$el.childNodes
      if (!(childNodes == null || childNodes.length <= 0)) {
        this.$el.removeChild(childNodes[0])
      }
      const instance = new ComponentNew().$mount()
      this.$el.appendChild(instance.$el)
    },
    looseJsonParse (value) {
      const rest = /export\s+default\s*({[\s\S]*})/.exec(value)
      value = rest && rest[rest.length - 1]
      return Function(`"use strict"; return (${value})`)()
    },
    findStyle (id) {
      const styleList = document.getElementsByTagName('style')
      for (const style of styleList) {
        if (style && style.id === id) { return style }
      }
      return null
    },
    removeStyle () {
      const id = `data-v-${this.id}`
      const style = this.findStyle(id)
      if (Tools.notEmpty(style)) {
        document.head.removeChild(style)
      }
    },
    createStyle (value) {
      const id = `data-v-${this.id}`
      this.removeStyle(/** 销毁创建的样式 */)
      if (document.all) { // document.createStyleSheet(url)
        window.style = value
        document.createStyleSheet('javascript:style')
      } else { // document.createElement(style)
        const style = document.createElement('style')
        style.id = id
        style.type = 'text/css'
        style.innerHTML = value
        document.head.appendChild(style)
      }
    }
  },
  beforeDestroy () {
    this.removeStyle(/** 销毁创建的样式 */)
  }
}
</script>

<template>
  <div></div>
</template>
<script>
import Vue from 'vue'
import Tools from 'me-view/src/script/tools'
export default {
  name: 'DynamicRender',
  props: {
    value: String,
    dataModel: { type: Object, default () { return {} } }
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
  created () { this.parseValue(this.value) },
  watch: {
    value (value) {
      this.parseValue(value)
    }
  },
  methods: {
    async parseValue (value) {
      await this.$nextTick()
      this.dynamicCompile()
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
    async dynamicCompile () {
      if (Tools.isBlank(this.value)) { return }
      this.template = this.stripRegExp(this.value, 'template')
      this.script = this.stripRegExp(this.value, 'script')
      this.style = this.stripRegExp(this.value, 'style')

      const template = Vue.compile(this.template)
      const script = this.looseJsonParse(this.script)

      const dataModel = {
        ...(script.data && script.data()) || {},
        ...(this.dataModel || {})
      }
      Reflect.deleteProperty(script, 'data')
      const instance = new Vue({
        ...template,
        data () {
          return dataModel
        },
        ...script
      }).$mount()
      const childNodes = this.$el.childNodes
      if (!(childNodes == null || childNodes.length <= 0)) {
        this.$el.removeChild(childNodes[0])
      }
      this.$el.appendChild(instance.$el)
      this.createStyle(this.style)
    },
    async dynamicMount () {
      const value = await import('@' + this.value)
      const ComponentNew = Vue.extend({
        ...value.default,
        data () {
          return {
            ...(value.default.data && value.default.data()),
            ...this.dataModel
          }
        }
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

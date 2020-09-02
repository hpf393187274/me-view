<template>
  <div :class="[ { 'hover': hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false" class="me-container">
    <div class="container-view" ref="source"></div>
    <div class="container-meta" ref="meta">
      <div class="description" v-if="$slots.description">
        <slot name="description" />
      </div>
      <div class="default" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight"></div>
    </div>
    <div @click="isExpanded = !isExpanded" class="me-row me-center container-control" ref="control">
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
function stripScript (content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripStyle (content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripTemplate (content) {
  content = content.trim()
  if (!content) {
    return content
  }
  content = content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
  return content.replace(/^(<template[\s]*>)|(<\/template>)$/g, '').trim()
}

export default {
  name: 'DemoBlock',
  data () {
    return {
      codepen: {
        script: '',
        html: '',
        style: ''
      },
      hovering: false,
      isExpanded: false,
      scrollParent: null
    }
  },

  methods: {
    compileComponent () {
      let target = {}
      try {
        target = window.eval(`(${this.codepen.script.replace(/^export\s+default\s+/, '')})`)
      } catch (error) {
        console.debug('DemoBlock -> compileComponent：', error)
      }
      const Component = Vue.extend({
        template: `${this.codepen.html}`,
        mixins: [ target ]
      })
      const markedComponent = new Component().$mount()
      // 将挂载以后的子组件dom插入到父组件中
      // markedComponent.$el就是挂载后生成的渲染dom
      this.$refs.source.appendChild(markedComponent.$el)
    }
  },

  computed: {
    controlText () {
      return this.isExpanded ? '隐藏 Code' : '显示 Code'
    },

    codeArea () {
      return this.$el.getElementsByClassName('container-meta')[0]
    },

    codeAreaHeight () {
      const classDefault = this.$el.getElementsByClassName('default')
      const classHighlight = this.$el.getElementsByClassName('highlight')
      if (classDefault.length > 0) {
        return classDefault[0].clientHeight + classHighlight[0].clientHeight + 20
      }
      return classHighlight[0].clientHeight
    }
  },

  watch: {
    isExpanded (val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
    }
  },

  created () {
    this.$nextTick(() => {
      const slotDefault = this.$slots.default
      if (slotDefault && slotDefault[0]) {
        let code = ''
        let cur = slotDefault[0]
        if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
          cur = cur.children[0]
          if (cur.tag === 'code') {
            code = cur.elm.innerText
          }
        }
        if (code) {
          this.codepen.html = stripTemplate(code)
          this.codepen.script = stripScript(code)
          this.codepen.style = stripStyle(code)
          this.compileComponent()
        }
      }
    })
  },

  mounted () {
    this.$nextTick(() => {
      const highlight = this.$el.getElementsByClassName('highlight')[0]
      if (this.$el.getElementsByClassName('default').length === 0) {
        highlight.style.width = '100%'
        highlight.borderRight = 'none'
      }
    })
  }
}
</script>

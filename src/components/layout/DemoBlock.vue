<template>
  <div :class="[blockClass, { 'hover': hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false" class="demo-block">
    <div class="source" ref="source"></div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.description">
        <slot name="description" />
      </div>
      <div class="default" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight"></div>
    </div>
    <div @click="isExpanded = !isExpanded" class="me-row me-center demo-block-control" ref="control">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>

<style lang="less">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
  }
  .default {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }
  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 868px;
    }

    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
</style>

<script type="text/babel">
import Vue from 'vue'
function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

export default {
  name: 'MeDemoBlock',
  data() {
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
    compileComponent() {
      let target = {}
      try {
        target = eval(`(${this.codepen.script.replace(/^export\s+default\s+/, '')})`)
      } catch (error) {
        console.error('DemoBlock -> compileComponent：', error)
      }
      const Component = Vue.extend({
        template: `<div>${this.codepen.html}</div>`,
        mixins: [target]
      })
      const markedComponent = new Component().$mount()
      // 将挂载以后的子组件dom插入到父组件中
      // markedComponent.$el就是挂载后生成的渲染dom
      this.$refs['source'].appendChild(markedComponent.$el)
    }
  },

  computed: {
    lang() {
      return '' // this.$route.path.split('/')[1]
    },

    // langConfig() {
    //   return compoLang.filter(config => config.lang === this.lang)[0]['demo-block']
    // },

    blockClass() {
      return '' // `demo-${this.lang} demo-${this.$router.currentRoute.path.split('/').pop()}`
    },

    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },

    controlText() {
      return this.isExpanded ? '隐藏 Code' : '显示 Code'
    },

    codeArea() {
      return this.$el.getElementsByClassName('meta')[0]
    },

    codeAreaHeight() {
      if (this.$el.getElementsByClassName('default').length > 0) {
        return this.$el.getElementsByClassName('default')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight + 20
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    }
  },

  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
    }
  },

  created() {
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

  mounted() {
    this.$nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0]
      if (this.$el.getElementsByClassName('default').length === 0) {
        highlight.style.width = '100%'
        highlight.borderRight = 'none'
      }
    })
  }
}
</script>

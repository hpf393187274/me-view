<template>
  <div :class="[ { 'hover': hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false" class="me-container">
    <me-dynamic-render class="container-view" :value="content" />
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
export default {
  name: 'DemoBlock',
  data () {
    return {
      content: '',
      hovering: false,
      isExpanded: false
    }
  },
  methods: {
    modelMethod () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ name: '2222', age: 33 })
        }, 1000 * 2)
      })
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
          this.content = code
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

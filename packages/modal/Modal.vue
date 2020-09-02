<template>
  <div @click.self="handlerClick" class="me-row me-center me-modal" :style="{ 'z-index': zIndex}" v-if="modal" v-show="visibility">
    <div :class="classContainer" :style="styles" @mousedown="onMouseDown" class="me-column modal-container" ref="target">
      <slot>
        <me-button @click="handlerCancel">关闭</me-button>
      </slot>
    </div>
  </div>
  <div :class="classContainer" :style="{...styles, 'z-index': zIndex}" @mousedown="onMouseDown" class="me-column modal-container" ref="target" v-else v-show="visibility" >
    <slot>
      <me-button @click="handlerCancel">关闭</me-button>
    </slot>
  </div>
</template>
<script>
import Modal from './modal.mixin'
import Draggable from 'me-view/src/mixins/draggable'
import Tools from 'me-view/src/script/tools'

export default {
  name: 'Modal',
  mixins: [ Modal, Draggable ],
  props: {
    height: String,
    width: String,
    minHeight: String,
    minWidth: String,
    verticalAlign: { type: String, default: 'center' },
    background: { type: String, default: '#ffffff' },
    zIndex: { type: Number, default: 1000 }
  },
  data () {
    return {
      width__: Tools.convertToNumber(this.width),
      height__: Tools.convertToNumber(this.height)
    }
  },
  watch: {
    width (newValue) {
      this.width__ = Tools.convertToNumber(newValue)
    },
    height (newValue) {
      this.height__ = Tools.convertToNumber(newValue)
    },
    visibility (newValue) {
      if (newValue) {
        this.initPointMax()
      }
    }
  },
  methods: {
    handlerClick () {
      if (this.closableModal === true) {
        this.handlerCancel()
      }
    },
    handlerDragging () { this.handlerDrag() },
    handlerDragEnd () { this.handlerDrag() },
    handlerDrag () {
      this.position = { ...this.pointEnd }
    },
    /**
     * 初始化定位
     */
    initPosition () {
      /** 水平默认居中 */
      this.position.x = (this.containerMax.x - this.width__) / 2
      switch (this.verticalAlign) {
        case 'center':
          this.position.y = (this.containerMax.y - this.height__) / 2
          break
        case 'top':
          this.position.y = 0
          break
        case 'bottom':
          this.position.y = this.containerMax.y - this.height__
          break
        default:
          this.position.y = Tools.convertToNumber(this.verticalAlign)
      }
      if (this.left) {
        Reflect.set(this.position, 'x', Tools.convertToNumber(this.left))
      }
      if (this.top) {
        Reflect.set(this.position, 'y', Tools.convertToNumber(this.top))
      }
      Object.assign(this.pointStart, this.position)
    },
    initPointMax () {
      this.$nextTick(() => {
        var target = this.$refs.target
        this.width__ = target.scrollWidth
        this.height__ = target.scrollHeight

        this.initPosition()

        Object.assign(this.pointMax, {
          x: this.containerMax.x - this.width__, y: this.containerMax.y - this.height__
        })
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      const container = window.document.body.getBoundingClientRect()
      Object.assign(this.containerMax, {
        x: container.width, y: container.height
      })
      this.pointMax = { ...this.containerMax }
      if (this.visibility) {
        // 创建就显示的 场景
        this.initPointMax()
      }
    })
  },
  computed: {
    styles () {
      const styleBasal = {
        width: this.width,
        height: this.height,
        'min-height': this.minHeight,
        'min-width': this.minWidth,
        background: this.background,
        left: `${this.position.x}px`,
        top: `${this.position.y}px`
      }
      if (this.modal === false) {
        Object.assign(styleBasal, { position: 'fixed' })
      }
      return styleBasal
    }
  }
}
</script>

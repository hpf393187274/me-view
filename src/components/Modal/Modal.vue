<template>
  <div @click.self="handlerClick" class="me-row me-center me-modal" :style="{ 'z-index': zIndex}" v-if="modal" v-show="value__">
    <div :class="classContainer" :style="styles" @mousedown="onMouseDown" class="me-column modal-container" ref="target">
      <slot>
        <me-button @click="handlerCancel">关闭</me-button>
      </slot>
    </div>
  </div>
  <div :class="classContainer" :style="styles" @mousedown="onMouseDown" class="me-column modal-container" ref="target" v-else v-show="value__" >
    <slot>
      <me-button @click="handlerCancel">关闭</me-button>
    </slot>
  </div>
</template>
<script>
import Modal from './modal.mixin'
import Draggable from '../mixins/draggable'
import MeButton from '../button/index'
import tools from '../../script/Tools.class'

export default {
  name: 'MeModal',
  mixins: [ Modal, Draggable ],
  components: { MeButton },
  props: {
    height: String,
    width: String,
    background: { type: String, default: '#ffffff' },
    zIndex: { type: Number, default: 1000 }
  },
  data () {
    return {
      width__: tools.convertToNumber(this.width),
      height__: tools.convertToNumber(this.height)
    }
  },
  watch: {
    width (newValue) {
      this.width__ = tools.convertToNumber(newValue)
    },
    height (newValue) {
      this.height__ = tools.convertToNumber(newValue)
    },
    value__ (newValue) {
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
    initPosition () {
      Object.assign(this.position, {
        x: (this.containerMax.x - this.width__) / 2,
        y: (this.containerMax.y - this.height__) / 2
      })
      if (this.left) {
        Reflect.set(this.position, 'x', tools.convertToNumber(this.left))
      }
      if (this.top) {
        Reflect.set(this.position, 'y', tools.convertToNumber(this.top))
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
      var container = window.document.body
      Object.assign(this.containerMax, {
        x: container.scrollWidth, y: container.scrollHeight
      })
      this.pointMax = { ...this.containerMax }
      if (this.value__) {
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
        background: this.background,
        left: `${this.position.x}px`,
        top: `${this.position.y}px`
      }
      if (this.modal === false) {
        Object.assign(styleBasal, {
          position: 'fixed'
        })
      }
      return styleBasal
    }
  }
}
</script>

<template>
  <div :class="classes" :style="styles">
    <div :style="stylesAxis" class="slidebar-axis" v-if="hidden === false" />
    <div :style="stylesBtn" @mousedown="onMouseDown" class="slidebar-button" ref="button" />
  </div>
</template>

<script>
import Draggable from '@components/mixins/draggable'
export default {
  name: 'MeSlidebar',
  mixins: [Draggable],
  props: {
    layout: { type: String, default: 'center', validator: value => ['center', 'incircle'].includes(value) },
    length: { type: Number, default: 30 },
    width: { type: Number, default: 30 },
    hidden: Boolean,
    vertical: Boolean,
    value: { type: Number, default: 0 },
    size: { type: Number, default: 100 }
  },
  data() {
    return {
      value__: 0,
      axisValue: 0,
      axisSize: 0,
      position: 0
    }
  },
  watch: {
    value() {
      if (this.dragging === false) {
        this.initPosition()
      }
    },
    position() {
      this.$emit('input', this.value__)
    }
  },
  computed: {
    halfLength() {
      return this.length / 2
    },
    halfWidth() {
      return this.width
    },
    classes() {
      return [
        'me-slidebar',
        {
          'me-row': this.vertical,
          'me-column': this.vertical === false,
          'me-slidebar-vertical': this.vertical,
          'me-slidebar-horizontal': this.vertical === false
        }
      ]
    },
    styles() {
      return {
        'justify-content': 'center',
        'border-radius': `${this.halfWidth}px`,
        [this.vertical ? 'width' : 'height']: `${this.width}px`,
      }
    },
    stylesBtn() {
      return {
        'border-radius': `${this.halfWidth}px`,
        [this.vertical ? 'height' : 'width']: `${this.length}px`,
        [this.vertical ? 'top' : 'left']: `${this.positionBtn}px`
      }
    },
    stylesAxis() {
      return {
        'border-radius': `${this.halfWidth}px`,
        [this.vertical ? 'height' : 'width']: `${this.position}px`
      }
    },
    positionBtn() {
      if (this.layout === 'center') {
        return this.position - this.halfLength
      }
      return this.position
    },
    containerLength() {
      return this.vertical ? this.pointMax.y : this.pointMax.x
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.layout === 'center') {
        Object.assign(this.pointMax, {
          x: this.$el.scrollWidth, y: this.$el.scrollHeight
        })
      }
      if (this.layout === 'incircle') {
        Object.assign(this.pointMax, {
          x: this.$el.scrollWidth - this.width,
          y: this.$el.scrollHeight - this.length
        })
      }
      this.initPosition()
    })
  },
  methods: {
    handlerDrag() {
      const { x, y } = this.pointEnd
      this.position = this.vertical ? y : x
      this.value__ = this.calculateValue()
    },
    calculateValue() {
      return Math.round(this.position * this.size / this.containerLength)
    },
    calculatePosition() {
      return Math.round(this.value * this.containerLength / this.size)
    },
    handlerDragging() { this.handlerDrag() },
    handlerDragEnd() { this.handlerDrag() },
    initPosition() {
      this.position = this.calculatePosition()
      this.verifyPointEnd()
      this.value__ = this.value
      Object.assign(this.pointStart, { x: this.position, y: this.position })
    }
  }
}
</script>

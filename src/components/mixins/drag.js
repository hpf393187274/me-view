
export default {
  props: {
    value: { type: Number, default: 30 },
    length: { type: Number, default: 100 },
    width: { type: Number, default: 40 },
    vertical: Boolean,
  },
  data() {
    return {
      dragging: false,
      isClick: false,
      clientStart: 0,
      valueStart: this.value,
      valueCurrent: this.value,
      max__: this.max || 0,
      min__: this.min || 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.vertical) {
        this.max__ = this.$el.scrollHeight - this.$refs.button.scrollHeight
      } else {
        this.max__ = this.$el.scrollWidth - this.$refs.button.scrollWidth
      }
    })
  },
  watch: {
    valueCurrent(newValue) {
      this.$emit('input', newValue)
    },
    value(value) {
      this.setPosition(value)
    }
  },
  computed: {
    classes() {
      return [
        'me-slidebar',
        {
          'me-slidebar-vertical': this.vertical,
          'me-slidebar-horizontal': this.vertical === false
        }
      ]
    },
    styles() {
      return {
        [this.vertical ? 'width' : 'height']: `${this.width}px`,
      }
    },
    stylesBtn() {
      return {
        'border-radius': `${this.width / 2}px`,
        [this.vertical ? 'height' : 'width']: `${this.length}px`,
        [this.vertical ? 'top' : 'left']: `${this.valueCurrent}px`
      }
    }
  },
  methods: {
    handlerMouseDown(event) {
      if (this.disabled) { return }
      event.preventDefault();
      this.handlerDragStart(event);
      window.addEventListener('mousemove', this.handlerDragging);
      window.addEventListener('touchmove', this.handlerDragging);
      window.addEventListener('mouseup', this.handlerDragEnd);
      window.addEventListener('touchend', this.handlerDragEnd);
      window.addEventListener('contextmenu', this.handlerDragEnd);
    },
    handlerDragStart(event) {
      this.dragging = true;
      this.isClick = true;
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      this.clientStart = this.vertical ? event.clientY : event.clientX
    },
    handlerDragging(event) {
      if (this.dragging === false) { return }
      this.isClick = false;

      if (event.type === 'touchmove') {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      const clientEnd = this.vertical ? event.clientY : event.clientX
      let diff = clientEnd - this.clientStart
      this.setPosition(this.valueStart + diff)
    },
    handlerDragEnd() {
      if (this.dragging === false) { return }
      /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
      setTimeout(() => {
        this.dragging = false;
        if (this.isClick === false) {
          this.setPosition(this.newPosition);
          this.valueStart = this.valueCurrent
        }
      }, 0);
      window.removeEventListener('mousemove', this.handlerDragging);
      window.removeEventListener('touchmove', this.handlerDragging);
      window.removeEventListener('mouseup', this.handlerDragEnd);
      window.removeEventListener('touchend', this.handlerDragEnd);
      window.removeEventListener('contextmenu', this.handlerDragEnd);
    },
    setPosition(newPosition) {
      if (newPosition === null || isNaN(newPosition)) return;
      if (newPosition < this.min__) {
        newPosition = this.min__
        this.$emit('input', newPosition)
      }
      if (newPosition > this.max__) {
        newPosition = this.max__
        this.$emit('input', newPosition)
      }
      this.valueCurrent = newPosition
    }
  }
}
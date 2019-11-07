export default {
  data() {
    return {
      dragging: false,
      isClick: false,
      position: { x: 0, y: 0 },
      pointStart: { x: 0, y: 0 },
      pointEnd: { x: 0, y: 0 },
      pointMin: { x: 0, y: 0 },
      pointMax: { x: 0, y: 0 },
      clientStart: { x: 0, y: 0 },
      clientEnd: { x: 0, y: 0 }
    }
  },
  methods: {
    onMouseDown(event) {
      if (this.disabled) { return }
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onDragStart(event) {
      this.dragging = true;
      this.isClick = true;
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }


      Object.assign(this.clientStart, { x: event.clientX, y: event.clientY })
      this.handlerDragStart && this.handlerDragStart()
    },
    onDragging(event) {
      if (this.dragging === false) { return }
      this.isClick = false;

      if (event.type === 'touchmove') {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }

      Object.assign(this.clientEnd, { x: event.clientX, y: event.clientY })
      Object.assign(this.pointEnd, {
        x: this.pointStart.x + (this.clientEnd.x - this.clientStart.x),
        y: this.pointStart.y + (this.clientEnd.y - this.clientStart.y)
      })
      this.verifyPointEnd()
      this.handlerDragging && this.handlerDragging()
    },
    onDragEnd() {
      if (this.dragging === false) { return }
      /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
      setTimeout(() => {
        this.dragging = false;
        if (this.isClick === false) {
          this.verifyPointEnd()
          Object.assign(this.pointStart, { x: this.pointEnd.x, y: this.pointEnd.y })
          this.handlerDragEnd && this.handlerDragEnd()
        }
      }, 0);
      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('touchmove', this.onDragging);
      window.removeEventListener('mouseup', this.onDragEnd);
      window.removeEventListener('touchend', this.onDragEnd);
      window.removeEventListener('contextmenu', this.onDragEnd);
    },
    verifyPointEnd() {
      const { x, y } = this.pointEnd
      let flag = false
      if (x < this.pointMin.x) {
        this.pointEnd.x = this.pointMin.x
        flag = true
      }
      if (y < this.pointMin.y) {
        this.pointEnd.y = this.pointMin.y
        flag = true
      }
      if (x > this.pointMax.x) {
        this.pointEnd.x = this.pointMax.x
        flag = true
      }
      if (y > this.pointMax.y) {
        this.pointEnd.y = this.pointMax.y
        flag = true
      }

      if (flag && this.handlerBoundary) {
        // 若点位越界，则进行越界回调
        this.handlerBoundary()
      }
    }
  }
}
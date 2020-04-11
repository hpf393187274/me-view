<template>
  <div><slot /></div>
</template>

<script>
(() => {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
  document.body.appendChild(scrollDiv)
  window.horizontalSize = scrollDiv.offsetWidth - scrollDiv.clientWidth
  window.verticalSize = scrollDiv.offsetHeight - scrollDiv.clientHeight
  document.body.removeChild(scrollDiv)
})()
export default {
  name: 'MeScrollbar',
  props: {
    difference: Number
  },
  data () {
    return {
      verticalStatus: null,
      horizontalStatus: null,
      interval: null
    }
  },
  mounted () {
    this.interval = window.setInterval(this.monitor, 100)
  },
  watch: {
    verticalStatus (value) {
      this.$emit('scroll-render-v', {
        status: value, size: window.verticalSize
      })
    },
    horizontalStatus (value) {
      this.$emit('scroll-render-h', {
        status: value, size: window.horizontalSize
      })
    }
  },
  destroyed () {
    window.clearInterval(this.interval)
  },
  methods: {
    monitor () {
      const target = this.$el
      this.verticalStatus = target.scrollHeight > (target.innerHeight || target.clientHeight)
      this.horizontalStatus = target.scrollWidth > (target.innerWidth || target.clientWidth)
    }
  }
}
</script>

<template>
  <div :class="classes" @DOMMouseScroll="handlerMousewheel" @mousewheel="handlerMousewheel">
    <div class="scrollbar-body" ref="body">
      <slot />
    </div>
    <div class="scrollbar-wrap scrollbar-vertical" ref="wrap" v-if="vertical">
      <me-slidebar :length="100" :size="sizeV" :width="15" hidden layout="incircle" v-model="value__" vertical />
    </div>
    <div class="scrollbar-wrap scrollbar-horizontal" ref="wrap" v-if="horizontal">
      <me-slidebar :length="100" :size="sizeH" :width="15" hidden layout="incircle" v-model="value__" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeScrollbar',
  data() {
    return {
      vertical: false,
      horizontal: false,
      value__: 0,
      sizeStep: 10,
      sizeV: 0,
      sizeH: 0,
    }
  },
  created() {
    this.$nextTick(() => {
      this.vertical = this.$refs.body.scrollHeight > this.$el.scrollHeight
      this.horizontal = this.$refs.body.scrollWidth > this.$el.scrollWidth
      this.sizeV = this.$refs.body.scrollHeight
      this.sizeH = this.$refs.body.scrollWidth
      this.sizeStep = Math.round(this.sizeV * 0.1)
    })
  },
  computed: {
    classes() {
      return [
        'me-scrollbar'
      ]
    }
  },
  watch: {
    value__(value) {
      this.$nextTick(() => {
        this.$refs.body.scrollTop = value
      })
    }
  },
  methods: {
    handlerMousewheel(event) {
      if (this.vertical === false) { return }
      event.preventDefault();
      const detail = event.deltaY ? -event.wheelDelta : event.detail
      this.value__ += detail > 0 ? this.sizeStep : -this.sizeStep


      if (this.value__ < 0) { this.value__ = 0 }
      if (this.value__ > this.sizeV) { this.value__ = this.sizeV }
    }
  }
}
</script>

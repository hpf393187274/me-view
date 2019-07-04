<template>
  <div :class="classes" @DOMMouseScroll="handlerMousewheel" @mousewheel="handlerMousewheel">
    <div class="scrollbar-body" ref="body">
      {{vertical}}
      <slot />
    </div>
    <div class="scrollbar-wrap scrollbar-vertical" ref="wrap" v-if="vertical">
      <me-slidebar :width="15" v-model="value__" vertical />
    </div>
    <div class="scrollbar-wrap scrollbar-horizontal" ref="wrap" v-if="horizontal">
      <me-slidebar :width="15" v-model="value__" />
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
      value__: 12,
    }
  },
  created() {
    this.$nextTick(() => {
      this.vertical = this.$refs.body.scrollHeight > this.$el.scrollHeight
      this.horizontal = this.$refs.body.scrollWidth > this.$el.scrollWidth
    })
  },
  computed: {
    classes() {
      return [
        'me-cloumn',
        // {
        //   'me-row': this.vertical,
        //   'me-cloumn': this.vertical === false
        // },
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
      if (event.deltaY) {
        // 非火狐
        this.value__ += -event.wheelDelta
      } else {
        this.value__ += event.detail
      }
    }
  }
}
</script>

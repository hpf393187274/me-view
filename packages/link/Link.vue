<template>
  <a :class="class__" :title="title" @click="handlerClick" href="javascript:void(0)">
    <me-icon v-if="isBoolean(icon)">{{icon}}</me-icon>
    <slot />
  </a>
</template>

<script>
import common from 'me-view/src/mixins/common'
import Tools from 'me-view/src/script/tools'
export default {
  name: 'Link',
  mixins: [ common ],
  props: {
    icon: String,
    title: { type: String, default: '' },
    target: { type: String, default: '_blank', validator: value => [ '_blank', '_parent', '_self', '_top' ].includes(value) },
    url: String
  },
  computed: {
    class__ () {
      return [ 'me-link', { 'link-border': this.border } ]
    }
  },
  methods: {
    handlerClick () {
      if (this.disabled) { return }
      this.$emit('click')
      if (Tools.notEmpty(this.url)) {
        window.open(this.url, this.target)
      }
    }
  }
}
</script>

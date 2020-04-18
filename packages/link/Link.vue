<template>
  <a :class="class__" @click="handlerClick" href="javascript:void(0)">
    <me-icon v-if="isBoolean(icon)">{{icon}}</me-icon>
    <slot />
  </a>
</template>

<script>
import common from 'me-view/src/mixins/common'
import tools from 'me-view/src/script/Tools.class'
export default {
  name: 'MeLink',
  mixins: [ common ],
  props: {
    icon: String,
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
      if (tools.notEmpty(this.url)) {
        window.open(this.url, this.target)
      }
    }
  }
}
</script>


<template>
  <div class="tab-title-item" :class="{ 'activated': activated }">
    <div class="me-grid-center" @click="handlerTitle"><slot/></div>
    <me-icon class="me-grid-center" v-if="closable === true" @click="handlerClose">icon-cross</me-icon>
  </div>
</template>
<script>
import emitter from 'me-view/src/mixins/emitter'
export default {
  mixins: [ emitter ],
  name: 'TabTitle',
  props: {
    title: String,
    name: String,
    closable: { type: Boolean, default: null }
  },
  data () {
    return {
      activated: false
    }
  },
  created () {
    this.dispatchParent('tab-title-add', this.getParams())
  },
  methods: {
    setActivated (value) { this.activated = value },
    handlerTitle () {
      this.dispatchParent('tab-click', this.getParams())
    },
    handlerClose () {
      this.dispatchParent('tab-close', this.getParams())
    },
    getParams () {
      return { name: this.name, title: this.title, nodeTitle: this }
    }
  }
}
</script>


<template>
  <div class="tab-title-item" :class="{ 'activated': activated }">
    <div class="me-grid-center" @click="handlerTitle">{{name}} - <slot/></div>
    <me-icon class="me-grid-center" v-if="closable === true" @click="handlerClose">icon-cross</me-icon>
  </div>
</template>
<style lang="scss" scoped>
.tab-title-item {
  display: grid;
  grid-template-columns: 1fr 25px;
  grid-template-rows: 1fr;
  cursor: pointer;
}
</style>
<script>
export default {
  name: 'MeTabTitle',
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

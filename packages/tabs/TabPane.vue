
<template>
  <div class="tabs-pane" v-if="rendered" v-show="activated">
    <template v-if="type === 'frame'">
      <iframe :id="name" :name="name" :title="title" :src="src" frameborder="0" width="100%" height="100%"></iframe>
    </template>
    <template v-else><slot/></template>
  </div>
</template>
<script>
import tools from 'me-view/src/script/tools'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTabPane',
  mixins: [ emitter ],
  props: {
    title: String,
    src: String,
    closable: { type: Boolean, default: null },
    name: String,
    type: { type: String, default: 'panel', validator: value => [ 'panel', 'frame' ].includes(value) }
  },
  data () {
    return {
      rendered: false,
      name__: this.name || tools.UUId(),
      activated: false
    }
  },
  watch: {
    activated (value) {
      if (this.rendered === false && value === true) {
        this.rendered = true
      }
    }
  },
  created () {
    this.dispatchParent('tab-pane-add', this.getParams())
  },
  methods: {
    setActivated (value) { this.activated = value },
    setRendered (value) { this.rendered = value },
    getParams () {
      return { name: this.name__, title: this.title, nodePane: this }
    }
  }
}
</script>

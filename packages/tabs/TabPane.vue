
<template>
  <div class="me-tab-pane" v-if="rendered" v-show="activated__">
    <template v-if="type === 'frame'">
      <iframe :id="name" :name="name" :title="title" :src="src" frameborder="0" width="100%" height="100%"></iframe>
    </template>
    <template v-else><slot/></template>
  </div>
</template>
<script>
import Tools from 'me-view/src/script/tools'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'TabPane',
  mixins: [ emitter ],
  props: {
    activated: Boolean,
    title: String,
    src: String,
    closable: { type: Boolean, default: null },
    name: String,
    type: { type: String, default: 'frame', validator: value => [ 'panel', 'frame' ].includes(value) }
  },
  data () {
    return {
      rendered: false,
      name__: this.name || Tools.UUId(),
      activated__: this.activated
    }
  },
  watch: {
    activated (value) {
      this.activated__ = value
    },
    activated__ (value) {
      if (this.rendered === false && value === true) {
        this.rendered = true
      }
    }
  },
  created () {
    this.dispatchParent('tab-pane-add', this.getParams())
  },
  beforeDestroy () {
    this.dispatchParent('tab-pane-remove', this.getParams())
  },
  methods: {
    setActivated (value) { this.activated__ = value },
    setRendered (value) { this.rendered = value },
    getParams () {
      console.debug('tab-pane ----------------------------------------------')
      return { name: this.name__, title: this.title, nodePane: this, closable: this.closable, activated: this.activated__ }
    }
  }
}
</script>

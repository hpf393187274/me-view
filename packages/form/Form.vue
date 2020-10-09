<template>
  <form>
    <slot />
  </form>
</template>
<script>
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'Form',
  mixins: [ emitter ],
  props: {
    rules: { type: Object, default: () => {} },
    labelWidth: String,
    readonly: Boolean
  },
  data () {
    return {
      labelList: []
    }
  },
  created () {
    this.$on('me-form--label-add', label => {
      if (label) {
        label.setLabelWidth(this.labelWidth)
        label.setReadonly(this.readonly)
        this.labelList.push(label)
      }
      return false
    })
    this.$on('me-form--label-remove', label => {
      if (label.prop) this.labelList.splice(this.labelList.indexOf(label), 1)
      return false
    })
    this.listenerUpward([ 'Dialog' ], 'me-dialog--visible-true', () => this.reset())
  },
  methods: {
    reset () {
      for (const label of this.labelList) {
        label.reset()
      }
    },
    initialize (data) {
      for (const label of this.labelList) {
        if (label.prop) {
          label.initialize(Reflect.get(data, label.prop))
        }
      }
    },
    async validate () {
      for (const label of this.labelList) {
        await label.validate()
      }
    }
  }
}
</script>

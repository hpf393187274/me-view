<template>
  <div class="me-editor me-row">
    <textarea :readonly="readonly" :id="id" name="value" v-model="valueInner"></textarea>
  </div>
</template>
<script>
import EditorProps from './editor.props'
export default {
  mixins: [ EditorProps ],
  name: 'EditorText',
  props: {
    value: String,
    readonly: Boolean
  },
  data () {
    return {
      valueInner: this.value,
      editor: null
    }
  },
  watch: {
    value (newValue) {
      if (this.editor && newValue !== this.valueInner) {
        this.valueInner = newValue
        this.editor.html(newValue)
      }
    },
    readonly () {
      if (this.editor) {
        this.editor.readonly(this.readonly)
      }
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    removeEditor () {
      window.KindEditor.remove(`#${this.id}`)
      this.editor = null
    },
    async initEditor () {
      await this.$nextTick()
      this.removeEditor()
      const _this = this
      this.editor = window.KindEditor.create(`#${this.id}`, {
        ...this.$props,
        afterChange () {
          _this.valueInner = this.html()
          _this.$emit('input', _this.valueInner)
        }
      })
      this.editor.readonly(this.readonly)
    }
  }
}
</script>

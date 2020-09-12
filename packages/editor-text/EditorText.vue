<template>
  <div class="me-flex">
    <vue-editor @image-added="handleImageAdded" useCustomImageHandler v-model="valueInner"></vue-editor>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
import { Type, Tools } from 'me-view/src/script/index'
export default {
  name: 'EditorText',
  components: { VueEditor },
  props: {
    value: String,
    disabled: Boolean,
    uploadMethod: Function,
    uploadUrl: {
      type: String, default: '/api/security/file/upload'
    }
  },
  data () {
    return {
      valueInner: this.value
    }
  },
  methods: {
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.valueInner = ''
    },
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const form = new FormData()
      form.append('file', file)
      if (Type.isFunction(this.uploadMethod)) {
        this.uploadMethod(form, Editor, cursorLocation, resetUploader)
      }
      if (Tools.notBlank(this.uploadUrl)) {
        axios.post(this.uploadUrl, form, { headers: { 'Content-Type': 'multipart/form-data;' } }).then(({ data }) => {
          if (data.code === 'SUCCESS') {
            Editor.insertEmbed(cursorLocation, 'image', data.data)
            resetUploader()
          }
        }).catch(error => { console.log(error) })
      }
    }
  },
  watch: {
    value (newValue) { this.valueInner = newValue },
    valueInner (newValue) { this.$emit('input', newValue) }
  }
}
</script>

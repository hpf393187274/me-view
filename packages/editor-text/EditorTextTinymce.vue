<template>
  <div class="me-flex">
    <Editor v-model="valueInner" api-key="no-api-key" :init="init" :disabled="disabled"> </Editor>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import { Type, Tools } from 'me-view/src/script/index'
const plugins = [
  'advlist autolink lists link image charmap print preview anchor',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table paste code help wordcount'
]

const toolbar = `
  undo redo | formatselect | bold italic backcolor |
  alignleft aligncenter alignright alignjustify image |
  bullist numlist outdent indent | removeformat | help
`
export default {
  name: 'EditorText',
  components: { Editor },
  props: {
    value: String,
    disabled: Boolean,
    uploadMethod: Function,
    uploadUrl: String
  },
  data () {
    return {
      init: {
        height: 500,
        plugins,
        toolbar,
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        images_upload_handler: (blobInfo, success, failure) => {
          const form = new FormData()
          form.append('file', blobInfo.blob(), blobInfo.filename())
          if (Type.isFunction(this.uploadMethod)) {
            this.uploadMethod(form, success, failure)
            return
          }
          if (Tools.notBlank(this.uploadUrl)) {
            axios.post(this.uploadUrl, form, { headers: { 'Content-Type': 'multipart/form-data;' } }).then(({ data }) => {
              if (data.code === 'SUCCESS') { success(data.data) }
            }).catch(failure)
            return
          }
          failure('参数 uploadUrl or uploadMethod 必须存在一个')
        }
      },
      valueInner: this.value
    }
  },
  methods: {
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.valueInner = ''
    }
  },
  watch: {
    value (newValue) { this.valueInner = newValue },
    valueInner (newValue) { this.$emit('input', newValue) }
  }
}
</script>

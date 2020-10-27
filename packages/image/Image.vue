<template>
  <div class="me-image">
    <img :src="valueInner" :width="width" :height="height" @click="handlerPreview"/>
    <me-modal
      draggable
      closable-modal
      v-if="preview"
      :z-index="10000"
      @cancel="handlerCancel"
      class-container="image-modal"
      v-model="visible"
    >
      <me-image ref="imageModel" class="me-flex" :value="valueInner" />
      <div class="image-action-container">
        <me-row class="image-action me-center">
          <me-icon @click="handlerScale(true)" title="放大">icon-plus_strong</me-icon>
          <me-icon @click="handlerScale(false)" title="缩小">icon-minus_strong</me-icon>
          <me-icon @click="handlerCancel" title="关闭">icon-cross</me-icon>
        </me-row>
      </div>
    </me-modal>
  </div>
</template>
<script>
import ModelString from 'me-view/src/mixins/model-string'
export default {
  mixins: [ ModelString ],
  name: 'Image-',
  props: {
    preview: Boolean,
    width: String,
    height: String
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handlerPreview () {
      this.visible = true
    },
    handlerCancel () {
      this.visible = false
    },
    handlerScale (scale) {
      const img = this.$refs.imageModel.$el.querySelector('img')
      if (scale === true) {
        img.width *= 1.1
        img.height *= 1.1
      } else {
        img.width /= 1.1
        img.height /= 1.1
      }
    }
  }
}
</script>

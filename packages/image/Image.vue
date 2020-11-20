<template>
  <div class="me-image">
    <img :src="valueInner" @click="visible = true"/>
    <me-dialog
      v-if="preview"
      title="图片预览"
      class-container="image-modal"
      hidden-footer
      v-model="visible"
    >
      <me-image ref="imageModel" class="me-flex" :value="valueInner" />
      <!-- <div class="image-action-container">
        <me-row class="image-action me-center">
          <me-icon v-if="zoom" @click="handlerScale(true)" title="放大">icon-plus_strong</me-icon>
          <me-icon v-if="zoom" @click="handlerScale(false)" title="缩小">icon-minus_strong</me-icon>
          <me-icon @click="visible = false" title="关闭">icon-cross</me-icon>
        </me-row>
      </div> -->
    </me-dialog>
  </div>
</template>
<script>
import ModelString from 'me-view/src/mixins/model-string'
export default {
  mixins: [ ModelString ],
  name: 'Image-',
  props: {
    preview: Boolean,
    zoom: Boolean
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
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

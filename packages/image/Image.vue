<template>
  <div class="me-row me-center me-image" :style="styleImg" @click="handlerPreview">
    <img :src="valueInner" />
    <me-modal
      draggable
      closable-modal
      v-if="preview"
      :z-index="10000"
      @cancel="handlerCancel"
      ref="imageModal"
      class-container="image-modal"
      v-model="visible"
    >
      <me-image :width="modalWidth" :height="modalHeight" ref="imageModel" class="me-flex" :value="valueInner" />
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
import Tools from 'me-view/src/script/tools'
import ModelString from 'me-view/src/mixins/model-string'
export default {
  mixins: [ ModelString ],
  name: 'Image-',
  props: {
    preview: Boolean,
    width: [ String, Number ],
    height: [ String, Number ]
  },
  data () {
    return {
      visible: false,
      modalWidth: undefined,
      modalHeight: undefined
    }
  },
  computed: {
    styleImg () {
      return {
        width: `${Tools.convertToNumber(this.width)}px`,
        height: `${Tools.convertToNumber(this.height)}px`
      }
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
      const img = this.$refs.imageModal.$el.querySelector('div.image-modal')
      const { width, height } = Tools.clientRect(img)
      if (scale === true) {
        this.modalWidth = width * 1.1
        this.modalHeight = height * 1.1
      } else {
        this.modalWidth = width / 1.1
        this.modalHeight = height / 1.1
      }
    }
  }
}
</script>

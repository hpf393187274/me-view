
<template>
  <me-modal background="none" :z-index="100000" :draggable="draggable" :left="left" :modal="false" :top="top" :width="width" v-model="visibility">
    <me-message-item :key="item.uniqueValue" :unique-value="item.uniqueValue" @remove="handlerRemove" v-bind="item" v-for="item in container" />
  </me-modal>
</template>

<script>
import Modal from '../modal/modal.mixin'
import MeMessageItem from './MessageItem'
import Tools from 'me-view/src/script/tools'
import MeModal from '../modal/index'
export default {
  name: 'MeMessage',
  mixins: [ Modal ],
  components: {
    MeModal, MeMessageItem
  },
  props: {
    list: Array,
    draggable: { type: Boolean },
    top: String,
    left: String,
    width: { type: String, default: '300px' }
  },
  data () {
    return {
      container: []
    }
  },
  methods: {
    handlerRemove (key) {
      Tools.arrayRemove(this.container, item => item.uniqueValue === key)
      if (this.container.length === 0) {
        this.visibility = false
        this.$emit('destroy')
      }
    }
  }
}
</script>

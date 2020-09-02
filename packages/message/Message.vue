
<template>
  <me-modal background="none" :z-index="100000" :draggable="draggable" :left="left" :modal="false" :top="top" :width="width" v-model="visibility">
    <message-item :key="item.uniqueValue" :unique-value="item.uniqueValue" @remove="handlerRemove" v-bind="item" v-for="item in container" />
  </me-modal>
</template>

<script>
import Modal from '../modal/modal.mixin'
import MessageItem from './MessageItem'
import Tools from 'me-view/src/script/tools'
export default {
  name: 'Message',
  mixins: [ Modal ],
  components: { [MessageItem.name]: MessageItem },
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
      this.$emit('item-close')
      if (this.container.length === 0) {
        this.visibility = false
        this.$emit('destroy')
      }
    }
  }
}
</script>

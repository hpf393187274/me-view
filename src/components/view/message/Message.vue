
<template>
  <me-modal :draggable="draggable" :left="left" :modal="false" :top="top" :width="width" v-model="value__">
    <me-message-item :key="item.primaryKey" :primary-key="item.primaryKey" @remove="handlerRemove" v-bind="item" v-for="item in container" />
  </me-modal>
</template>

<script>
import Modal from '../modal.mixin'
import MeMessageItem from './MessageItem'
import { tools } from '../../../assets/script/common'
import MeModal from '../modal'
export default {
  mixins: [Modal],
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
  data() {
    return {
      container: []
    }
  },
  methods: {
    handlerRemove(key) {
      tools.arrayRemove(this.container, item => item.primaryKey === key)
        .then(() => {
          if (this.container.length === 0) {
            this.value__ = false
            this.$emit('destroy')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

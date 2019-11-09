
<template>
  <me-modal :left="left" :modal="false" :top="top" :width="width" v-model="value__">
    <me-message-item :key="item.primaryKey" @remove="onRemove" v-bind="item" v-for="item in list" />
  </me-modal>
</template>

<script>
import Modal from '../modal.mixin'
import MessageItem from './MessageItem'
import { tools } from '@assets/script/common'
export default {
  mixins: [Modal],
  components: {
    [MessageItem.name]: MessageItem
  },
  props: {
    list: Array,
    top: String,
    left: String,
    width: { type: String, default: '300px' }
  },
  methods: {
    onRemove(key) {
      tools.arrayRemove(this.list, item => item.primaryKey === key)
        .then(() => {
          if (this.list.length === 0) {
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

<template>
  <div id="app">
    <!-- <div class="me-flex">
      <div class="me-row me-border">
        <me-label label="消息">
          <me-input v-model="message"/>
        </me-label>
        <me-label>
          <me-button @click="send">发送</me-button>
        </me-label>
      </div>
      <me-panel border title="发送的消息">sdfs</me-panel>
      <me-panel border title="收到的消息">
        <div v-for="(message, index) in receiveMessages" :key="index">
          <div class="me-border">{{index + 1}}：{{message.data}}</div>
        </div>
      </me-panel>
    </div> -->
    <router-view />
  </div>
</template>
<script>
import { Socket } from '../../src/index.js'
export default {
  data () {
    return {
      message: '我们都是好孩子',
      dispatchMessages: [],
      receiveMessages: [],
      socket: null
    }
  },
  created () {
    this.socket = new Socket({ host: '127.0.0.1', port: 8080, path: '/handler' })
    this.socket.registerEvent('message-topic-user-collect-menu', data => {
      this.receiveMessages.push(data)
    })
  },
  methods: {
    send () {
      this.socket.publish({ topic: 'topic-user-collect-menu', data: this.message })
    }
  }
}
</script>

<template>
  <div>
    <div>我是页面A</div>
    <div class="me-row">
      <me-label label="消息">
        <me-input v-model="message" />
      </me-label>
      <me-label>
        <me-button @click="handlerMessage">推送消息</me-button>
      </me-label>
    </div>
    <div class="me-border">
      <div v-for = "(message, index) in messageList" :key="index"> {{message}} </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '我是子页面 A',
      messageList: []
    }
  },
  created () {
    top.addEventListener('message', ({ data }) => {
      this.messageList.push(data.message)
    })
  },
  methods: {
    handlerMessage () {
      top.postMessage({ message: this.message }, '*')
    }
  }
}
</script>

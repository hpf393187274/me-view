<template>
  <div class="me-flex">
    <div class="me-row">
      <me-label title="消息">
        <me-input v-model="message" />
      </me-label>
      <me-label>
        <me-button @click="handlerMessage">推送消息</me-button>
      </me-label>
    </div>
    <div class="me-border">
      <div v-for = "(message, index) in messageList" :key="index"> {{message}} </div>
    </div>
    <me-tabs>
      <me-tab-pane type="frame" title="页面A" src="http://demo.hpf.com:8000/page-a" />
      <me-tab-pane type="frame" title="页面B" src="http://demo.hpf.com:8000/page-b" />
    </me-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '我是 Top 级 消息',
      messageList: []
    }
  },
  created () {
    // window.addEventListener('message', ({ data }) => {
    //   this.messageList.push(data.message)
    // })
  },
  methods: {
    handlerMessage () {
      window.postMessage({ message: this.message }, '*')
    }
  }
}
</script>

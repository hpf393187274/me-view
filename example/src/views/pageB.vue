<template>
  <div>
    <div>我是页面B</div>
    <div class="me-border">
      <div v-for = "(message, index) in messageList" :key="index"> {{message}} </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      messageList: []
    }
  },
  created () {
    top.addEventListener('message', ({ data }) => {
      this.messageList.push(data.message)
    })
  },
  methods: {

  }
}
</script>

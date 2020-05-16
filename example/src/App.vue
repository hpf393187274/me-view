<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '我们都是好孩子',
      dispatchMessages: [],
      receiveMessages: [],
      socket: null
    }
  }
}
</script>

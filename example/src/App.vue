<template>
  <div id="app" class="me-row">
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
<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>

<template>
  <div>
    <me-dialog label="dialog" v-model="status">
      <br />ssss
      <br />ssss
      <br />ssss
      <br />ssss
    </me-dialog>
    <me-button @click="status=!status">{{status?'隐藏':'显示'}}</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: false
    }
  }
}
</script>
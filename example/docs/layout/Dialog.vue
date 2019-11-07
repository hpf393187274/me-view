<template>
  <div>
    <h3>Modal</h3>
    <me-modal v-model="statusModal">
      <br />ssss
      <br />ssss
    </me-modal>
    <me-button @click="statusModal=!statusModal">Modal</me-button>
    <h3>Dialog</h3>
    <me-dialog title="dialog" v-model="status">
      <br />ssss
      <br />ssss
    </me-dialog>
    <me-button @click="status=!status">Dialog</me-button>

    <h3>Alert</h3>
    <me-button @click="onAlert1">我们都是好孩子</me-button>
    <h3>Confirm</h3>
    <me-button @click="onAlert2">你叫什么名字</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusModal: false,
      status: false,
    }
  },
  methods: {
    onAlert1() {
      this.$dialog.alert({
        message: '我们都是好孩子',
        render() {
          return "我们都是好孩子22222222"
        }
      })
    },
    onAlert2() {
      this.$dialog.confirm({
        message: '请确认：你叫什么名字',
        ok() {
          this.$dialog.alert({
            message: '点击了确认'
          })
        },
        cancel() {
          this.$dialog.alert({
            message: '点击了取消'
          })
        }
      })
    }
  }
}
</script>
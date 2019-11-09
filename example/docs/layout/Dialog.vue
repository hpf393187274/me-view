<template>
  <div>
    <h3>Modal 有遮罩层</h3>
    <me-modal draggable v-model="statusModalTrue">
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
    </me-modal>
    <me-button @click="statusModalTrue=!statusModalTrue">有遮罩层</me-button>
    <h3>Modal 无遮罩层</h3>
    <me-modal :modal="false" v-model="statusModalFalse"></me-modal>
    <me-button @click="statusModalFalse=!statusModalFalse">无遮罩层</me-button>
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
      statusModalTrue: false,
      statusModalFalse: false,
      status: false,
    }
  },
  methods: {
    onAlert1() {
      this.$dialog.alert({
        content: '我们都是好孩子',
        render(h) {
          return h('div', "我们都是好孩子22222222")
        }
      })
    },
    onAlert2() {
      this.$dialog.confirm({
        content: '请确认：你叫什么名字',
        ok() {
          this.$dialog.alert({
            content: '点击了确认'
          })
        },
        cancel() {
          this.$dialog.alert({
            content: '点击了取消'
          })
        }
      })
    }
  }
}
</script>
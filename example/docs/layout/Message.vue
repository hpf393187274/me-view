<template>
  <div class="me-row">
    <me-button @click="info">info</me-button>
    <me-button @click="success">success</me-button>
    <me-button @click="warning">warning</me-button>
    <me-button @click="error">error</me-button>
    <me-button @click="loading">loading</me-button>
  </div>
</template>
<script>
export default {
  methods: {
    info() {
      this.$message.info({ content: 'info' })
    },
    success() {
      this.$message.success({ content: 'success' })
    },
    warning() {
      this.$message.warning({ content: 'warning' })
    },
    error() {
      this.$message.error({ content: 'error' })
    },
    loading() {
      this.$message.loading({ content: 'loading' })
    },
  }
}
</script>
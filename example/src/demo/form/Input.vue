<template>
  <div>
    <div>
      <pre>{{form}}</pre>
    </div>
    <me-form ref="form">
      <me-label title="姓名" prop="value1">
        <me-input clearable v-model="form.value1" />
      </me-label>
      <me-label><me-button @click="reset">重 置</me-button></me-label>
      <me-label><me-button @click="changeDefault">更新默认值</me-button></me-label>
    </me-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        value1: 12
      }
    }
  },
  watch: {
    'form.value1' (newValue, oldValue) {
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    changeDefault () {
      this.form.value1 = '2'
    }
  }
}
</script>

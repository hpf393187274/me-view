<template>
  <div>
    <div>
      <pre>{{form}}</pre>
    </div>
    <me-form ref="form">
      <me-label title="姓名" prop="value1">
        <me-input clearable v-model="form.value1" />
      </me-label>
      <me-label><me-button @click="handlerEvent">触发事件</me-button></me-label>
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
  created () {
    this.$eventMonitor.register('aaaa', (data) => {
      console.log('---------------------', data)
    })
  },
  watch: {
    'form.value1' (newValue, oldValue) {
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    handlerEvent () {
      this.$eventMonitor.dispatch('aaaa', { date: new Date().getTime() })
    },
    changeDefault () {
      this.form.value1 = '2'
    }
  }
}
</script>

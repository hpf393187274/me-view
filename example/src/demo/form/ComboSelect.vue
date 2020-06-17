<template>
  <div>
    <div>
      <pre>{{form}}</pre>
    </div>
    <me-label title="省份">
      <me-combo-select :data="dataValue1" v-model="form.value1" />
    </me-label>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        value1: undefined
      },
      defaultData: [
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' },
        { label: '四川省', value: '3' },
        { label: '河南省', value: '4' },
        { label: '江苏省', value: '5' }
      ],
      dataValue1: []
    }
  },
  created () {
    this.dataValue1 = [...this.defaultData]
    setTimeout(() => {
      this.form.value1 = '3'
    }, 10 * 1000)
  },
  watch: {
    'form.value1' (newValue, oldValue) {
    }
  }
}
</script>

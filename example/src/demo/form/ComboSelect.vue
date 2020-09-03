<template>
  <div>
    <div>
      <pre>{{form}}</pre>

      <pre>{{defaultData}}</pre>
    </div>
    <me-form ref="form">
      <me-label title="省份" prop="value1">
        <me-combo-select clearable readonly :data="defaultData" v-model="form.value1" />
      </me-label>
    </me-form>
    <me-button-group v-model="type" @click="handlerType">
      <me-button name="2">类型一</me-button>
      <me-button name="4">类型二</me-button>
    </me-button-group>
    <me-button-group v-model="source" @click="handlerSource">
      <me-button name="a">数据一</me-button>
      <me-button name="b">数据二</me-button>
    </me-button-group>
    <me-label><me-button @click="reset">重 置</me-button></me-label>
    <me-label><me-button @click="changeDefault">更新默认值</me-button></me-label>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        value1: '3'
      },
      type: '1',
      source: 'a',
      sourceEnum: {
        a: [
          { label: '山西省', value: '1' },
          { label: '陕西省', value: '2' },
          { label: '四川省', value: '3' }
        ],
        b: [
          { label: '四川省', value: '3' },
          { label: '河南省', value: '4' },
          { label: '江苏省', value: '5' }
        ]
      },
      defaultData: []
    }
  },
  created () {
    setTimeout(() => {
      this.dataValue1 = [...this.defaultData]
    }, 10 * 1000)
  },
  methods: {
    handlerSource () {
      setTimeout(() => {
        this.defaultData = [...this.sourceEnum[this.source]]
      }, 3 * 1000)
    },
    handlerType () {
      setTimeout(() => {
        this.form.value1 = this.type
      }, 3 * 1000)
    },
    reset () {
      this.$refs.form.reset()
    },
    changeDefault () {
      this.form.value1 = '2'
    }
  }
}
</script>


<template>
  <div :class="addClass('row','flex')">
    <me-transfer v-model="target" flex :data="data"/>
    <div style="width:300px;">
      <pre>{{target}}</pre>
    </div>
  </div>
</template>
<script>
import data from '@/demo/data/tree'
export default {
  data() {
    return {
      target: [],
      data
    }
  },
  methods: {
    treeCheckedData() {
      console.log("this.$refs.tree：" + this.$type.isArray(this.$refs.tree))
      this.checkedData = this.$refs.tree.getCheckedData()
    },
  }
}
</script>

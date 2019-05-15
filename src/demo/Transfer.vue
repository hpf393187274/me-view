
<template>
  <div :class="addClass('column','flex')">
    <me-transfer flex :data="data"/>
  </div>
</template>
<script>
import data from '@/demo/data/tree'
export default {
  data() {
    return {
      checkedData: [],
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

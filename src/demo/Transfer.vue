
<template>
  <div :class="addClass('column','flex')">
    <vv-transfer flex :data="data"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedData: [],
      data: [
        {
          id: '1',
          text: 'root-1',
          children: [
            {
              id: '1-1', text: 'root-1-1',
              children: [
                { id: '1-1-1', text: 'root-1-1-1' },
                { id: '1-1-2', text: 'root1-1-1-2' }
              ]
            },
            { id: '1-2', text: 'root1-1-2' }
          ]
        },
        {
          id: '2',
          text: 'root-2',
          children: [
            { id: '2-1', text: 'root-2-1' },
            { id: '2-2', text: 'root-2-2' }
          ]
        }
      ]
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

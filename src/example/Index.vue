<template>
  <div :class="addClass('row','flex')">
    <me-tree :data="data" style="width:300px;" :expandable="false" @click="handleClick"/>
    <div :class="addClass('row','border','flex')" style="overflow: auto;">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: 'Basic 基础',
          children: [

          ]
        },
        {
          label: 'Form 表单'
        },
        {
          label: 'layout 布局',
          children: [
            { label: 'Tree', path: '/layout/tree' },
            { label: 'Transfer', path: '/layout/transfer' }
          ]
        }
      ],
      list: [
        { text: 'Tree', router: '/layout/tree' },
        { text: 'Transfer', router: '/layout/transfer' }
      ]
    }
  },
  methods: {
    handleClick({ path }) {
      this.$router.push(path)
    }
  }
}
</script>
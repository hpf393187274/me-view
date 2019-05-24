
<template>
  <me-tree :data="data"/>
</template>
<script>
import data from './data'
export default {
  name: 'TreeBasic',
  data() {
    return {
      data
    }
  }
}
</script>

<template>
  <div class="container">
    <template v-for="item in data">
      <div class="item" :title="item" :data-clipboard-text="item" :key="item" @click="$copy('.item', { prompt: true})">
        <me-icon>{{item}}</me-icon>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'DemoIconList',
  props: {
    data: {
      type: Array, default () { return [] }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 10px;
  .item {
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #4c84ff;
    .me-icon {
      font-size: 40px !important;
      // color: red;
    }
  }
}
</style>

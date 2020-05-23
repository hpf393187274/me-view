<template>
  <div class="container">
    <template v-for="item in data">
      <div class="item" :title="item" :data-clipboard-text="item" :key="item" @click="$copy('.item')">
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
    border: 1px solid #0099ff;
    .me-icon {
      font-size: 40px !important;
    }
    // .title {
    //   /* width: 80%; */
    //   margin-bottom: 10px;
    //   overflow: hidden; /*自动隐藏文字*/
    //   text-overflow: ellipsis !important;/*文字隐藏后添加省略号*/
    //   white-space: nowrap;/*强制不换行*/
    // }
  }
}
</style>

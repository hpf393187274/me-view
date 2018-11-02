<!--
  
-->
<template>
  <div class="table">
    <div class="table-button">
      <slot name="button" />
      <div style="flex:1;"></div>
    </div>
    <div class="table-header">
      <slot name="header" />
    </div>
    <div class="table-body">
      <div 
        class="table-body-row"
        v-for="item in dataList"
        :key="item.id">
        <slot 
          name="body"
          :data="item">请编写模板</slot>
      </div>
    </div>
    <div class="table-page"><slot name="page" /></div>
  </div>
</template>
<script>
// import { PREFIX } from '../../config.js'
export default {
  name: `hpf-table`,
  props: {
    dataList: {
      type: Array, default() { return [] }
    }
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    
  }
}
</script>
<style>
.table {
  width: 100%;
  display: flex;
  flex-direction:column;
}
.table .table-button {
  display: flex;
  min-height: 50px;
  justify-content:space-around;
  padding: 5px 10px;
}

.table .table-header {
  display: flex;
  min-height: 50px;
}
.table .table-header > div {
  flex: 1;
  justify-content:center;
  align-items:center;
  display: flex;
  border: 1px solid green;
}
.table .table-body {
  display: flex;
  flex-direction:column;
  max-height: 300px;
  overflow-y:scroll;
}

.table .table-body .table-body-row {
  display: flex;
  min-height: 50px;
}

.table .table-body .table-body-row > div {
  flex: 1;
  justify-content:center;
  align-items:center;
  display: flex;
  border: 1px solid green;
}
</style>

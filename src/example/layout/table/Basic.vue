
<template>
  <me-panel flex label="Basic 用法">
    <me-table style="width:400px;" :data="data">
      <me-table-column label="编号" field="id"/>
      <me-table-column label="区域名称" field="label"/>
    </me-table>
    <div class="me-row">
      <textarea disabled class="me-flex">
      <template >
        <me-table style="width:400px;" :data="data"/>
      </template>
      </textarea>
      <div class="me-flex">
        <pre>
         export default {
           data(){
             return {
               data: [
                { id: '1', label: '陕西省' },
                { id: '2', label: '四川省' }
              ]
             }
           }
         }
      </pre>
      </div>
    </div>
  </me-panel>
</template>
<script>
export default {
  name: 'MeTableBasic',
  data() {
    return {
      data: [
        { id: '1', label: '陕西省' },
        { id: '2', label: '四川省' }
      ]
    }
  }
}
</script>

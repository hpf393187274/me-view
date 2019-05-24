
<template>
  <me-panel flex label="Basic 用法">
    <me-table :data="data">
      <me-table-column label="编号" field="id"/>
      <me-table-column label="a" field="a"/>
      <me-table-column label="b" field="b"/>
      <me-table-column label="c" field="c"/>
      <me-table-column label="d" field="d"/>
      <me-table-column label="e" field="e"/>
      <me-table-column label="f" field="f"/>
      <me-table-column label="g" field="g"/>
      <me-table-column label="h" field="h"/>
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
                { id: '1', label: '陕西省',a:'a',b:'b',c:'c' },
                { id: '2', label: '四川省' },
                { id: '3', label: '河南省' }
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
        { id: '1', label: '陕西省', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h' },
        { id: '2', label: '四川省', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h' },
        { id: '3', label: '河南省', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h' }
      ]
    }
  }
}
</script>

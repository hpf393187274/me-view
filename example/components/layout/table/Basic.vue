
<template>
  <me-panel flex label="Basic 用法">
    <me-table :data="data">
      <me-table-column field="id" label="编号"/>
      <me-table-column field="a" label="a"/>
      <me-table-column field="b" label="b"/>
      <me-table-column field="c" label="c"/>
      <me-table-column field="d" label="d"/>
      <me-table-column field="e" label="e"/>
      <me-table-column field="f" label="f"/>
      <me-table-column field="g" label="g"/>
      <me-table-column field="h" label="h"/>
    </me-table>
    <div class="me-row">
      <textarea class="me-flex" disabled>
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

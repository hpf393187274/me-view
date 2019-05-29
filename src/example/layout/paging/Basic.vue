
<template>
  <me-panel flex label="Basic 用法" layout="row">
    <me-paging :total="1000" style="width:400px;"/>
    <textarea class="me-flex" disabled>
    <template >
      <me-tree :data="data"/>
    </template>
    </textarea>
    <div class="me-flex">
      <pre>
         export default {
           data(){
             return {
               data: [
                {
                  id: '1', label: '陕西省', children: [
                    {
                      id: '1-1', label: '西安市', children: [
                        { id: '1-1-1', label: '雁塔区' },
                        { id: '1-1-2', label: '长安区' }
                      ]
                    }
                  ]
                },
                {
                  id: '2', label: '四川省', children: [
                    { id: '2-1', label: '成都市' },
                    { id: '2-2', label: '汶川市' }
                  ]
                }
              ]
             }
           }
         }
      </pre>
    </div>
  </me-panel>
</template>
<script>
export default {
  name: 'MePagingBasic',
  data() {
    return {

    }
  }
}
</script>


<template>
  <me-panel flex lable="全部 用法" layout="row" border>
    <me-tree style="width:400px;" :data="data" checkbox expanded statistics action/>
    <textarea disabled class="me-flex">
    <template>
      <me-tree :data="data" checkbox statistics action />
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
import data from './data'
export default {
  name: 'TreeAll',
  data() {
    return {
      data
    }
  }
}
</script>

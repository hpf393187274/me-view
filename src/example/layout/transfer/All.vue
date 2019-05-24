
<template>
  <me-panel flex lable="Basic 用法" layout="row">
    <me-transfer style="width:600px;" :data="data" statistics expanded/>
    <textarea disabled class="me-flex">
    <template >
      <me-transfer flex :data="data" statistics/>
    </template>
    </textarea>
    <div class="me-flex">
      <pre>
         export default {
           data() {
             return {
               data:  [
                { id: '1', label: '陕西省' },
                { id: '2', label: '四川省' },
                { id: '3', label: '江苏省' },
                { id: '4', label: '浙江省' },
                { id: '5', label: '山西省' },
                { id: '6', label: '河南省' }
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
  name: 'TransferAll',
  data() {
    return {
      data: [
        {
          id: '1', label: '陕西省', children: [
            { id: '1-1', label: '西安市' }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '郑州市' }
          ]
        },
        {
          id: '3', label: '江苏省', children: [
            { id: '3-1', label: '常州市' }
          ]
        }
      ]
    }
  }
}
</script>

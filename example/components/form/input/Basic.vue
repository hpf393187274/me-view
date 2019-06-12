
<template>
  <me-panel flex label="Basic 用法" layout="row">
    <me-input label="用户名" placeholder="请输入姓名" v-model="value"/>
    <pre v-pre>
      <code>
        <me-input label="用户名" placeholder="请输入姓名" v-model="value"/>
      </code>
    </pre>

    <div class="me-flex">
      <pre>
         export default {
           data(){
             return { }
           }
         }
      </pre>
    </div>
  </me-panel>
</template>
<script>
export default {
  name: 'MeInputBasic',
  data() {
    return {
      value: ''
    }
  }
}
</script>

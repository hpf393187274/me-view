
<template>
  <me-panel flex label="Validator 用法" layout="row">
    <me-input clearable label="用户名" placeholder="请输入姓名" required style="flex:1;" v-model="value"/>
    <textarea class="me-flex" disabled>
    <template >
      <me-input />
    </template>
    </textarea>
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
  name: 'MeInputValidator',
  data() {
    return {
      value: ''
    }
  }
}
</script>

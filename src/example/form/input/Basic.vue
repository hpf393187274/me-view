
<template>
  <me-panel flex label="Basic 用法" layout="row">
    <me-input style="flex:auto;"/>
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
  name: 'MeInputBasic'
}
</script>

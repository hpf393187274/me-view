
<template>
  <me-panel flex label="Basic 用法">
    <me-paging :total="500"/>
    <div class="me-row">
      <textarea class="me-flex" disabled>
    <template >
      <me-paging :total="500"/>
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
    </div>
  </me-panel>
</template>
<script>
export default {
  name: 'MePagingBasic'
}
</script>

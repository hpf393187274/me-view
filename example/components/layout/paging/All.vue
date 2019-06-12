
<template>
  <me-panel flex label="All 用法">
    <me-paging :total="1000" border/>
    <div class="me-row">
      <textarea class="me-flex" disabled>
    <template >
     <me-paging :total="1000" border/>
    </template>
    </textarea>
      <div class="me-flex">
        <pre>
         export default {
           data(){
             return {}
           }
         }
      </pre>
      </div>
    </div>
  </me-panel>
</template>
<script>
export default {
  name: 'MePagingAll'
}
</script>

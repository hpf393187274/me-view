<template>
  <div class="table-header">
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <slot />
      </thead>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TableHeader'
}
</script>

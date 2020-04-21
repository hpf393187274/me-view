# LineH 水平线

## 水平线

::: demo 
```html
<template>
<div class="me-column me-margin-child-10" style="height:200px;">
  <me-line-h v-for = "index in 8" :key="index"/>
</div>
</template>
<script>
export default {
  data() {
    return { }
  }
}
</script>
```
:::


## 垂直线

::: demo 
```html
<template>
<div class="me-row me-margin-child-10" style="height:200px;">
  <me-line-v v-for = "index in 8" :key="index"/>
</div>
</template>
<script>
export default {
  data() {
    return { }
  }
}
</script>
```
:::
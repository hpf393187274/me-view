# Icon 图标库
<style lang="less">
.item {
  margin: 5px;
  height: 100px;
  width: 150px;
  cursor: pointer;
  border: 1px solid #0099ff;
  justify-content: center !important;
	align-items: center !important;
  .me-icon {
    font-size: 30px !important;
  }
  .title {  
    width: 80%;
    margin-bottom: 10px;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis !important;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
  }
}
</style>

## 字体图标


### 状态类图标
::: demo 
```html
<template>
<div class="me-row me-wrap">
  <div v-for="item in list" class="me-column item" :data-clipboard-text="item" :key="item" @click="$copy('.item')">
    <div class="me-flex me-row me-center icon"><me-icon>{{item}}</me-icon></div>
    <div class="me-row me-center title" :title="item">{{item}}</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        'icon-success', 'icon-warning','icon-info','icon-loading', 'icon-error'
      ]
    }
  }
}
</script>
```
:::

### 操作类图标
::: demo 
```html
<template>
<div class="me-row me-wrap">
  <div v-for="item in list" class="me-column item" :data-clipboard-text="item" :key="item" @click="$copy('.item')">
    <div class="me-flex me-row me-center icon"><me-icon>{{item}}</me-icon></div>
    <div class="me-row me-center title" :title="item">{{item}}</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        'icon-plus-square','icon-minus-square','icon-delete', 'icon-cross',
        'icon-search', 'icon-plus_strong', 'icon-minus_strong', 'icon-download',
        'icon-upload', 'icon-plus', 'icon-link', 'icon-exchange', 'icon-addperson'
      ]
    }
  }
}
</script>
```
:::


### 箭头图标
::: demo 
```html
<template>
<div class="me-row me-wrap">
  <div v-for="item in list" class="me-column item" :data-clipboard-text="item" :key="item" @click="$copy('.item')">
    <div class="me-flex me-row me-center icon"><me-icon>{{item}}</me-icon></div>
    <div class="title" :title="item">{{item}}</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        'icon-angle_up','icon-angle_down','icon-angle_right', 'icon-angle_left',
        'icon-angle_strong_up','icon-angle_strong_down','icon-angle_strong_right', 'icon-angle_strong_left',
        'icon-angles_right', 'icon-angles_left', 'icon-more', 
        'icon-angles_strong_left', 'icon-angles_strong_right', 'icon-angles_strong_up', 'icon-angles_strong_down', 'icon-triangle_fill_left', 'icon-triangle_fill_right','icon-triangle_fill_up','icon-triangle_fill_down'
      ]
    }
  }
}
</script>
```
:::


### 其他图标
::: demo 
```html
<template>
<div class="me-row me-wrap">
  <div v-for="item in list" class="me-column item" :data-clipboard-text="item" :key="item" @click="$copy('.item')">
    <div class="me-flex me-row me-center icon"><me-icon>{{item}}</me-icon></div>
    <div class="me-row me-center title" :title="item">{{item}}</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        'icon-user','icon-shezhi','icon-outdent', 'icon-indent',
        'icon-list','icon-icon_phone','icon-horn', 'icon-file',
        'icon-addperson'
      ]
    }
  }
}
</script>
```
:::

# Icon 图标库
## 字体图标

### 状态类图标
::: demo 
```html
<template>
  <demo-icon-list :data="list"></demo-icon-list>
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
  <demo-icon-list :data="list"/>
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
<demo-icon-list :data="list"/>
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
<demo-icon-list :data="list"/>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        'icon-user','icon-shezhi','icon-outdent', 'icon-indent',
        'icon-list','icon-icon_phone','icon-horn', 'icon-file',
        'icon-addperson', 'icon-zhongduan', 'icon-APPduanwebfuwuqi',
        'icon-tuoputu_fanghuoqiang', 'icon-zhongduan1'
      ]
    }
  }
}
</script>
```
:::

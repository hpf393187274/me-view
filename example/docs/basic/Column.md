# Column 列布局

## border
::: demo 
```html
<template>
<me-column class="me-warp" style="height:300px;">
  <div 
    class="me-row me-center" 
    :style="styles(item)" 
    v-for="(item,index) in list" :key="index">
    {{item}}
  </div>
</me-column>
</template>
<script>
export default {
  data() {
    return { 
      list: ['#FF0000 ','#FF7F00','#FFFF00','#00FF00','#00FFFF','#0000FF','#8B00FF']
    }
  },
  methods: {
    styles(item){
      return {
        border: `5px solid ${item}`, color: item, margin: '5px'
      }
    }
  }
}
</script>
```
:::


## backgroundColor
::: demo 
```html
<template>
<me-column>
  <div 
    class="me-row me-flex me-center" 
    :style="styles(item)" 
    v-for="(item,index) in list" :key="index">
    {{item}}
  </div>
</me-column>
</template>
<script>
export default {
  data() {
    return { 
      list: ['#FF0000 ','#FF7F00','#FFFF00','#00FF00','#00FFFF','#0000FF','#8B00FF']
    }
  },
  methods: {
    styles(item){
      return {
        'background-color': item, color: '#FFFFFF', margin: '5px'
      }
    }
  }
}
</script>
```
:::

## 布局类型(Flex)

| 名称            | 描述               |
| --------------- | ------------------ |
| me-row          | 行布局             |
| me-column       | 列布局             |
| me-center       | 行列居中           |
| me-main-center  | 主轴居中           |
| me-main-start   | 主轴左对齐         |
| me-main-end     | 主轴右对齐         |
| me-cross-center | 交叉轴居中         |
| me-cross-start  | 交叉轴左对齐       |
| me-cross-end    | 交叉轴右对齐       |
| me-wrap         | 空间不足，自动换行 |
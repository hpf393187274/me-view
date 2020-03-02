# Link 连接

## 导航网站
::: demo 
```html
<template>
<div class="me-row">
  <template v-for="(item,index) in list" >
    <me-link :key="index" :url="item.url" :target="item.target">{{item.text}}</me-link>
  </template>
</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        { text: '百度', target: '_blank', url: 'https://www.baidu.com' },
        { text: '163', target: '_blank', url: 'https://www.163.com' }
      ]
    }
  }
}
</script>
```
:::


## 学习网站
::: demo 
```html
<template>
<div class="me-row">
  <template v-for="(item,index) in list" >
    <me-link :key="index" :url="item.url" :target="item.target">{{item.text}}</me-link>
  </template>
</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [
        { text: 'Iconfont', target: '_blank', url: 'https://www.iconfont.cn' },
        { text: 'github', target: '_blank', url: 'https://github.com' }
      ]
    }
  }
}
</script>
```
:::

### Link Attributes
| 名称   | 描述             |  类型   | 默认值  | 可选值                       |
| ------ | ---------------- | :-----: | :-----: | ---------------------------- |
| url    | 网址             | String  |    -    | -                            |
| target | 打开目标         | Boolean | _blank  | _blank, _parent, _self, _top |
| plain  | 普通的           | Boolean |  false  | true、false                  |
| icon   | 图标库：按钮图标 | String  |    -    | 图标库                       |
| shape  | 形状             | String  | default | default、circle、round       |

### Link Events
| 名称  | 描述     | 参数  |
| ----- | -------- | :---: |
| click | 点击事件 |   -   |

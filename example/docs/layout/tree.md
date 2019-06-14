
# Tree 树形控件

## 基础用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-tree :data="data"/>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: '1', label: '陕西省', children: [
            {
              id: '1-1', label: '西安市', children: [
                { id: '1-1-1', label: '雁塔区' },
                { id: '1-1-2', label: '长安区' }
              ]
            }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '成都市' },
            { id: '2-2', label: '汶川市' }
          ]
        }
      ]
    }
  }
}
</script>
```
:::

## Checkbox 用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-tree :data="data" checkbox />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: '1', label: '陕西省', children: [
            {
              id: '1-1', label: '西安市', children: [
                { id: '1-1-1', label: '雁塔区' },
                { id: '1-1-2', label: '长安区' }
              ]
            }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '成都市' },
            { id: '2-2', label: '汶川市' }
          ]
        }
      ]
    }
  }
}
</script>
```
:::


## 全部用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-tree :data="data" action checkbox expanded statistics />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: '1', label: '陕西省', children: [
            {
              id: '1-1', label: '西安市', children: [
                { id: '1-1-1', label: '雁塔区' },
                { id: '1-1-2', label: '长安区' }
              ]
            }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '成都市' },
            { id: '2-2', label: '汶川市' }
          ]
        }
      ]
    }
  }
}
</script>
```
:::

## Tree Attributes
sss
## Tree Methods

| 方法名            | 描述           | 参数 | 返回值 |
| ----------------- | -------------- | ---- | ------ |
| removeCheckedNode | 移除选中的节点 | -    | -      |
| clearCheckedNode  | 清除选中的节点 | -    | -      |
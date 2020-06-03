
# Transfer 穿梭框

## 基础用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <div>
    <div>{{value}}</div>
    <me-transfer style="height:200px" :data="data" v-model="value">
      <template #header-left>
        我们都是好孩子
      </template>
      <template #header-right>
        我们都是好孩子11
      </template>
    </me-transfer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        { id: '1', label: '陕西省' },
        { id: '2', label: '四川省' },
        { id: '3', label: '江苏省' },
        { id: '4', label: '浙江省' },
        { id: '5', label: '山西省' },
        { id: '6', label: '河南省' }
      ],
      value: []
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
  <div>
    <div>{{value}}</div>
  <me-transfer :data="data" expanded statistics v-model="value"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      data: [
        {
          id: '1', label: '陕西省', children: [
            { 
              id: '1-1', label: '西安市', children : [
                 { id: '1-1-1', label: '雁塔区' },
                 { id: '1-1-2', label: '长安区' }
              ]
            },
            { id: '1-2', label: '咸阳市' }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '郑州市' }
          ]
        },
        {
          id: '3', label: '江苏省', children: [
            { id: '3-1', label: '常州市' }
          ]
        }
      ]
    }
  }
}
</script>
```
:::
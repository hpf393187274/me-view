
# ComboSelect 组合框

## 基础用法
::: demo `data` 数据 `clearable` 可清除的
```html

<me-column>
  <me-combo-select :data="data"></me-combo-select>
</me-column>
<script>
export default {
  data() {
    return {
      data: [
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' },
        { label: '四川省', value: '3' }
      ]
    }
  }
}
</script>
```
:::

## 图标显示


## Input Attributes
| 名称        | 描述                |  类型   | 默认值 | 可选值                 |
| ----------- | ------------------- | :-----: | :----: | ---------------------- |
| type        | 文本内心            | String  |  text  | text, password, number |
| label       | 标签描述            | String  |   -    | -                      |
| clearable   | 可清除的            | Boolean | false  | true, false            |
| placeholder | 原生属性 - 提示表述 | String  |   -    | -                      |
| icon-prefix | 图标库 - 前置图标   | String  |   -    | -                      |
| icon-suffix | 图标库 - 后置图标   | String  |   -    | -                      |

## Input Events
| 名称         | 描述                           |    参数    |
| ------------ | ------------------------------ | :--------: |
| change       | 内容改变事件                   | 当前文本值 |
| click-prefix | icon-prefix 有值：前置图标事件 | 当前文本值 |
| click-suffix | icon-suffix 有值：后置图标事件 | 当前文本值 |


## Input Slot
| 名称   | 描述     |
| ------ | -------- |
| prefix | 前置图标 |
| suffix | 前置图标 |
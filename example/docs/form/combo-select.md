
# ComboSelect 组合框

## 基础用法
::: demo `data` 数据 `clearable` 可清除的 `readonly` 只读的 `disabled` 禁用的
```html

<div class="me-column">
  <me-combo-select :data="data"  v-model="modelA"></me-combo-select>
  <me-combo-select :data="data" readonly multiple v-model="modelB"></me-combo-select>
</div>
<script>
export default {
  data() {
    return {
      modelA:'1',
      modelB:['河南省','2','3'],
      form: {
        provinces: ['1'],
        province:''
      },
      data: [
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' },
        { label: '四川省', value: '3' },
        { label: '河南省', value: '4' },
        { label: '江苏省', value: '5' }
      ]
    }
  }
}
</script>
```
:::


## ComboSelect Attributes
| 名称        | 描述                    |  类型   | 默认值 | 可选值      |
| ----------- | ----------------------- | :-----: | :----: | ----------- |
| data        | 数据                    |  Array  |   []   | [{}]        |
| disabled    | 禁用状态                | Boolean | false  | true, false |
| readonly    | 只读状态                | Boolean | false  | true, false |
| clearable   | 可清除的                | Boolean | false  | true, false |
| placeholder | 原生属性 - 提示表述     | String  |   -    | -           |
| multiple    | 只读状态                | Boolean | false  | true, false |
| checkbox    | multiple = true，复选框 | Boolean | false  | true, false |

## ComboSelect Events
| 名称                | 描述            |    参数    |
| ------------------- | --------------- | :--------: |
| click-option        | 点击选项        | row, index |
| click-option-before | 点击选项 `之前` | row, index |
| click-option-after  | 点击选项 `之后` | row, index |

## ComboSelect Slot
| 名称   | 描述       |
| ------ | ---------- |
| option | 选项自定义 |
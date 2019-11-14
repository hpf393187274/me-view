
# ComboTable 组合框


## Slot 用法
::: demo `multiple` 多选的 `checkbox`
```html

<me-column>
  <me-combo-table :data="data" v-model="modelA" field-value="value" :columns="columns" field-label="label"> </me-combo-table>
  <me-combo-table :data="data" multiple v-model="modelB" field-value="value" :columns="columns" field-label="label"> </me-combo-table>
  <me-combo-table :data="data" multiple disabled field-value="value" :columns="columns" field-label="label" v-model="modelC" > </me-combo-table>
</me-column>
<script>
export default {
  data() {
    return {
      modelA:'2',
      modelB:['4','6'],
      modelC:['4','6'],
      columns: [
        { label:'编号', field: 'value'},
        { label:'区域', field: 'label' }
      ],
      data: [
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' },
        { label: '四川省', value: '3' },
        { label: '河南省', value: '4' },
        { label: '江苏省', value: '5' },
        { label: '山东省', value: '6' },
        { label: '河北省', value: '7' },
        { label: '浙江省', value: '8' },
        { label: '湖北省', value: '9' },
        { label: '湖南省', value: '10' },
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
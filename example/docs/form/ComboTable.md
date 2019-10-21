
# ComboTable 组合框

## 基础用法
::: demo `data` 数据 `clearable` 可清除的 `readonly` 只读的 `disabled` 禁用的
```html

<me-column>
  <me-combo-table :data="data1"></me-combo-table>
  <me-combo-table :data="data1" border></me-combo-table>
</me-column>
<script>
export default {
  data() {
    return {
      data1: [
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

## 多选用法
::: demo `multiple` 多选的 `checkbox`
```html
<me-column>
  <me-combo-table border :data="data2" multiple value="陕西省"></me-combo-table>
  <me-combo-table :data="data2" multiple border value="河南省"></me-combo-table>
  <me-combo-table :data="data2" multiple :value="['陕西省', '四川省']"></me-combo-table>
  <me-combo-table :data="data2" multiple disabled :value="[{ label: '山西省', value: '1' }, { label: '陕西省', value: '2' }]"></me-combo-table>
</me-column>

<script>
export default {
  data() {
    return {
      data2: [
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' }
      ]
    }
  }
}
</script>
```
:::


## Slot 用法
::: demo `multiple` 多选的 `checkbox`
```html

<me-column>
  <me-combo-table :data="data3" multiple value="陕西省" field-value="id" field-label="title">
    <me-table-column field="id" label="主键"></me-table-column>
    <me-table-column field="title" label="标题"></me-table-column>
  </me-combo-table>
  <me-combo-table :data="data3" multiple border value="河南省" field-value="id" field-label="title">
    <me-table-column field="id" label="主键"></me-table-column>
    <me-table-column field="title" label="标题"></me-table-column>
  </me-combo-table>
  <me-combo-table :data="data3" multiple disabled field-value="id" field-label="title" :value="['陕西省', '四川省']" >
    <me-table-column field="id" label="主键"></me-table-column>
    <me-table-column field="title" label="标题"></me-table-column>
  </me-combo-table>
  <me-combo-table :data="data3" field-value="id" field-label="title"
    :value="[{ title: '山西省', id: '1' }, { title: '陕西省', id: '2' }]">
    <me-table-column field="id" label="主键"></me-table-column>
    <me-table-column field="title" label="标题"></me-table-column>
  </me-combo-table>
</me-column>

<script>
export default {
  data() {
    return {
      data3: [
        { title: '山西省', id: '1' },
        { title: '陕西省', id: '2' },
        { title: '四川省', id: '3' },
        { title: '河南省', id: '4' },
        { title: '江苏省', id: '5' }
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
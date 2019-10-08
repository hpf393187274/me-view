
## Input 输入框

### 基础用法
::: demo `label` 设置标签 `clearable` 可清除的
```html

<div class="me-column">
  <div class="me-row">
    <me-form-item flex label="姓名">
      <me-input clearable placeholder="请输入姓名"></me-input>
    </me-form-item>
    <me-form-item flex label="年龄">
      <me-input clearable placeholder="请输入年龄"></me-input>
    </me-form-item>
  </div>
  <div class="me-row">
    <me-form-item flex label="性别">
      <me-combo-select readonly :data="sexList" clearable placeholder="请选择性别">
        <me-combo-option>男</me-combo-option>
        <me-combo-option>女</me-combo-option>
      </me-combo-select>
    </me-form-item>
    <me-form-item flex label="省份">
      <me-combo-table readonly :data="provinceList" field-value="id" field-label="title">
        <me-table-column field="id" label="主键"></me-table-column>
        <me-table-column field="title" label="标题"></me-table-column>
      </me-combo-table>
    </me-form-item>
    <me-form-item flex label="行政区域">
      <me-combo-tree readonly :data="regionList" :expanded-level="1"></me-combo-tree>
    </me-form-item>
  </div>
</div>
<script>
export default {
  data() {
    return {
      sexList:[ { label: '男', value: '1' },{ label: '女', value: '0' }],
      provinceList:[
        { title: '山西省', id: '1' },
        { title: '陕西省', id: '2' },
        { title: '四川省', id: '3' },
        { title: '河南省', id: '4' },
        { title: '江苏省', id: '5' }
      ],
      regionList:[
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

### 图标显示

#### 普通模式

::: demo `icon-prefix` 前置图标 `icon-suffix` 后置图标
```html

<me-input style="width:500px;" icon-prefix="icon-user" clearable icon-suffix="icon-sousuo" placeholder="请输入姓名"></me-input>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
```
:::

#### Solt 模式

::: demo `label` 设置标签 `clearable` 可清除的
```html

<me-input style="width:500px;" icon-prefix="icon-user" icon-suffix="icon-sousuo" placeholder="请输入姓名"></me-input>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
```
:::

### Input Attributes
| 名称        | 描述                |  类型   | 默认值 | 可选值                 |
| ----------- | ------------------- | :-----: | :----: | ---------------------- |
| type        | 文本内心            | String  |  text  | text, password, number |
| label       | 标签描述            | String  |   -    | -                      |
| clearable   | 可清除的            | Boolean | false  | true, false            |
| placeholder | 原生属性 - 提示表述 | String  |   -    | -                      |
| icon-prefix | 图标库 - 前置图标   | String  |   -    | -                      |
| icon-suffix | 图标库 - 后置图标   | String  |   -    | -                      |

### Input Events
| 名称          | 描述         |    参数    |
| ------------- | ------------ | :--------: |
| change        | 内容改变事件 | 当前文本值 |
| handle-prefix | 前置图标事件 | 当前文本值 |
| handle-suffix | 后置图标事件 | 当前文本值 |


### Input Slot
| 名称   | 描述     |
| ------ | -------- |
| prefix | 前置图标 |
| suffix | 前置图标 |
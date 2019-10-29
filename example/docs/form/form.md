
## Form 表单

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
        <me-table-cell field="id" label="主键"></me-table-cell>
        <me-table-cell field="title" label="标题"></me-table-cell>
      </me-combo-table>
    </me-form-item>
  </div>
  <div class="me-row">
    <me-form-item flex label="省份">
      <me-combo-table readonly :data="provinceList" field-value="id" field-label="title">
        <me-table-cell field="id" label="主键"></me-table-cell>
        <me-table-cell field="title" label="标题"></me-table-cell>
      </me-combo-table>
    </me-form-item>
    <me-form-item flex label="省份">
      <me-combo-table readonly :data="provinceList" field-value="id" field-label="title">
        <me-table-cell field="id" label="主键"></me-table-cell>
        <me-table-cell field="title" label="标题"></me-table-cell>
      </me-combo-table>
    </me-form-item>
  </div>
  <div class="me-row">
    <me-form-item flex label="行政区域1">
      <me-combo-tree readonly :data="regionList" :expanded-level="1" field-value="id">
        <template #node-label="{data}">{{data.title}}</template>
      </me-combo-tree>
    </me-form-item>
    <me-form-item flex label="行政区域">
      <me-combo-tree readonly :data="regionList" :expanded-level="1" field-value="id"></me-combo-tree>
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
          id: '1', label: '陕西省', title:'陕西', children: [
            {
              id: '1-1', label: '西安市', title: '西安', children: [
                { id: '1-1-1', label: '雁塔区', title: '雁塔' },
                { id: '1-1-2', label: '长安区', title: '长安' }
              ]
            }
          ]
        },
        {
          id: '2', label: '四川省',title:'四川', children: [
            { id: '2-1', label: '成都市', title: '成都' },
            { id: '2-2', label: '汶川市', title: '汶川' }
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


::: demo `icon-prefix` 前置图标 `icon-suffix` 后置图标
```html

<div class="me-row">
  <me-input icon-prefix="icon-user" clearable  placeholder="请输入姓名"></me-input>
  <me-line-v></me-line-v>
  <me-input clearable icon-suffix="icon-sousuo" placeholder="请输入姓名"></me-input>
</div>
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


### Form Attributes
| 名称 | 描述 | 类型  | 默认值 | 可选值 |
| ---- | ---- | :---: | :----: | ------ |

### Form Events
| 名称 | 描述 | 参数  |
| ---- | ---- | :---: |

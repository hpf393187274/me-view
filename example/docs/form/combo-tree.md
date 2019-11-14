
# ComboTree 组合树

## 基础用法
::: demo `label` 设置标签 `clearable` 可清除的
```html

<me-column>
  <me-combo-tree readonly :data="regionList" :expanded-level="1" field-value="id">
    <template #node-label="{data}">{{data.title}}--{{data.id}}</template>
  </me-combo-tree>
  <me-combo-tree readonly :data="regionList" :expanded-level="1" field-value="id">
   
  </me-combo-tree>
  <me-combo-tree readonly :data="regionList" :expanded-level="1" field-value="id">
   
  </me-combo-tree>
</me-column>
<script>
export default {
  data() {
    return {
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
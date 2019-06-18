
# Button 按钮

### 基础用法
::: demo `label` 设置标签 `clearable` 可清除的
```html

<me-row>
  <me-button type="default">default</me-button>
  <me-button type="primary">primary</me-button>
  <me-button type="dashed">dashed</me-button>
  <me-button type="text">text</me-button>
  <me-button type="info">info</me-button>
  <me-button type="success">success</me-button>
  <me-button type="warning">warning</me-button>
  <me-button type="error">error</me-button>
</me-row>

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

### 幽灵按钮

::: demo `ghost` 幽灵按钮
```html

<me-row>
  <me-button ghost type="default">default</me-button>
  <me-button ghost type="primary">primary</me-button>
  <me-button ghost type="dashed">dashed</me-button>
  <me-button ghost type="text">text</me-button>
  <me-button ghost type="info">info</me-button>
  <me-button ghost type="success">primary</me-button>
  <me-button ghost type="warning">warning</me-button>
  <me-button ghost type="error">error</me-button>
</me-row>

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
| 名称  | 描述                     |  类型   | 默认值  | 可选值                                                        |
| ----- | ------------------------ | :-----: | :-----: | ------------------------------------------------------------- |
| type  | 按钮类型                 | String  | default | default、primary、dashed、text、info、success、warning、error |
| ghost | 幽灵属性，使按钮背景透明 | Boolean |  false  | true、false                                                   |

### Input Events
| 名称  | 描述     | 参数  |
| ----- | -------- | :---: |
| click | 点击事件 |   -   |


### Input Slot
| 名称   | 描述     |
| ------ | -------- |
| prefix | 前置图标 |
| suffix | 前置图标 |

# Input 输入框

## 基础用法
::: demo `label` 设置标签 `clearable` 可清除的
```html

<me-input class="me-flex" label="用户名" clearable placeholder="请输入姓名"></me-input>

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

## 图标显示

### 普通模式

::: demo `icon-prefix` 前置图标 `icon-suffix` 后置图标
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

### Solt 模式

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

### Type 模式

::: demo `label` 设置标签 `clearable` 可清除的
```html

<me-input style="width:500px;" placeholder="我是文本" type="text"></me-input>
<me-input style="width:500px;" placeholder="我是密码" type="password"></me-input>
<me-input style="width:500px;" placeholder="我是数字" type="number"></me-input>
<me-input style="width:500px;" placeholder="我是数字" type="email" value="hpf393187274@163.com"></me-input>
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
| 名称          | 描述         |    参数    |
| ------------- | ------------ | :--------: |
| change        | 内容改变事件 | 当前文本值 |
| handle-prefix | 前置图标事件 | 当前文本值 |
| handle-suffix | 后置图标事件 | 当前文本值 |


## Input Slot
| 名称   | 描述     |
| ------ | -------- |
| prefix | 前置图标 |
| suffix | 前置图标 |
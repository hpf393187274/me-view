
# Input 输入框

## 基础用法
::: demo `clearable` 可清除的
```html
结果：{{form}}
<me-column>
  <me-input clearable placeholder="请输入姓名" v-model="userName"></me-input>
</me-column>
<script>
export default {
  data() {
    return {
      userName:'',
      form : {
        userName:''
      }
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
| disabled    | 禁用状态            | Boolean | false  | true, false            |
| readonly    | 只读状态            | Boolean | false  | true, false            |
| clearable   | 可清除的            | Boolean | false  | true, false            |
| placeholder | 原生属性 - 提示表述 | String  |   -    | -                      |
| icon-prefix | 图标库 - 前置图标   | String  |   -    | -                      |
| icon-suffix | 图标库 - 后置图标   | String  |   -    | -                      |

## Input Events
| 名称                | 描述                |    参数    |
| ------------------- | ------------------- | :--------: |
| change              | 内容改变事件        | 当前文本值 |
| click-input         | 点击文本框          | 当前文本值 |
| click-input-before  | 点击文本框 `之前`   | 当前文本值 |
| click-input-after   | 点击文本框 `之后`   | 当前文本值 |
| click-suffix        | 点击后置图标        | 当前文本值 |
| click-suffix-before | 点击前置图标 `之前` | 当前文本值 |
| click-suffix-after  | 点击后置图标 `之后` | 当前文本值 |
| click-prefix        | 点击前置图标        | 当前文本值 |
| click-prefix-before | 点击后置图标 `之前` | 当前文本值 |
| click-prefix-after  | 点击后置图标 `之后` | 当前文本值 |
| blur-input          | 文本框失焦          | 当前文本值 |
| blur-input-before   | 文本框失焦 `之前`   | 当前文本值 |
| blur-input-after    | 文本框失焦 `之后`   | 当前文本值 |

<!--
 ## Input Slot
| 名称   | 描述     |
| ------ | -------- |
| prefix | 前置图标 |
| suffix | 前置图标 |
-->    
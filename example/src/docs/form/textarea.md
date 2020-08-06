
# Textarea 输入框

## 基础用法
::: demo `clearable` 可清除的
```html
<me-column>
  <me-label title="姓名">
    <me-input clearable placeholder="请输入姓名" v-model="userName" :rules="rules">

    </me-input>
  </me-label>

  <me-label title="姓名">
    <me-textarea clearable placeholder="请输入姓名" v-model="userName" :rules="rules">

    </me-textarea>
  </me-label>
</me-column>
<script>
export default {
  data() {
    return {
      userName:'',
      form : {
        userName:'1111'
      },
      rules: [
        { required: true, message: '年龄不能为空' }
      ]

    }
  }
}
</script>
```
:::


## Textarea Attributes
| 名称        | 描述                |  类型   | 默认值 | 可选值                 |
| ----------- | ------------------- | :-----: | :----: | ---------------------- |
| disabled    | 禁用状态            | Boolean | false  | true, false            |
| readonly    | 只读状态            | Boolean | false  | true, false            |
| clearable   | 可清除的            | Boolean | false  | true, false            |
| placeholder | 原生属性 - 提示表述 | String  |   -    | -                      |

## Textarea Events
| 名称                | 描述                |    参数    |
| ------------------- | ------------------- | :--------: |
| change              | 内容改变事件        | 当前文本值 |
| click-textarea         | 点击文本框          | 当前文本值 |
| click-textarea-before  | 点击文本框 `之前`   | 当前文本值 |
| click-textarea-after   | 点击文本框 `之后`   | 当前文本值 |
| blur-textarea          | 文本框失焦          | 当前文本值 |
| blur-textarea-before   | 文本框失焦 `之前`   | 当前文本值 |
| blur-textarea-after    | 文本框失焦 `之后`   | 当前文本值 |

<!--
 ## Input Slot
| 名称   | 描述     |
| ------ | -------- |
| prefix | 前置图标 |
| suffix | 前置图标 |
-->    
# Dialog 模态框

## Dialog 使用方式

### 普通用法
::: demo `data` 数据 `border` 边框
```html
<template>
  <div>
    <me-dialog width="800px" height="500px" title="dialog" v-model="status" @confirm="handlerConfirm">
      <me-table ref="tableList" checkbox multiple :data="data" :columns="columns" highlight>
        <template #action="{data}">
          <me-input v-model="data.label" />
        </template>
        <template #test>
          <me-button>test</me-button>
        </template>
      </me-table>
    </me-dialog>
    <me-button @click="status=!status">Dialog</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: false,
      checkedRows:[],
      columns: [
        { label:'编号', field: 'id'},
        { label:'测试', field: 'test' },
        { label:'操作', field: 'action' }
      ],
      data: [
        { id: '1', label: '陕西省sssss'},
        { id: '2', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '2', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '4', label: '河南省'},
        { id: '5', label: '陕西省'},
        { id: '6', label: '四川省'},
        { id: '7', label: '江苏省'},
        { id: '8', label: '河南省'},
        { id: '4', label: '河南省'}
      ]
    }
  },
  methods: {
    handlerConfirm () {
      const selectedData = this.$refs.tableList.getSelectedData()
      if(!selectedData || selectedData.length < 1) {
        this.$dialog.alert({
          content: '我们都是好孩子',
          render(h) {
            return h('div', "请选择数据")
          }
        })
        return 
      }

      this.$message.info(`选择了 ${selectedData.length} 条数据`)
    }
  }
}
</script>
```
:::

<!-- ### 可移动
### 自定义 Header
### 自定义 Footer -->

## Modal 遮罩层

### 有遮罩
::: demo `data` 数据 `border` 边框

```html
<template>
  <div>
    <me-modal v-model="status">
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
      <br />ssssssssssssssssss
    </me-modal>
    <me-button @click="status=!status">有遮罩层</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return { status: false }
  }
}
</script>
```
:::

### 无遮罩
::: demo `data` 数据 `border` 边框

```html
<template>
  <div>
    <me-modal :modal="false" v-model="status"></me-modal>
    <me-button @click="status=!status">无遮罩层</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: false
    }
  }
}
</script>
```
:::


### 可拖拽
::: demo `data` 数据 `border` 边框

```html
<template>
  <div>
    <me-modal v-model="status">
      我是可拖拽的哦
    </me-modal>
    <me-button @click="status=!status">拖拽</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: false
    }
  }
}
</script>
```
:::


# Dialog 弹出框

### Alert 用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-button @click="onHandler">你叫什么名字</me-button>
</template>
<script>
export default {
  methods: {
    onHandler() {
      this.$dialog.alert({
        content: '我们都是好孩子',
        render(h) {
          return h('div', "我们都是好孩子22222222")
        }
      })
    }
  }
}
</script>
```
:::



### Confirm 用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-button @click="onHandler">你叫什么名字</me-button>
</template>
<script>
export default {
  methods: {
    onHandler() {
      this.$dialog.confirm({
        content: '请确认：你叫什么名字',
        ok() {
          this.$dialog.alert({
            content: '点击了确认'
          })
        },
        cancel() {
          this.$dialog.alert({
            content: '点击了取消'
          })
        }
      })
    }
  }
}
</script>
```
:::

### Prompt 用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-button @click="onHandler">请输入</me-button>
</template>
<script>
export default {
  methods: {
    onHandler() {
      this.$dialog.prompt({
        content: '请输入文件夹名称',
        rules:[ { required: true, message: '文件夹名称不能为空' }],
        ok(value) {
          this.$message.info(`输入的内容为：${value}`)
        },
        cancel() {
          this.$message.error('点击了取消')
        }
      })
    }
  }
}
</script>
```
:::

## Dialog Attributes
| 名称      | 描述   |  类型   | 默认值 | 可选值      |
| --------- | ------ | :-----: | :----: | ----------- |
| title     | 标题   | String  |   -    | -           |
| width     | 宽度   | String  | false  | true, false |
| height    | 高度   | String  | false  | true, false |
| draggable | 可拖拽 | Boolean |  true  | true, false |
| closable  | 可关闭 | Boolean |  true  | true, false |

## Dialog Events
| 名称    | 描述     | 参数  |
| ------- | -------- | :---: |
| confirm | 事件确定 |   -   |
| cancel  | 事件取消 |   -   |

## Dialog Slot
| 名称 | 描述 |
| ---- | ---- |
# Dialog 模态框

## Dialog 使用方式

### 普通用法
::: demo `data` 数据 `border` 边框
```html
<template>
  <div>
    <me-dialog title="dialog" v-model="status">
      <br />ssss
      <br />ssss
    </me-dialog>
    <me-button @click="status=!status">Dialog</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusModalTrue: false,
      statusModalFalse: false,
      status: false,
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


# Modal 模态框
## Modal 遮罩层

### 有遮罩
::: demo `data` 数据 `border` 边框

```html
<template>
  <div>
    <!-- <input type="text" class="me-flex input-inner" style="padding-left: 8px; padding-right: 8px; text-align: left;"> -->
    <me-modal closableModal v-model="status">
     <div class="me-border-red">
        <me-input width="800px"/>
     </div>
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


## Modal Attributes
| 名称      | 描述   |  类型   | 默认值 | 可选值      |
| --------- | ------ | :-----: | :----: | ----------- |
| title     | 标题   | String  |   -    | -           |
| width     | 宽度   | String  | false  | true, false |
| height    | 高度   | String  | false  | true, false |
| draggable | 可拖拽 | Boolean |  true  | true, false |
| closable  | 可关闭 | Boolean |  true  | true, false |

## Modal Events
| 名称    | 描述     | 参数  |
| ------- | -------- | :---: |
| confirm | 事件确定 |   -   |
| cancel  | 事件取消 |   -   |

## Modal Slot
| 名称 | 描述 |
| ---- | ---- |
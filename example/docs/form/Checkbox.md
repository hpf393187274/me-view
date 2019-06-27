
# Checkbox 复选框

### 基础用法
::: demo `type` 按钮类别 `plain` 简介按钮 `shape` 形状
```html

<me-row>
  <me-button type="default">default</me-button>
  <me-button type="primary">primary</me-button>
  <me-button type="info">info</me-button>
  <me-button type="success">success</me-button>
  <me-button type="warning">warning</me-button>
  <me-button type="error">error</me-button>
</me-row>

<me-row>
  <me-button plain type="default">default</me-button>
  <me-button plain type="primary">primary</me-button>
  <me-button plain type="info">info</me-button>
  <me-button plain type="success">primary</me-button>
  <me-button plain type="warning">warning</me-button>
  <me-button plain type="error">error</me-button>
</me-row>

<me-row>
  <me-button shape="round" type="default" icon="icon-sousuo">default</me-button>
  <me-button shape="round" type="primary" icon="icon-icon_exchange">primary</me-button>
  <me-button shape="round" type="info" icon="icon-more">info</me-button>
  <me-button shape="round" type="success" icon="icon-shezhi">success</me-button>
  <me-button shape="round" type="warning" icon="icon-xiazai">warning</me-button>
  <me-button shape="round" type="error" icon="icon-shezhi">error</me-button>
</me-row>

<me-row>
  <me-button shape="circle" type="default" icon="icon-sousuo"></me-button>
  <me-button shape="circle" type="primary" icon="icon-icon_exchange"></me-button>
  <me-button shape="circle" type="info" icon="icon-more"></me-button>
  <me-button shape="circle" type="success" icon="icon-shezhi"></me-button>
  <me-button shape="circle" type="warning" icon="icon-xiazai"></me-button>
  <me-button shape="circle" type="error" icon="icon-shezhi"></me-button>
</me-row>

```
:::



### Button Attributes
| 名称     | 描述             |  类型   | 默认值  | 可选值                                                        |
| -------- | ---------------- | :-----: | :-----: | ------------------------------------------------------------- |
| type     | 按钮类型         | String  | default | default、primary、dashed、text、info、success、warning、error |
| disabled | 是否禁用状态     | Boolean |  false  | true、false                                                   |
| plain    | 普通的           | Boolean |  false  | true、false                                                   |
| icon     | 图标库：按钮图标 | String  |    -    | 图标库                                                        |
| shape    | 形状             | String  | default | default、circle、round                                        |

### Button Events
| 名称  | 描述     | 参数  |
| ----- | -------- | :---: |
| click | 点击事件 |   -   |

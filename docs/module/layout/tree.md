# Tree 树形控件
> 用清晰的层级结构展示信息，可展开或折叠。

## Example

### 基础用法

### 可选择

### 默认展开和默认选中

### 自定义节点内容
> 节点的内容支持自定义，可以在节点区添加按钮或图标等内容


## Tree Attributes

| 参数                | 描述                                                 | 类型    | 默认值 | 可选值         |
| ------------------- | ---------------------------------------------------- | ------- | ------ | -------------- |
| statistics          | 是否显示统计                                         | Boolean | false  | [true, false]  |
| checkbox            | 是否显示复选框                                       | Boolean | false  | [true, false]  |
| checked-strict      | 是否严格模式：false 父子联动互不干涉                 | Boolean | true   | [true, false]  |
| checked             | 复选框是否选中                                       | Boolean | false  | [true, false]  |
| action              | 是否显示功能                                         | Boolean | false  | [true, false]  |
| lazy                | 是否懒加载                                           | Boolean | false  | [true, false]  |
| expanded            | 是否展开                                             | Boolean | false  | [true, false]  |
| expanded-level      | 展开的级别                                           | Number  | 0      | [1, 2, 3, ...] |
| expanded-node-click | 点击节点是否展开                                     | Boolean | true   | [true, false]  |
| accordion           | 是否每次只打开一个同级树节点展开：手风琴             | Boolean | false  | [true, false]  |
| node-key            | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | String  | id     | -              |

## Tree Methods

| 方法名            | 参数 | 描述             |
| ----------------- | ---- | ---------------- |
| removeCheckedNode | -    | 移除选中的节点   |
| clearCheckedNode  | -    | 清除选中的节点   |
| pushData          | -    | 向 tree 增加数据 |

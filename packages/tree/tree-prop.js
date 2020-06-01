
export default {
  props: {
    /**
     * 展开所有
     */
    expandedAll: Boolean,

    /**
     * 可展开的
     */
    expandable: { type: Boolean, default: true },
    /**
     * 严格的选择：默认：true, false 父子联动互不干涉
     */
    checkedStrictly: { type: Boolean, default: true },
    /**
     * 展开级别：默认：0 表示不限制
     */
    expandedLevel: { type: Number, default: 0 },
    /**
     * 点击节点是否展开
     */
    expandedNodeClick: { type: Boolean, default: true },
    /**
     * 是否每次只打开一个同级树节点展开
     * 手风琴模式
     */
    accordion: Boolean,
    /**
     * 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
     */
    fieldLabel: { type: String, default: 'label' },
    fieldValue: { type: String, default: 'code' },
    /**
     * 是否显示统计
     */
    statistics: Boolean,
    disabled: Boolean,
    /* 是否存在复选框 */
    checkbox: { type: Boolean, default: false },
    /* 是否默认选中 */
    checked: { type: Boolean, default: false },
    /**
     * 懒加载模式
     */
    lazy: Boolean,
    /**
     * 操作功能
     */
    action: Boolean
  }
}

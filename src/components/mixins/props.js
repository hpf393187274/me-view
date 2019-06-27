export default {
  /**
   * 边框
   */
  border: Boolean,
  /**
   * 剧中
   */
  center: Boolean,
  centerRow: Boolean,
  centerColumn: Boolean,
  index: Number,
  /**
   * flex
   */
  flex: Boolean,
  /**
   * 只读
   */
  readonly: Boolean,
  /**
   * 禁用
   */
  disabled: Boolean,
  /**
   * 多选
   */
  multiple: Boolean,
  margin: String,
  padding: Boolean,
  checkbox: Boolean,
  checked: Boolean,
  /**
   * 滚动条
   */
  overflow: { type: String, default: 'visible' },
  /**
   * 标题
   */
  label: { type: String, default: '' },
  /**
   * 标题
   */
  title: { type: String, default: '' },
  /**
   * 头部样式
   */
  headerClass: { type: String, default: null },
  /**
   * 主体样式
   */
  bodyClass: { type: String, default: null },
  /**
   * 尾部样式
   */
  footerClass: { type: String, default: null },
  /**
   * 图标
   */
  icon: { type: String, default: null },
  /**
   * 图标样式
   */
  iconClass: { type: String, default: null },
  /**
   * 形状
   */
  shape: {
    type: String, default: null,
    validator: value => ['circle'].includes(value)
  },
  layout: {
    type: String, default: 'column',
    validator: value => ['row', 'column'].includes(value)
  }
}

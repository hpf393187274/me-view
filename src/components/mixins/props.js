export default {
  /**
   * 边框
   */
  border: Boolean,
  /**
   * 剧中
   */
  center: Boolean,
  /**
   * flex
   */
  flex: Boolean,
  /**
   * 只读
   */
  readOnly: Boolean,
  /**
   * 禁用
   */
  disabled: Boolean,
  margin: String,
  padding: Boolean,
  /**
   * 滚动条
   */
  overflow: { type: String, default: 'visible' },
  /**
   * 标题
   */
  lable: { type: String, default: '' },
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

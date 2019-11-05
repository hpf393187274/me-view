export default {
  props: {
    /**
   * 是否显示统计
   */
    statistics: Boolean,
    label: String,
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
  },
  data() {
    return {
      allChecked: this.checked || (this.data && this.data.checked === true)
    }
  },
  methods: {
    handleClick(...param) {
      this.$emit.apply(this, ['click', ...param])
    }
  }
}
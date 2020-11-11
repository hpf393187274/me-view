import Tools from 'me-view/src/script/tools'
import emitter from 'me-view/src/mixins/emitter'
export default {
  mixins: [ emitter ],
  data () {
    return {
      selectorElement: { },
      allElement: { },
      oldUniqueValue: null
    }
  },
  created () {
    this.eventListenerInitialize()
    this.eventListenerSelector()
  },
  methods: {
    /**
     * 清空选择
     */
    clearSelection () {
      const values = Object.values(this.selectorElement || {})
      for (const value of values) {
        value && value.handlerCheckedChange(false)
      }
      this.selectorElement = {}
    },
    /**
     * 获取选中的记录数
     */
    getRecordSelection () {
      const values = Object.values(this.selectorElement)
      return values && values.map(item => ({ ...item.data, checked: undefined }))
    },
    /**
     * 设置选中的数据
     * @param {Array} data 数据
     * @param {Boolean} clear 是否清楚原有选择数据，默认不清楚
     */
    setRecordSelection (data = [], clear) {
      clear && this.clearSelection()
      Tools.forEach(data, key => {
        const value = Reflect.get(this.allElement, key)
        value && value.handlerCheckedChange(true)
        this.$set(this.selectorElement, key, value)
      })
    },
    /**
     * 事件处理：子组件的创建 or 销毁
     */
    eventListenerInitialize () {
      this.listener('element-children--created', ({ key, value }) => {
        this.$set(this.allElement, key, value)
      })
      this.listener('element-children--beforeDestroy', ({ key }) => {
        this.$delete(this.allElement, key)
      })
    },
    /**
     * 事件处理：子组件的选择 or 反选
     */
    eventListenerSelector () {
      if (this.multiple === true) {
        this.listener('element-selector--multiple-true', ({ key, value }) => {
          this.$set(this.selectorElement, key, value)
        })
        this.listener('element-selector--multiple-false', ({ key }) => {
          this.$delete(this.selectorElement, key)
        })
      } else {
        this.listener('element-selector--single', ({ key, value }) => {
          if (this.oldUniqueValue === key) { return }
          if (Tools.notBlank(this.oldUniqueValue)) {
            const value = Reflect.get(this.selectorElement, this.oldUniqueValue)
            value && value.handlerCheckedChange(false)
            this.$delete(this.selectorElement, this.oldUniqueValue)
          }
          this.$set(this.selectorElement, key, value)
          this.oldUniqueValue = key
        })
      }
    }
  }
}

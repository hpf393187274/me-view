<template>
  <div class="me-combo me-flex" :style="styles">
    <me-input
      :clearable="clearable"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly__"
      :align-content="alignContent"
      @blur="handlerBlurInput"
      @click="handlerClickInput"
      ref="input"
      v-model="label__"
    >
      <template #suffix>
        <me-icon :disabled="disabled" @click="handlerClickSuffix" @mouseout="closable=true" @mouseover="handlerMouseoverOther">{{iconSuffix}}</me-icon>
      </template>
    </me-input>
    <transition name="transition-drop">
      <combo-dropdown
        :style="{ 'z-index': visibility? 1000000 : 0 }"
        @mouseout="closable=true"
        @mouseover="handlerMouseoverOther"
        v-show="visibility"><slot /></combo-dropdown>
    </transition>
  </div>
</template>

<script>
import ComboCommon from './combo.common'
import emitter from 'me-view/src/mixins/emitter'
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
import ComboDropdown from './ComboDropdown'
export default {
  mixins: [ emitter, ComboCommon ],
  components: { [ComboDropdown.name]: ComboDropdown },
  name: 'Combo',
  data () {
    return {
      visibility: false,
      valueSingle: {},
      valueMultiple: [],
      dataFlat: [],
      readonly__: this.readonly || this.multiple,
      /** input 失焦 移入 body 区域 */
      closable: true
    }
  },
  created () {
    this.deepFlatData(this.data, true)
    this.initValue(this.value)
    this.listenerUpward([ 'Label' ], 'me-label--reset', this.initValue)
    this.listener('me-combo--select', this.handlerSelectChange)
  },
  async mounted () {
    await this.$nextTick()
    const height = this.$el.getBoundingClientRect().height
    this.dispatchUpward('Label', 'me-label--label-height', `${height}px`)
  },
  computed: {
    iconSuffix () {
      return this.visibility ? 'icon-angle_down' : 'icon-angle_up'
    },
    length () {
      return this.dataFlat.length
    },
    styles () {
      const width = this.width
      if (width) {
        return { width, flex: '0 1 auto' }
      }
      return { }
    }
  },
  watch: {
    visibility (newValue) {
      this.$emit('me-attribute--visible-change', newValue)
      this.$emit(`me-attribute--visible-${newValue}`)
      if (newValue) {
        this.broadcast('ComboDropdown', 'ComboDropdown--update-popper')
        this.handlerFocusInput()
      }
    },
    value (nValue, oValue) {
      const newValue = Type.isArray(this.value) ? this.value.toString() : this.value
      const oldValue = Type.isArray(this.value__) ? this.value__.toString() : this.value__
      if (newValue !== oldValue) {
        this.dispatchUpward('Label', 'me-label--default-change', newValue)
        this.initValue(newValue)
      }
    },
    label__ (value) {
      if (Tools.isEmpty(value)) {
        /** 处理清空无法选择问题 */
        this.handlerChangeValue(null)
      }
    },
    data (value) {
      this.deepFlatData(value, true)
      this.dispatchUpward('Label', 'me-label--default-change', this.value)
      this.initValue(this.value)
    }
  },
  methods: {
    deepFlatData (data, clear = false) {
      if (Type.isArray(data)) {
        if (clear === true) { this.dataFlat = [] }
        for (const item of data) {
          if (Tools.notBlank(item.children)) {
            this.deepFlatData(item.children)
          }
          this.dataFlat.push({ ...item, children: undefined })
        }
      }
    },
    findItem (value) {
      const newValue = Type.isNumber(value) ? value + '' : value
      return this.dataFlat.find(item => this.uniqueValue(item, true) === newValue)
    },
    initValueSingle (value) {
      if (Tools.isEmpty(value)) {
        if (Tools.notBlank(this.defaultValue)) {
          value = this.defaultValue
        } else if (this.defaultIndex >= 0 && this.defaultIndex <= this.length) {
          value = this.uniqueValue(this.dataFlat[this.defaultIndex])
        }
      }
      this.value__ = value
      let data = this.findItem(value)
      if (Type.notObject(data)) { data = {} }
      Object.assign(this.valueSingle, data)
      this.label__ = this.uniqueLabel(data)
    },
    initValueMultiple (value) {
      this.label__ = []
      const list = Type.isArray(value) ? [ ...value ] : [ value || '' ]
      this.value__ = [ ...list ]
      this.valueMultiple = this.data.filter(item => list.includes(this.uniqueValue(item)))

      for (const item of this.valueMultiple) {
        this.label__.push(this.uniqueLabel(item))
      }
    },
    initValue (value) {
      if (Tools.isBlank(this.dataFlat)) { return }
      if (
        Tools.isEmpty(value) &&
        Tools.isBlank(this.defaultValue) &&
        (Tools.isEmpty(this.defaultIndex) || this.defaultIndex < 0 || this.defaultIndex > this.length)
      ) { return }
      this.multiple ? this.initValueMultiple(value) : this.initValueSingle(value)
      this.handlerChangeValue(this.value__)
    },
    isSelected (value) {
      const list = this.multiple ? this.valueMultiple : [ this.valueSingle ]
      return list.findIndex(item => value === this.uniqueValue(item)) !== -1
    },
    handlerClickSuffix () {
      this.visibility = !this.visibility
    },
    uniqueValue (data = {}, toString = false) {
      const value = Reflect.get(data, this.fieldValue)
      if (Tools.notEmpty(value) && toString === true) {
        return String(value)
      }
      return value
    },
    uniqueLabel (data = {}) { return Reflect.get(data, this.fieldLabel) || '' },
    handlerClickInput () {
      this.readonly__ && this.handlerClickSuffix()
    },
    selectSingle (data = {}) {
      this.visibility = false
      this.label__ = this.uniqueLabel(data)
      this.value__ = this.uniqueValue(data)
      this.valueSingle = { ...data }
    },
    handlerSelectChange (data, index) {
      this.multiple ? this.selectMultiple(data) : this.selectSingle(data)
      this.handlerChangeValue(this.value__, data, index)
    },
    handlerChangeValue (value = null, data = null, index = -1) {
      this.dispatchUpward('Label', 'me-label--change', value)
      this.$emit('input', value)
      this.dispatchParent('input', value)
      if (Tools.notBlank(data)) {
        this.dispatchParent('change', { value, data, index })
      }
    },
    handleMultipleRemove (index) {
      Tools.arrayRemove(this.label__, index).catch(error => { console.debug(error) })
      Tools.arrayRemove(this.value__, index).catch(error => { console.debug(error) })
      Tools.arrayRemove(this.valueMultiple, index).catch(error => { console.debug(error) })
    },
    handleMultiplPush (data) {
      const label = this.uniqueLabel(data)
      if (label) { this.label__.push(label) }

      const value = this.uniqueValue(data)
      if (value) { this.value__.push(value) }
      this.valueMultiple.push({ ...data })
    },
    selectMultiple (data) {
      const index = this.valueMultiple.findIndex(item => this.uniqueValue(item) === this.uniqueValue(data))
      index >= 0 ? this.handleMultipleRemove(index) : this.handleMultiplPush(data)
    },
    handlerBlurInput () {
      this.closable && (this.visibility = false)
    },
    handlerFocusInput () {
      this.$refs.input.$emit('focus-input')
    },
    handlerMouseoverOther () {
      this.closable = false
      this.handlerFocusInput()
    }
  }
}
</script>

<template>
  <div class="me-combo me-flex">
    <me-input
      :clearable="clearable"
      :disabled="disabled"
      :width="width"
      :placeholder="placeholder"
      :readonly="readonly__"
      @on-blur="handlerBlurInput"
      @on-click="handlerClickInput"
      ref="input"
      v-model="label__"
    >
      <template #suffix>
        <me-icon :disabled="disabled" @click="onClickSuffix" @mouseout="closable=true" @mouseover="onMouseoverOther">{{iconSuffix}}</me-icon>
      </template>
    </me-input>
    <transition appear name="transition-drop">
      <div
        :style="{'z-index': status? 1000000 : 0, width: width__ + 'px'}"
        @mouseout="closable=true"
        @mouseover="onMouseoverOther"
        class="me-column me-border combo-options"
        v-show="data && data.length > 0 && status"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import ComboCommon from './combo.common'
import emitter from 'me-view/src/mixins/emitter'
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
export default {
  mixins: [ emitter, ComboCommon ],
  name: 'MeCombo',
  data () {
    return {
      status: false,
      rendered: false,
      valueSingle: {},
      valueMultiple: [],
      width__: undefined,
      dataFlat: [],
      readonly__: this.readonly || this.multiple,
      /** input 失焦 移入 body 区域 */
      closable: true
    }
  },
  mounted () {
    if (this.rendered) {
      this.rendered = false
      this.$nextTick(() => {
        this.rendered = true
      })
    }
  },
  created () {
    this.deepFlatData(this.data, true)
    this.initValue(this.value)
    this.listenerUpward('MeLabel', 'me-label--reset', this.initValue)
    this.listener('me-combo--select', this.handlerChange)
  },
  computed: {
    iconSuffix () {
      return this.status ? 'icon-angle_down' : 'icon-angle_up'
    }
  },
  watch: {
    status (newValue) {
      if (newValue) {
        this.rendered = true
        this.width__ = this.$refs.input.$el.scrollWidth
        this.onFocusInput()
      }
    },
    value () {
      const newValue = Type.isArray(this.value) ? this.value.toString() : this.value
      const oldValue = Type.isArray(this.value__) ? this.value__.toString() : this.value__
      if (newValue !== oldValue) {
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
      return this.dataFlat.find(item => Reflect.get(item, this.fieldValue) === value)
    },
    initValueSingle (value) {
      let data = this.findItem(value)
      if (Type.notObject(data)) { data = {} }
      Object.assign(this.valueSingle, data)
      this.label__ = Reflect.get(data, this.fieldLabel)
      this.value__ = Reflect.get(data, this.fieldValue)
    },
    initValueMultiple (value) {
      this.label__ = []
      this.value__ = []
      const list = Type.isArray(value) ? [ ...value ] : [ value || '' ]
      this.valueMultiple = this.data.filter(item => list.includes(Reflect.get(item, this.fieldValue)))

      for (const item of this.valueMultiple) {
        this.label__.push(Reflect.get(item, this.fieldLabel))
        this.value__.push(Reflect.get(item, this.fieldValue))
      }
    },
    initValue (value) {
      this.multiple ? this.initValueMultiple(value) : this.initValueSingle(value)
      this.handlerChangeValue(this.value__)
    },
    isSelected (value) {
      const list = this.multiple ? this.valueMultiple : [ this.valueSingle ]
      return list.findIndex(item => value === Reflect.get(item, this.fieldValue)) !== -1
    },
    onClickSuffix () {
      this.status = !this.status
    },
    handlerClickInput () {
      this.readonly__ && this.onClickSuffix()
    },
    selectSingle (data = {}) {
      this.status = false
      this.label__ = Reflect.get(data, this.fieldLabel)
      this.value__ = Reflect.get(data, this.fieldValue)
      this.valueSingle = { ...data }
    },
    handlerChange (data, index) {
      this.multiple ? this.selectMultiple(data) : this.selectSingle(data)
      this.handlerChangeValue(this.value__, data, index)
    },
    handlerChangeValue (value = null, data = null, index = -1) {
      this.dispatchUpward('MeLabel', 'me-label--change', value)
      this.$emit('input', value)
      this.dispatchParent('input', value)
      if (Tools.notBlank(data) && index !== -1) {
        this.dispatchParent('change', { value, data, index })
      }
    },
    handleMultipleRemove (index) {
      Tools.arrayRemove(this.label__, index).catch(error => { console.debug(error) })
      Tools.arrayRemove(this.value__, index).catch(error => { console.debug(error) })
      Tools.arrayRemove(this.valueMultiple, index).catch(error => { console.debug(error) })
    },
    handleMultiplPush (data) {
      this.label__.push(Reflect.get(data, this.fieldLabel))
      this.value__.push(Reflect.get(data, this.fieldValue))
      this.valueMultiple.push({ ...data })
    },
    selectMultiple (data) {
      const index = this.valueMultiple.findIndex(item => item[this.fieldValue] === data[this.fieldValue])
      index >= 0 ? this.handleMultipleRemove(index) : this.handleMultiplPush(data)
    },
    handlerBlurInput () {
      this.closable && (this.status = false)
    },
    onFocusInput () {
      this.$refs.input.$emit('focus-input')
    },
    onMouseoverOther () {
      this.closable = false
      this.onFocusInput()
    }
  }
}
</script>

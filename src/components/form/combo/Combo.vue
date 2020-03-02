<template>
  <div class="me-combo me-flex">
    <me-input
      :clearable="clearable"
      :disabled="disabled"
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
        :style="{'z-index': status? 10000 : 0,'height': height}"
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
import ComboMixin from './combo.mixin'
export default {
  mixins: [ ComboMixin ],
  name: 'MeCombo',
  data () {
    return {
      status: false,
      rendered: false,
      valueSingle: {},
      valueMultiple: [],
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
    this.listenerUpward('MeLabel', 'on-label-reset', value => this.initValue(value))
  },
  created () {
    this.initValue(this.value)
    this.listenerParent('on-select', this.handlerClickOption)
  },
  computed: {
    iconSuffix () {
      return this.status ? this.$config.icon.angle_down_fill : this.$config.icon.angle_up_fill
    }
  },
  watch: {
    status (newValue) {
      if (newValue) {
        this.rendered = true
        this.onFocusInput()
      }
      this.$emit(newValue === true ? 'combo-content-show' : 'combo-content-hide', newValue)
    },
    value (newValue) {
      this.initValue(newValue)
    },
    value__ (newValue) {
      this.dispatchUpward('MeLabel', 'on-label-change', newValue)
    }
  },
  methods: {
    findItem (value) {
      return this.data.find(item => Reflect.get(item, this.fieldValue) === value)
    },
    initValueSingle (value) {
      const data = this.findItem(value)
      if (this.$tools.isEmpty(data)) { return }
      Object.assign(this.valueSingle, data)
      this.label__ = Reflect.get(data, this.fieldLabel) || ''
      this.value__ = Reflect.get(data, this.fieldValue) || ''
    },
    initValueMultiple (value) {
      this.label__ = []
      this.value__ = []
      if (this.$tools.isEmpty(value)) { return }
      const list = this.$type.isArray(value) ? [ ...value ] : [ value ]
      this.valueMultiple = this.data.filter(item => list.includes(Reflect.get(item, this.fieldValue)))

      for (const item of this.valueMultiple) {
        this.label__.push(Reflect.get(item, this.fieldLabel))
        this.value__.push(Reflect.get(item, this.fieldValue))
      }
    },
    initValue (value) {
      this.multiple ? this.initValueMultiple(value) : this.initValueSingle(value)
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
    selectSingle (data) {
      this.status = false
      this.label__ = Reflect.get(data, this.fieldLabel)
      this.value__ = Reflect.get(data, this.fieldValue)
      this.valueSingle = { ...data }
      this.$emit('change', this.value__)
    },
    handleMultipleRemove (index) {
      this.$tools.arrayRemove(this.label__, index).catch(error => { console.error(error) })
      this.$tools.arrayRemove(this.value__, index).catch(error => { console.error(error) })
      this.$tools.arrayRemove(this.valueMultiple, index).catch(error => { console.error(error) })
    },
    handleMultiplPush (data) {
      this.label__.push(Reflect.get(data, this.fieldLabel))
      this.value__.push(Reflect.get(data, this.fieldValue))
      this.valueMultiple.push({ ...data })
    },
    selectMultiple (data) {
      const index = this.valueMultiple.findIndex(item => item[this.fieldValue] === data[this.fieldValue])
      index >= 0 ? this.handleMultipleRemove(index) : this.handleMultiplPush(data)
      this.$emit('change', [ ...this.value__ ])
    },
    handlerClickOption (item, index) {
      const data = { ...item, index }
      this.$emit('click-option-before', item, index)
      this.multiple ? this.selectMultiple(data) : this.selectSingle(data)
      this.$emit('click-option', item, index)
      this.$emit('click-option-after', item, index)
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

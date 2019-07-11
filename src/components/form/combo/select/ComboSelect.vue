<template>
  <div :class="classes">
    <div>value={{value}}---value__={{value__}}</div>
    <me-input
      :clearable="clearable || readonly__"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly__"
      @blur-input="blurInput"
      @click-input="clickInput"
      ref="input"
      v-model="label__"
    >
      <template #suffix>
        <me-icon :disabled="disabled" @click="clickSuffix" @mouseout="closable=true" @mouseover="mouseoverOther">{{iconSuffix}}</me-icon>
      </template>
    </me-input>
    <div
      :style="{'z-index': status? 10000 : 0}"
      @mouseout="closable=true"
      @mouseover="mouseoverOther"
      class="me-column me-border combo-options"
      v-show="status"
    >
      <slot name="options">
        <me-combo-option
          :checkbox="checkbox"
          :data="item"
          :disabled="disabled"
          :field-label="fieldLabel"
          :field-value="fieldValue"
          :index="index"
          :key="item[fieldValue]"
          :multiple="multiple"
          :selected="isSelected(item[fieldValue])"
          @click="clickOption"
          v-for="(item,index) in data"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import Option from './Option'
import ComboMixin from '../combo.mixin'
export default {
  mixins: [ComboMixin],
  name: 'MeComboSelect',
  components: {
    [Option.name]: Option
  },
  data() {
    return {
      status: false,
      valueSingle: {},
      valueMultiple: [],
      readonly__: this.readonly || this.multiple,
      /** input 失焦 移入 body 区域 */
      closable: true
    }
  },
  created() {
    this.initValue()
  },
  computed: {
    classes() {
      return ['me-combo']
    },
    iconSuffix() {
      return this.status ? this.$config.icon.angle_down_fill : this.$config.icon.angle_up_fill
    }
  },
  watch: {
    status(value) {
      value && this.focusInput()
      this.$emit('change-status', value)
    },
    value() {
      this.initValue()
    }
  },
  methods: {
    findItem(value) {
      return this.data.find(item => item[this.fieldValue] === value)
    },
    initValueSingle() {
      const data = this.findItem(this.value)
      if (this.$tools.isEmpty(data)) { return }
      Object.assign(this.valueSingle, data)
      this.label__ = data[this.fieldLabel] || ''
      this.value__ = data[this.fieldValue] || ''
    },
    initValueMultiple() {
      this.$type.isNotArray(this.label__) && (this.label__ = [])
      this.$type.isNotArray(this.value__) && (this.value__ = [])
      this.$tools.clearEmpty(this.label__)
      this.$tools.clearEmpty(this.value__)
      if (this.$tools.isEmpty(this.value)) { return }
      const list = this.$type.isArray(this.value) ? [...this.value] : [this.value]
      this.valueMultiple = this.data.filter(item => list.includes(item[this.fieldValue]))

      for (const item of this.valueMultiple) {
        this.label__.push(item[this.fieldLabel])
        this.value__.push(item[this.fieldValue])
      }
    },
    initValue() {
      this.multiple ? this.initValueMultiple() : this.initValueSingle()
    },
    isSelected(value) {
      const list = this.multiple ? this.valueMultiple : [this.valueSingle]
      return list.findIndex(item => value === item[this.fieldValue]) !== -1
    },
    clickSuffix() {
      this.status = !this.status
    },
    clickInput() {
      this.readonly__ && this.clickSuffix()
    },
    selectSingle(data) {
      this.status = false
      this.label__ = data[this.fieldLabel]
      this.value__ = data[this.fieldValue]
      this.valueSingle = { ...data }
      this.$emit('input', this.value__)
    },
    handleMultipleRemove(index) {
      this.$tools.arrayRemove(this.label__, index).catch(error => { console.error(error) })
      this.$tools.arrayRemove(this.value__, index).catch(error => { console.error(error) })
      this.$tools.arrayRemove(this.valueMultiple, index).catch(error => { console.error(error) })
    },
    handleMultiplPush(data) {
      this.label__.push(data[this.fieldLabel])
      this.value__.push(data[this.fieldValue])
      this.valueMultiple.push({ ...data })
    },
    selectMultiple(data) {
      const this_ = this
      this.$tools.includes(this.valueMultiple, data, (source, target) => source[this.fieldValue] === target[this.fieldValue])
        .then(({ status, data, index }) => {
          status ? this_.handleMultipleRemove(index) : this_.handleMultiplPush(data)
        })
        .catch(message => {
          console.error(message)
        })
        .finally(() => {
          this.$emit('input', [...this.value__])
        })

    },
    clickOption(item, index) {
      const data = { ...item, index }
      this.$emit('click-option-before', item, index)
      this.multiple ? this.selectMultiple(data) : this.selectSingle(data)
      this.$emit('click-option', item, index)
      this.$emit('click-option-after', item, index)
    },
    blurInput() {
      this.closable && (this.status = false)
    },
    focusInput() {
      this.$refs.input.focus()
    },
    mouseoverOther() {
      this.closable = false
      this.focusInput()
    }
  }
}
</script>

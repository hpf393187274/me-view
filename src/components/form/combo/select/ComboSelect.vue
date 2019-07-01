<template>
  <div :class="classes">
    <me-input
      :clearable="clearable || readonly__"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly__"
      @blur-input="blurInput"
      @click-input="clickInput"
      ref="input"
      v-model="value__"
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
          :index="index"
          :key="item.value"
          :multiple="multiple"
          :selected="isSelected(item.value)"
          @click="clickOption"
          v-for="(item,index) in data"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import Option from './Option'
export default {
  name: 'MeComboSelect',
  components: {
    [Option.name]: Option
  },
  props: {
    data: { type: Array, default() { return [] } },
    value: { type: [String, Object, Array] }
  },
  data() {
    return {
      status: false,
      value__: '',
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
      return [
        'me-combo'
      ]
    },
    iconSuffix() {
      return this.status ? this.$config.icon.angle_down_fill : this.$config.icon.angle_up_fill
    }
  },
  watch: {
    status(value) {
      value && this.focusInput()
    }
  },
  methods: {
    findItem(target) {
      return this.data.find(({ value, label }) => value === target.value || label === target.label)
    },
    initValueSingle() {
      const data = this.parseValue(this.value)
      this.valueSingle = { ...data }
      this.value__ = data.label || ''
    },
    adapterValue(data) {
      if (this.$type.isString(data)) {
        return { value: data, label: data }
      }
      if (this.$type.isObject(data)) {
        return {
          value: data.value || '',
          label: data.label || ''
        }
      }
      return {}
    },
    parseValue(data) {
      return this.findItem(this.adapterValue(data)) || {}
    },
    initValueMultiple() {
      this.value__ = []
      if (this.$tools.isEmpty(this.value)) {
        return
      }
      const list = this.$type.isArray(this.value) ? this.value : [this.value]
      for (const item of list) {
        const data = this.parseValue(item)
        this.valueMultiple.push({ ...data })
        this.value__.push(data.label || '')
      }
    },
    initValue() {
      this.multiple ? this.initValueMultiple() : this.initValueSingle()
    },
    isSelected(value) {
      const list = this.multiple ? this.valueMultiple : [this.valueSingle]
      return list.findIndex(item => value === item.value) !== -1
    },
    clickSuffix() {
      this.status = !this.status
    },
    clickInput() {
      this.readonly__ && this.clickSuffix()
    },
    selectSingle(data) {
      this.status = false
      this.value__ = data.label
      this.valueSingle = { ...data }
    },
    selectMultiple(data) {
      const this_ = this
      this.$tools.includes(this.valueMultiple, data, (source, target) => source.value === target.value)
        .then(({ status, data, index }) => {
          if (status) {
            this_.$tools.arrayRemove(this_.value__, index).catch(error => { console.error(error) })
            this_.$tools.arrayRemove(this_.valueMultiple, index).catch(error => { console.error(error) })
          } else {
            this_.value__.push(data.label)
            this_.valueMultiple.push({ ...data })
          }
        })
        .catch(message => {
          console.error(message)
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

<template>
  <div class="me-combo me-flex">
    <me-input
      :clearable="clearable"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly__"
      @blur-input="onBlurInput"
      @click-input="onClickInput"
      ref="input"
      v-model="label__"
    >
      <template #suffix>
        <me-icon :disabled="disabled" @click="onClickSuffix" @mouseout="closable=true" @mouseover="onMouseoverOther">{{iconSuffix}}</me-icon>
      </template>
    </me-input>
    <div
      :style="{'z-index': status? 10000 : 0,'height': height}"
      @mouseout="closable=true"
      @mouseover="onMouseoverOther"
      class="me-column me-border combo-options"
      v-show="data && data.length > 0 && status"
    >
      <slot>
        <me-combo-option
          :checkbox="checkbox"
          :checked="isSelected(item[fieldValue])"
          :data="item"
          :disabled="disabled"
          :field-label="fieldLabel"
          :field-value="fieldValue"
          :highlight="highlight"
          :index="index"
          :key="item[fieldValue]"
          :multiple="multiple"
          @click-option="onClickOption"
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
  props: { readonly: Boolean, index: Number, placeholder:String },
  components: {
    [Option.name]: Option
  },
  data() {
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
  mounted() {
    if (this.rendered) {
      this.rendered = false
      this.$nextTick(() => {
        this.rendered = true
      })
    }
  },
  created() {
    this.initValue()
  },
  computed: {
    iconSuffix() {
      return this.status ? this.$config.icon.angle_down_fill : this.$config.icon.angle_up_fill
    }
  },
  watch: {
    status(value) {
      if (value) {
        this.rendered = true
        this.onFocusInput()
      }
      this.$emit('change-status', value)
    },
    value() {
      this.initValue()
    }
  },
  methods: {
    findItem(value) {
      return this.data.find(item => Reflect.get(item, this.fieldValue) === value)
    },
    initValueSingle() {
      const data = this.findItem(this.value)
      if (this.$tools.isEmpty(data)) { return }
      Object.assign(this.valueSingle, data)
      this.label__ = Reflect.get(data, this.fieldLabel) || ''
      this.value__ = Reflect.get(data, this.fieldValue) || ''
    },
    initValueMultiple() {
      this.label__ = []
      this.value__ = []
      if (this.$tools.isEmpty(this.value)) { return }
      const list = this.$type.isArray(this.value) ? [...this.value] : [this.value]
      this.valueMultiple = this.data.filter(item => list.includes(Reflect.get(item, this.fieldValue)))

      for (const item of this.valueMultiple) {
        this.label__.push(Reflect.get(item, this.fieldLabel))
        this.value__.push(Reflect.get(item, this.fieldValue))
      }
    },
    initValue() {
      this.multiple ? this.initValueMultiple() : this.initValueSingle()
    },
    isSelected(value) {
      const list = this.multiple ? this.valueMultiple : [this.valueSingle]
      return list.findIndex(item => value === Reflect.get(item, this.fieldValue)) !== -1
    },
    onClickSuffix() {
      this.status = !this.status
    },
    onClickInput() {
      this.readonly__ && this.onClickSuffix()
    },
    selectSingle(data) {
      this.status = false
      this.label__ = Reflect.get(data, this.fieldLabel)
      this.value__ = Reflect.get(data, this.fieldValue)
      this.valueSingle = { ...data }
      this.$emit('change', this.value__)
    },
    handleMultipleRemove(index) {
      this.$tools.arrayRemove(this.label__, index).catch(error => { console.error(error) })
      this.$tools.arrayRemove(this.value__, index).catch(error => { console.error(error) })
      this.$tools.arrayRemove(this.valueMultiple, index).catch(error => { console.error(error) })
    },
    handleMultiplPush(data) {
      this.label__.push(Reflect.get(data, this.fieldLabel))
      this.value__.push(Reflect.get(data, this.fieldValue))
      this.valueMultiple.push({ ...data })
    },
    selectMultiple(data) {
      const this_ = this
      this.$tools.includes(this.valueMultiple, data, (source, target) => source[this.fieldValue] === target[this.fieldValue])
        .then(({ status, data, index }) => {
          status ? this_.handleMultipleRemove(index) : this_.handleMultiplPush(data)
        })
        .catch(message => { console.error(message) })
        .finally(() => {
          this.$emit('change', [...this.value__])
        })
    },
    onClickOption(item, index) {
      const data = { ...item, index }
      this.$emit('click-option-before', item, index)
      this.multiple ? this.selectMultiple(data) : this.selectSingle(data)
      this.$emit('click-option', item, index)
      this.$emit('click-option-after', item, index)
    },
    onBlurInput() {
      this.closable && (this.status = false)
    },
    onFocusInput() {
      this.$refs.input.$emit('focus-input')
    },
    onMouseoverOther() {
      this.closable = false
      this.onFocusInput()
    }
  }
}
</script>

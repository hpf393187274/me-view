<template>
  <div class="me-column me-list">
    <template v-for="(item,index) in data">
      <list-item
        :data="item"
        :index="index"
        :checkbox="checkbox"
        :key="item[fieldValue]"
        :highlight="highlight"
        :field-value="fieldValue"
        :field-label="fieldLabel"
        v-model="item.checked"
        >
        <slot :data="data" slot-scope="{data}"/>
      </list-item>
    </template>
  </div>
</template>
<script>
import Tools from 'me-view/src/script/tools'
import Type from 'me-view/src/script/type'
import ListItem from '../list/ListItem'
export default {
  name: 'List',
  components: { [ListItem.name]: ListItem },
  props: {
    data: Array,
    value: [ Number, String, Array ],
    checkbox: Boolean,
    highlight: Boolean,
    multiple: Boolean,
    fieldValue: { type: String, default: 'value' },
    fieldLabel: { type: String, default: 'label' }
  },
  created () {
    this.initChecked()
  },
  watch: {
    value () { this.initChecked() }
  },
  methods: {
    initChecked () {
      if (Type.isArray(this.value)) {
        for (const item of this.data) {
          const value = this.uniqueValue(item, true)
          this.$set(item, 'checked', this.value.findIndex(item => value === String(item)) > -1)
        }
      }
    },
    uniqueValue (data = {}, toString = false) {
      const value = Reflect.get(data, this.fieldValue)
      if (Tools.notEmpty(value) && toString === true) {
        return String(value)
      }
      return value
    }
  }
}
</script>

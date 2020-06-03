<template>
  <div class="me-column me-list">
    <template v-for="(item,index) in data">
      <me-list-item
        :data="item"
        :index="index"
        :checkbox="checkbox"
        :key="item[fieldValue]"
        :highlight="highlight"
        :field-value="fieldValue"
        :field-label="fieldLabel"
        v-model="value">
      </me-list-item>
    </template>
  </div>
</template>
<script>
import ListItem from '../list/ListItem'
export default {
  name: 'MeList',
  components: { [ListItem.name]: ListItem },
  props: {
    data: Array,
    value: [ String, Array ],
    checkbox: Boolean,
    highlight: Boolean,
    multiple: Boolean,
    fieldValue: { type: String, default: 'value' },
    fieldLabel: { type: String, default: 'label' }
  }
}
</script>

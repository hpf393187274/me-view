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
        :multiple="multiple"
        v-model="item.checked"
        >
        <slot :data="data" slot-scope="{data}"/>
      </list-item>
    </template>
  </div>
</template>
<script>
import ListItem from '../list/ListItem'
import Selector from 'me-view/src/mixins/selector-listener'
export default {
  name: 'List',
  mixins: [ Selector ],
  components: { [ListItem.name]: ListItem },
  mounted () {
    console.log('s-----------', this)
  }
}
</script>

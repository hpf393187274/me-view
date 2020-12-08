<template>
  <div :class="classes" @click="handleClick">
    <me-checkbox v-if="checkbox" v-model="valueInner" />
    <span class="list-item-inner">
      <slot :data="data">{{data[fieldLabel]}}</slot>
    </span>
  </div>
</template>
<script>
import Selector from 'me-view/src/mixins/selector-dispatch'
export default {
  name: 'ListItem',
  mixins: [ Selector ],
  computed: {
    containerName () { return 'List' },
    classes () {
      return [
        'me-row list-item', ...this.isSelected
      ]
    }
  }
}
</script>

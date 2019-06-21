<template>
  <div @click="$emit('click')" class="me-row me-flex table-row">
    <div :class="classColumn" :key="item.label" v-for="item in columns">{{content(item)}}</div>
  </div>
</template>
<script>
export default {
  name: 'MeTableRow',
  props: {
    type: {
      type: String, default: 'body',
      validator: (value) => ['header', 'body'].includes(value)
    },
    columns: { type: Array, default: () => ([]) },
    data: { type: Object, default: () => ({}) },
  },
  computed: {
    classColumn() {
      return 'me-row me-flex table-column'
    }
  },
  methods: {
    content({ label, field }) {
      return this.type === 'body' ? this.data[field] : label
    }
  }
}
</script>

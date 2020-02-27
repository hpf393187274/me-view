<template>
  <form>
    <slot />
  </form>
</template>
<script>
export default {
  name: 'MeForm',
  props: {
    rules: Object
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    this.$on('on-label-add', (field) => {
      field && this.fields.push(field)
      return false
    })
    this.$on('on-label-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
      return false
    })
  },
  methods: {
    reset () {
      for (const field of this.fields) {
        field.reset()
      }
    },
    async validate () {
      for (const field of this.fields) {
        await field.validate()
      }
    }
  }
}
</script>

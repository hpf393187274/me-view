<template>
  <form>
    <slot />
  </form>
</template>
<script>
export default {
  name: 'Form',
  props: {
    rules: { type: Object, default: () => {} }
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    this.$on('me-form--add', (field) => {
      field && this.fields.push(field)
      return false
    })
    this.$on('me-form--remove', (field) => {
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
    initialize (data) {
      for (const field of this.fields) {
        if (field.prop) {
          field.initialize(Reflect.get(data, field.prop))
        }
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

<template>
  <form>
    <slot />
  </form>
</template>
<script>
import { type } from '@assets/script/common'
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
    validate (callback = () => { }) {
      if (type.notFunction(callback)) {
        console.warn('me-from.validate', '->', 'param is net function')
      }
      const length = this.fields.length
      return new Promise(resolve => {
        let count = 0
        for (const field of this.fields) {
          field.validate(valid => {
            if (++count === length) {
              resolve(valid)
              type.isFunction(callback) && callback(valid)
            }
          })
        }
      })
    }
  }
}
</script>

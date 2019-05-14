import { PREFIX } from '@/config'

export default {
  addClass(...value) {
    const classDefault = {
      [this.preClass('border')]: this.border,
      [this.preClass('flex')]: this.flex,
      [this.preClass('center')]: this.center
    }

    if (this.$type.isArray(value)) {
      return [
        classDefault,
        ...value.flatMap(item => this.preClass(item))
      ]
    }
    return [classDefault]
  },
  preClass(value) {
    if (this.$type.isString(value)) {
      return `${PREFIX}-${value}`
    }
    return ''
  },
  preImg(value) {
    return `/images/${value}`
  }
}

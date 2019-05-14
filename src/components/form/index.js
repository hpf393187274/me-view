import { adapterComponent } from '@components/common'
const list = ['Text', 'Button', 'Checkbox']
export default [
  ...list.flatMap(adapterComponent('form'))
]
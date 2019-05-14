import { adapterComponent } from '@components/common'
const list = ['Row', 'Column', 'LineRow', 'LineColumn', 'Icon']
export default [
  ...list.flatMap(adapterComponent('basic'))
]

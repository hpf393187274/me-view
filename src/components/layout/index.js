import { adapterComponent } from '@components/common'
import Tree from './tree'
const list = [
  'Panel', 'Dialog', 'Transfer', ...Tree
]
export default [
  ...list.flatMap(adapterComponent('layout'))
]
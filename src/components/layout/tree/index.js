import { adapterComponent } from '@components/common'
export default [
  ...['Tree', 'TreeNode'].flatMap(adapterComponent('tree'))
]

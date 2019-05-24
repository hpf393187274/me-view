
import Basic from './basic'
import Layout from './layout'
import Form from './form'

import mixins from '@components/mixins'
const components = [
  ...Basic, ...Layout, ...Form
]
export {
  mixins, components
}
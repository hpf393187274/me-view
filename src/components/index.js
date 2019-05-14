import '@assets/styles/common.less'

import Basic from './basic'
import Layout from './layout'
import Form from './form'
import Tools from './tools'
import mixins from './mixins'

const components = [
  ...Basic, ...Layout, ...Form, ...Tools
]

const innerComponents = [
  ...Basic, ...Layout, ...Form, ...Tools
]
export { mixins, components, innerComponents }
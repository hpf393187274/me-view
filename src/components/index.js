
import Basic from './basic'
import Layout from './layout'
import Form from './form'
import mixins from './mixins'

import config from './config'
const components = [
  ...Basic, ...Layout, ...Form
]
export { mixins, config, components }
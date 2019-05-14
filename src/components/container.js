import '@assets/styles/common.less'

import Basic from './basic'
import Layout from './layout'
import Form from './form'
import Tools from './tools'

import common from '@assets/script/common'
import mixins from './mixins'

export default {
  common, mixins, components: [
    ...Basic, ...Layout, ...Form, ...Tools
  ], innerComponents: [
    ...Basic, ...Layout, ...Form, ...Tools
  ]
}
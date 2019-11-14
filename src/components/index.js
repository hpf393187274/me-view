
import basic from './basic'
import view from './view'
import layout from './layout'
import form from './form'
import mixins from './mixins'

import config from './config'
const components = [
  ...basic, ...view, ...form, ...layout
]
export { mixins, config, components }
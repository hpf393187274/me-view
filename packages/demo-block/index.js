import DemoBlock from './DemoBlock'

DemoBlock.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${DemoBlock.name}`, DemoBlock)
}
export default DemoBlock

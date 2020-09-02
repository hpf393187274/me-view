import DemoBlock from './DemoBlock'

DemoBlock.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${DemoBlock.name}`, DemoBlock)
}
export default DemoBlock

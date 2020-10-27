import Image from './Image'

Image.install = (Vue, { prefix = 'Me' } = {}) => {
  const name = Image.name.replace('-', '')
  Vue.component(`${prefix}${name}`, Image)
}
export default Image

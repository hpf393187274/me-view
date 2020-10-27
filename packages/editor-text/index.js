
import EditorText from './EditorText'

EditorText.install = (Vue, { prefix = 'Me' } = {}) => {
  Vue.component(`${prefix}${EditorText.name}`, EditorText)
}
export default EditorText

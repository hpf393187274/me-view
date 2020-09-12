
import EditorText from './EditorText'

EditorText.install = (Vue, { mePrefix = 'Me' } = {}) => {
  Vue.component(`${mePrefix}${EditorText.name}`, EditorText)
}
export default EditorText

import Dialog from './basal'

let instance

const basal = (options = {}) => {
  instance = instance || Dialog.newInstance({
    closable: false,
    moveable: false,
    closableModal: false
  })
  const __options = Object.assign({
    onRemove() { instance = null }
  }, options)
  return instance.show(__options)
}

Dialog.alert = (options = {}) => {
  return basal(Object.assign({ title: '提示' }, options, {
    type: 'alert', icon: 'icon-info'
  }))
}

Dialog.confirm = (options = {}) => {
  return basal(Object.assign({ title: '确认' }, options, {
    type: 'confirm', icon: 'icon-xunwen'
  }))
}
export default Dialog
import Dialog from './basal'

let dialogInstance

const basal = (options = {}) => {
  dialogInstance = dialogInstance || Dialog.newInstance({
    closable: false,
    moveable: false,
    closableModal: false
  })
  const __options = Object.assign({
    onRemove() { dialogInstance = null }
  }, options)
  return dialogInstance.show(__options)
}

Dialog.alert = (options = {}) => {
  return basal(Object.assign({ title: '提示' }, options, {
    type: 'Alert'
  }))
}

Dialog.confirm = (options = {}) => {
  return basal(Object.assign({ title: '确认' }, options, {
    type: 'Confirm'
  }))
}
export default Dialog
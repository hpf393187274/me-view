import Message from './basal'

let instance
const basal = (options = {}) => {
  instance = instance || Message.newInstance()
  const __options = Object.assign({ onRemove() { instance = null } }, options)
  return instance.show(__options)
}

Message.info = (options = {}) => {
  return basal(Object.assign({}, options, {
    type: 'info', icon: 'icon-info'
  }))
}

Message.success = (options = {}) => {
  return basal(Object.assign({}, options, {
    type: 'success', icon: 'icon-success'
  }))
}
Message.warning = (options = {}) => {
  return basal(Object.assign({}, options, {
    type: 'warning', icon: 'icon-warning'
  }))
}
Message.error = (options = {}) => {
  return basal(Object.assign({}, options, {
    type: 'error', icon: 'icon-error'
  }))
}
Message.loading = (options = {}) => {
  return basal(Object.assign({}, options, {
    type: 'loading', icon: 'icon-loading'
  }))
}
export default Message
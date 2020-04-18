import Message from './basal'
import type from '../../script/Type.class'

let instance
const basal = (options = {}) => {
  if (!options.content) {
    console.warn(`Message type：${options.type} content is null or undefined`)
    return
  }
  instance = instance || Message.newInstance()
  const __options = Object.assign({ onRemove () { instance = null } }, options)
  return instance.show(__options)
}

Message.info = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({}, options, {
    type: 'info', icon: 'icon-info'
  }))
}

Message.success = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({}, options, {
    type: 'success', icon: 'icon-success'
  }))
}
Message.warning = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({}, options, {
    type: 'warning', icon: 'icon-warning'
  }))
}
Message.error = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({}, options, {
    type: 'error', icon: 'icon-error'
  }))
}
Message.loading = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({}, options, {
    type: 'loading', icon: 'icon-loading'
  }))
}

export default Message

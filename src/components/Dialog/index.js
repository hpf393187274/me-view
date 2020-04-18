import Dialog from './basal'
import type from '../../script/Type.class'
let instance

const basal = (options = {}) => {
  instance = instance || Dialog.newInstance({
    closable: false,
    moveable: false,
    closableModal: false
  })
  const __options = Object.assign({
    onRemove () { instance = null }
  }, options)
  return instance.show(__options)
}

Dialog.alert = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({ title: '提示' }, options, {
    type: 'alert', icon: 'icon-info'
  }))
}

Dialog.confirm = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }
  return basal(Object.assign({ title: '确认' }, options, {
    type: 'confirm', icon: 'icon-xunwen'
  }))
}

Dialog.prompt = (options = {}) => {
  if (type.isString(options)) {
    options = { content: options }
  }

  return basal(Object.assign({ title: '输入', height: '220px' }, options, {
    type: 'prompt',
    icon: 'icon-xunwen',
    render (h) {
      const self = this
      return h('div', { class: 'me-flex' }, [
        h('div', { style: { 'margin-bottom': '10px' } }, [ options.content ]),
        h('me-label', { ref: 'label', class: 'me-row me-flex', props: { rules: self.rules } }, [
          h('me-input', {
            domProps: { value: self.value },
            on: {
              change (value) { self.value = value }
            }
          })
        ])
      ])
    }
  }))
}

Dialog.install = Vue => Vue.component(Dialog.name, Dialog)
export default Dialog

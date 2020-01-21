import Vue from 'vue'
import Icon from '@components/basic/Icon'

import Button from '@components/form/button'
import Label from '@components/form/label'
import Input from '@components/form/input'

import Modal from '@components/view/modal'
import Dialog from './Dialog'

import methods from '@components/mixins/methods'

Dialog.newInstance = (options = {}) => {
  const instance = new Vue({
    mixins: [{ methods }],
    components: {
      [Modal.name]: Modal,
      [Button.name]: Button,
      [Icon.name]: Icon,
      [Label.name]: Label,
      [Input.name]: Input
    },
    data () {
      return Object.assign({}, options, {
        width: '416px',
        type: '',
        height: '200px',
        ok: null,
        cancel: null,
        render: null,
        title: '',
        icon: '',
        content: null,
        okText: '确认',
        cancelText: '取消',
        closable: false,
        rules: [],
        value: ''
      })
    },
    methods: {
      show (options = {}) {
        const onRemove = Reflect.get(options, 'onRemove')
        Reflect.deleteProperty(options, 'onRemove')
        for (const key in options) {
          Reflect.set(this, key, Reflect.get(options, key))
        }
        modal.$parent.onRemove = onRemove
      },
      destroy () {
        this.$destroy()
        document.body.removeChild(this.$el)
        this.onRemove()
      },
      onOk () {
        if (this.$refs.label) {
          this.$refs.label.validate(valid => {
            if (valid === true) {
              this.destroy()
              this.ok && this.ok(this.value)
            }
          })
        } else {
          this.destroy()
          this.ok && this.ok(this.value)
        }
      },
      onCancel () {
        this.destroy()
        this.cancel && this.cancel()
      },
      onRemove () { }
    },
    render (h) {
      let renderFooter = []
      if (['prompt', 'confirm'].includes(this.type)) {
        renderFooter.push(
          h('me-button', {
            props: { width: '80px' },
            on: { click: this.onCancel }
          }, this.cancelText)
        )
      }

      renderFooter.push(
        h('me-button', {
          props: { type: 'primary', width: '80px' },
          on: { click: this.onOk }
        }, this.okText)
      )

      const { title, closable, width, height } = this.$data
      return h(Dialog,
        {
          props: { title, width, height, closable, value: true },
          on: { cancel: this.onCancel },
          scopedSlots: { footer: () => renderFooter }
        },
        [
          h('div', { class: 'me-row me-flex' }, [
            h('div', [h('me-icon', { class: 'icon-status' }, this.icon)]),
            this.render ? this.render(h) : h('div', this.content)
          ])
        ]
      )
    }
  })
  window.document.body.appendChild(instance.$mount().$el)
  const modal = instance.$children[0]
  return instance
}
export default Dialog

import Vue from 'vue'
import Icon from '../Icon'

import Button from '../Button'
import Label from '../Label'
import Input from '../Input'

import Modal from '../Modal'
import Dialog from './Dialog'

import methods from '../mixins/methods'

Dialog.newInstance = (options = {}) => {
  const instance = new Vue({
    mixins: [ { methods } ],
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
        render: null,
        title: '',
        icon: '',
        content: null,
        okText: '确认',
        cancelText: '取消',
        closable: false,
        rules: [],
        value: '',
        resolve: undefined,
        reject: undefined
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

        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      destroy () {
        this.$destroy()
        document.body.removeChild(this.$el)
        this.onRemove()
      },
      async handlerOk () {
        try {
          if (this.$refs.label) {
            await this.$refs.label.validate()
          }
          this.destroy()
          this.resolve(this.value)
        } catch (error) {
          console.log(error)
        }
      },
      handlerCancel () {
        this.destroy()
        this.reject('false')
      },
      onRemove () { }
    },
    render (h) {
      const renderFooter = []
      if ([ 'prompt', 'confirm' ].includes(this.type)) {
        renderFooter.push(
          h('me-button', {
            props: { width: '80px' },
            on: { click: this.handlerCancel }
          }, [ this.cancelText ])
        )
      }

      renderFooter.push(
        h('me-button', {
          props: { type: 'primary', width: '80px' },
          on: { click: this.handlerOk }
        }, [ this.okText ])
      )

      const { title, closable, width, height } = this.$data
      return h(Dialog,
        {
          props: { title, width, height, closable, value: true },
          on: { cancel: this.handlerCancel },
          scopedSlots: { footer: () => renderFooter }
        },
        [
          h('div', { class: 'me-row me-flex' }, [
            h('div', [ h('me-icon', { class: 'icon-status' }, this.icon) ]),
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

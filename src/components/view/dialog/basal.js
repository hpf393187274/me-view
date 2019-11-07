import Vue from 'vue'
import Dialog from './Index.vue'
import Button from '@components/form/Button'

Dialog.newInstance = (options = {}) => {
  const dialog = new Vue({
    data() {
      return Object.assign({}, options, {
        width: '416px',
        type: { type: String },
        height: '200px',
        ok: null,
        cancel: null,
        render: null,
        title: '',
        icon: '',
        message: null,
        okText: '确认',
        cancelText: '取消',
        showCancel: false,
        loading: false,
        buttonLoading: false,
        resolve: null,
        reject: null,
        closable: false
      })
    },
    methods: {
      show(options = {}) {
        for (const key in options) {
          Reflect.set(this, key, Reflect.get(options, key))
        }
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      onOk() {
        this.destroy()
        this.ok && this.ok()
      },
      onCancel() {
        this.destroy()
        this.cancel && this.cancel()
      },
      onRemove() { }
    },
    render(h) {
      let renderFooter = []
      if (this.type === 'Confirm') {
        renderFooter.push(
          h(Button, {
            props: { width: '80px' },
            on: { click: this.onCancel }
          }, this.cancelText)
        )
      }

      renderFooter.push(
        h(Button, {
          props: { type: 'primary', width: '80px' },
          on: { click: this.onOk }
        }, this.okText)
      )
      return h(Dialog,
        {
          props: Object.assign({}, this.$data, { value: true }),
          on: {
            cancel: this.onCancel
          },
          scopedSlots: {
            footer: () => renderFooter
          }
        },
        [this.render ? this.render(h) : h('div', this.message)]
      )
    }
  })
  window.document.body.appendChild(dialog.$mount().$el)
  return dialog
}
export default Dialog
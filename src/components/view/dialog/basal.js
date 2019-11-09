import Vue from 'vue'
import Dialog from './Index.vue'
import Button from '@components/form/Button'
import Icon from '@components/basic/Icon'
Dialog.newInstance = (options = {}) => {
  const instance = new Vue({
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
        content: null,
        okText: '确认',
        cancelText: '取消',
        closable: false
      })
    },
    methods: {
      show(options = {}) {


        const onRemove = Reflect.get(options, 'onRemove')
        Reflect.deleteProperty(options, 'onRemove')
        for (const key in options) {
          Reflect.set(this, key, Reflect.get(options, key))
        }
        modal.$parent.onRemove = onRemove;
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
      if (this.type === 'confirm') {
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
          on: { cancel: this.onCancel },
          scopedSlots: { footer: () => renderFooter }
        },
        [
          h('div', {
            class: 'me-row me-flex'
          }, [
            h('div', [h(Icon, { class: this.type }, this.icon)]),
            this.render ? this.render(h) : h('div', this.content)
          ])
        ]
      )
    }
  })
  window.document.body.appendChild(instance.$mount().$el)
  const modal = instance.$children[0];
  return instance
}
export default Dialog
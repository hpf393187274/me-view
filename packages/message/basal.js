import Vue from 'vue'
import Message from './Message'
import Tools from 'me-view/src/script/tools'
Message.newInstance = (options = {}) => {
  const instance = new Vue({
    data () {
      return {
        width: '416px',
        capacity: 10,
        top: '30px',
        ...(options || {})
      }
    },
    methods: {
      show (options = {}) {
        const onRemove = Reflect.get(options, 'onRemove')
        Reflect.deleteProperty(options, 'onRemove')

        const message = this.$refs.message
        if (message) {
          if (message.container.length >= this.capacity) {
            Tools.arrayRemove(message.container, 0)
          }
          message.container.push({ ...options, uniqueValue: Tools.UUId() })
        }

        modal.$parent.onRemove = onRemove
      },
      destroy () {
        this.$destroy()
        document.body.removeChild(this.$el)
        this.onRemove()
      },
      onRemove () { },
      renderMessage (h) {
        return h(Message, {})
      }
    },
    render (h) {
      const { top, width } = this.$data
      return h(Message, {
        ref: 'message',
        props: { value: true, top, width },
        on: {
          destroy: this.destroy
        }
      })
    }
  })
  window.document.body.appendChild(instance.$mount().$el)
  const modal = instance.$children[0]
  return instance
}

export default Message

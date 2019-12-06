import Vue from 'vue'
import Message from './Message'
import { tools } from '@assets/script/common'
Message.newInstance = (options = {}) => {
  const instance = new Vue({
    data() {
      return Object.assign({
        list: []
      }, options, {
        width: '416px',
        capacity: 10,
        top: '30px'
      })
    },
    computed: {
      length() {
        return this.list.length
      }
    },
    methods: {
      show(options = {}) {
        const onRemove = Reflect.get(options, 'onRemove')
        Reflect.deleteProperty(options, 'onRemove')
        if (this.length >= this.capacity) {
          tools.arrayRemove(this.list, 0)
        }

        // Reflect.set(options, 'content', Reflect.get(options, 'content') + '_' + new Date().getTime())
        this.list.push({ ...options, primaryKey: tools.UUId() })
        modal.$parent.onRemove = onRemove;
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      onRemove() { },
      renderMessage(h) {
        return h(Message, {})
      }
    },
    render(h) {
      return h(Message, {
        props: Object.assign({ value: true, list: this.list }, this.$data),
        on: {
          destroy: this.destroy
        }
      })
    }
  })
  window.document.body.appendChild(instance.$mount().$el)
  const modal = instance.$children[0];
  return instance
}
export default Message
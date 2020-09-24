import model from './model'
export default {
  mixins: [ model ],
  props: { value: Object, default () { return {} } }
}

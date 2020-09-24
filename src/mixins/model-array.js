import model from './model'
export default {
  mixins: [ model ],
  props: { value: Array, default () { return [] } }
}

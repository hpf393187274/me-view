export default {
  props: {
    /* 当前节点若存在子集,则是否打开 */
    isOpen: { type: Boolean, default: false }
  },
  data() {
    return {
      stateOpen: this.isOpen,
      firstOpen: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    click({ level }) {
      // 点击级别 与 当前节点级别一致
      if (level === this.level) {
        this.$emit('click', { level, data: this.data })
      }
    },
    dbclick({ level }) {
      // 点击级别 与 当前节点级别一致
      if (level === this.level) {
        this.$emit('dbclick', { level, data: this.data })
      }
    },
    toggle() {
      if (this.nodeBranch) {
        if (this.firstOpen) {
          this.$emit('firstOpen', { data: this.data })
        }
        this.stateOpen = !this.stateOpen
      }
    }
  }
}

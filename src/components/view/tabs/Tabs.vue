
<script>
export default {
  name: 'MeTabs'
  // props: {
  //   type: {
  //     type: String,
  //     validator: function(value) {
  //       return ['card', 'border-card'].findIndex(item => item === value) !== -1
  //     }
  //   },
  //   /**
  //    * 标签是否可关闭
  //    * default：false
  //    */
  //   closable: { type: Boolean, default: false },
  //   /**
  //    * 标签是否可增加
  //    * default：false
  //    */
  //   addable: { type: Boolean, default: false },
  //   /**
  //    * 标签是否同时可增加和关闭
  //    * default：false
  //    */
  //   editable: { type: Boolean, default: false },
  //   /**
  //    * 标签的宽度是否自撑开
  //    * default：false
  //    */
  //   stretch: { type: Boolean, default: false },
  //   /**
  //    * 选项卡所在位置
  //    * default：'top'
  //    */
  //   tabPosition: {
  //     type: String,
  //     validator: function(value) {
  //       return ['top', 'right', 'bottom', 'left'].includes(value)
  //     },
  //     default: 'top'
  //   },
  //   /**
  //    * 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
  //    * type: Function(activeName, oldActiveName)
  //    */
  //   beforeLeave: Function
  // },
  // methods: {
  //   /**
  //    * tab 被选中时触发
  //    * 被选中的标签 tab 实例
  //    */
  //   tabClick(data) {
  //     this.$emit('tab-click', data)
  //   },
  //   /**
  //    * 点击 tab 移除按钮后触发
  //    * 被删除的标签的 name
  //    */
  //   tabRemove(data) {
  //     this.$emit('tab-remove', data)
  //   },
  //   /**
  //    * 点击 tabs 的新增按钮后触发
  //    */
  //   tabAdd(data) {
  //     this.$emit('tab-add', data)
  //   },
  //   /**
  //    * 点击 tabs 的新增按钮或 tab 被关闭后触发
  //    * (targetName, action)
  //    */
  //   edit(data) {
  //     this.$emit('edit', data)
  //   },
  //   calcPaneInstances() {
  //     let slotDefault = this.$scopedSlots.default
  //     if (slotDefault && slotDefault instanceof Function) {
  //       const paneSlots = slotDefault().filter(vnode => {
  //         return (
  //           vnode.tag &&
  //           vnode.componentOptions &&
  //           vnode.componentOptions.tag.includes('tab-pane')
  //         )
  //       })
  //       for (const paneSlot of paneSlots) {
  //         let pane = paneSlot.componentInstance
  //         this.$slots.default = pane.$children[0].$vnode
  //       }
  //       console.log('=============')
  //     }
  //   }
  // },
  // mounted() {
  //   // this.$nextTick(function () {
  //   //   this.calcPaneInstances()
  //   // })
  // }
}
</script>

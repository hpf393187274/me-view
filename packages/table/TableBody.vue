<template>
  <div class="table-body">
    <table border="0" cellpadding="0" cellspacing="0" ref="table">
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
import Tools from 'me-view/src/script/tools'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTableBody',
  mixins: [ emitter ],
  updated () {
    this.monitorScrollBar()
  },
  methods: {
    async monitorScrollBar () {
      await this.$nextTick()
      const hasScrollBar = Tools.hasScrollBar(this.$el)
      console.debug('me-table-body ---- updated ----------------monitorScrollBar--- time=', new Date().getTime())
      this.dispatchUpward('MeTable', 'MeTable--scrollBar', hasScrollBar)
    }
  }
}
</script>

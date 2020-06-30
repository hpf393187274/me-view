<template>
  <div class="me-tabs">
    <div class="tabs-title-wrap" :class="[`tabs-title-${mode}`]">
      <me-tab-title :closable="analyzeClosable(item)" v-for="item in paneList" :key="item.name" :name="item.name">{{item.title}}</me-tab-title>
    </div>
    <slot />
    <div class="me-empty" v-show="paneList.length === 0">暂无页签</div>
  </div>
</template>
<script>
import Tools from 'me-view/src/script/tools'
import TabTitle from './TabTitle'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTabs',
  mixins: [ emitter ],
  components: { [TabTitle.name]: TabTitle },
  props: {
    active: String,
    addable: Boolean,
    closable: { type: Boolean, default: true },
    mode: { type: String, default: 'line', validator: value => [ 'line', 'card' ].includes(value) },
    data: { type: Array, default () { return [] } }
  },
  data () {
    return {
      paneList: [],
      nodeActive: null
    }
  },
  created () {
    this.handlerEvents()
  },
  async mounted () {
    if (!this.active) {
      setTimeout(() => {
        if (!this.panelActivate) {
          const [ first ] = this.paneList
          this.nodeActive = first
        }
      }, 200)
    }
  },
  watch: {
    nodeActive (newValue, oldValue) {
      if (newValue) {
        console.debug(`watch.nodeActive --- ${newValue.title}`)
        newValue.nodeTitle.setActivated(true)
        newValue.nodePane.setActivated(true)
      }
      if (oldValue) {
        oldValue.nodeTitle.setActivated(false)
        oldValue.nodePane.setActivated(false)
      }
    },
    active (value) {
      this.activeTabPane({ name: value, title: value })
    },
    size () { return this.paneList.length }
  },
  methods: {
    openTabPane ({ name, title, src } = {}, { active = true, refresh = true } = {}) {

    },
    removeTabPane () {
    },
    activeTabPane (item) {
      this.nodeActive = this.paneList.find(this.handlerCompare(item))
    },
    refreshTabPane () {
    },
    analyzeClosable ({ closable }) {
      return Tools.isEmpty(closable) ? this.closable : closable
    },
    /**
     * 处理自定义激活
     */
    handlerActiveCustom (target) {
      const { name, title, activated } = target
      if (Tools.notBlank(this.active) && Tools.notEmpty(this.nodeActive)) {
        if (this.active === name || this.active === title) {
          this.nodeActive = target
        }
        return
      }
      if (activated === true) {
        this.nodeActive = target
      }
    },
    handlerCompare (item) {
      return ({ name, title }) => name === item.name || title === item.title
    },
    handlerEvents () {
      this.listener('tab-pane-add', item => {
        const target = this.paneList.find(this.handlerCompare(item))
        if (target) {
          if (!target.nodePane) {
            Reflect.set(target, 'nodePane', item.nodePane)
          }
          this.handlerActiveCustom(target)
        } else {
          this.paneList.push(item)
        }
      })
      this.listener('tab-title-add', item => {
        console.debug('--------------------------------')
        const target = this.paneList.find(this.handlerCompare(item))
        if (target && !target.nodeTitle) {
          Reflect.set(target, 'nodeTitle', item.nodeTitle)
        } else {
          this.paneList.push(item)
        }
        this.handlerActiveCustom(target || item)
      })
      this.listener('tab-pane-remove', item => {
        this.$emit('tab-close', item)
      })
      this.listener('tab-click', item => {
        this.activeTabPane(item)
      })
      this.listener('tab-close', item => {
        let indexActive = Tools.arrayRemove(this.paneList, this.handlerCompare(item))
        if (indexActive > -1) {
          const { name, title } = item
          this.$emit('tab-remove', { name, title })
          if (this.size === indexActive) {
            indexActive = this.size - 1
          }
          this.nodeActive.nodePane.setRendered(false)
          const newActive = this.paneList[indexActive]
          if (newActive) {
            this.nodeActive = this.paneList[indexActive]
          } else {
            this.nodeActive = null
          }
        }
      })
    }
  }
}
</script>

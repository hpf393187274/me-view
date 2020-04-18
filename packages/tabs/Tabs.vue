
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
import tools from 'me-view/src/script/Tools.class'
import TabTitle from './TabTitle'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTabs',
  mixins: [ emitter ],
  components: { [TabTitle.name]: TabTitle },
  props: {
    active: String,
    addable: Boolean,
    closable: { type: Boolean, default: null },
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
    size () { return this.paneList.length }
  },
  methods: {
    analyzeClosable ({ closable }) {
      if (closable === null || closable === undefined) {
        return this.closable
      }
      return closable
    },
    /**
     * 处理自定义激活
     */
    handlerActiveCustom (target) {
      const { nodePane, nodeTitle, name } = target
      if (this.active && nodePane && nodeTitle && this.active === name) {
        // 设置自定义激活
        this.nodeActive = target
      }
    },
    handlerCompare (item) {
      return ({ name }) => name === item.name
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
        const target = this.paneList.find(this.handlerCompare(item))
        if (target) {
          if (!target.nodeTitle) {
            Reflect.set(target, 'nodeTitle', item.nodeTitle)
          }
          this.handlerActiveCustom(target)
        } else {
          this.paneList.push(item)
        }
      })
      this.listener('tab-click', item => {
        this.nodeActive = this.paneList.find(this.handlerCompare(item))
      })
      this.listener('tab-close', item => {
        let indexActive = tools.arrayRemove(this.paneList, this.handlerCompare(item))
        if (indexActive > -1) {
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

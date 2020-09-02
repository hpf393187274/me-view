<template>
  <div class="me-column me-tree" style="overflow: auto;">
    <tree-header
      :action="action"
      :checkbox="checkbox"
      :checked="checkedAll"
      :checked-number="checkedNumber"
      :checkedHalf="checkedHalf"
      :disabled="nodeNumber === 0"
      :header-label="headerLabel"
      :lazy="lazy"
      :indent-size="indentSize"
      :expandable="expandable"
      :nodeNumber="nodeNumber"
      :statistics="statistics"
      :parent-grandson="parentGrandson__"
      @click="handlerNodeCheck"
      class="node-header"
      v-if="header"
    >
      <slot name="node-header-label" slot="node-header-label" />
      <slot name="node-header" slot="node-header" />
    </tree-header>
    <template v-if="nodeNumber > 0">
      <div style="overflow: auto;">
        <tree-node
          :action="action"
          :checkbox="checkbox"
          :checked="checkedChildren"
          :checked-strictly="checkedStrictly"
          :data="node"
          :expandable="expandable"
          :expanded-all="expandedAll"
          :expanded-level="expandedLevel"
          :click-expanded="clickExpanded"
          :click-checked="clickChecked"
          :key="uniqueValue(node)"
          :lazy="lazy"
          :indent-size="indentSize"
          :checkbox-width = "checkboxWidth"
          :parent-grandson="parentGrandson__"
          :statistics="statistics"
          :highlight="highlight"
          :field-value="fieldValue"
          :field-label="fieldLabel"
          v-for="node in data"
        >
          <slot :data="data" name="node-label" slot="node-label" />
        </tree-node>
      </div>
    </template>
    <div class="me-empty" v-else>暂无数据</div>
  </div>
</template>

<script>
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
import TreeCommon from './tree-common'
import TreeProp from './tree-prop'
import emitter from 'me-view/src/mixins/emitter'
import TreeHeader from './TreeHeader'
import TreeNode from './TreeNode'
export default {
  name: 'Tree',
  mixins: [ TreeCommon, TreeProp, emitter ],
  components: {
    [TreeHeader.name]: TreeHeader,
    [TreeNode.name]: TreeNode
  },
  props: {
    data: { type: Array, default () { return [] } },
    headerLabel: String,
    header: Boolean
  },
  data () {
    return {
      nodesMap: new Map(),
      clickNode: undefined,
      nodesSize: 0,
      indentSize: 0,
      checkboxWidth: 0,
      checkedChildren: false
    }
  },
  computed: {
    /**
     * 获取当前节点的子节点个数
     */
    nodeNumber () {
      /* 获取当前节点的子节点数 */
      return Type.isArray(this.data) ? this.data.length : 0
    }
  },
  watch: {
    data () {
      this.layout()
    }
  },
  created () {
    this.nodesMap.clear()
    this.listener('notification-parent', this.handlerChildrenNotification)
    this.listener('me-tree--clear', () => {
      for (const item of [ ...this.data ]) {
        this.removeNode(this.uniqueValue(item))
      }
    })
    this.listenerUpward([ 'Dialog', 'Combo' ], 'me-attribute--visible-true', () => {
      this.layout()
    })

    this.listener('me-tree-node--click', node => {
      console.debug('me-tree-node--click ---> node, ', node.data)
      if (Tools.notEmpty(this.clickNode)) {
        console.debug('me-tree-node--click ---> clickNode =', this.clickNode.data)
        this.clickNode.statusHighlight = false
      }
      this.clickNode = node
    })

    this.listener('me-tree-node--remove', key => {
      if (Tools.isBlank(key)) { return }
      const target = this.nodesMap.get(key)
      const { component } = target || {}
      if (Tools.isEmpty(component)) { return }
      const name = component?.$options?.name
      const parent = component.$parent
      if (Tools.isEmpty(parent)) { return }
      const parentName = parent?.$options?.name
      if ([ 'Tree', 'TreeNode' ].includes(parentName) === false) { return }
      const data = parent?.data // 组件当前数据
      const children = (parentName === 'Tree' ? data : data?.children) || []
      if (name === 'TreeNode') {
        component.handlerNodeCheck(false)
      }
      const index = Tools.arrayRemove(children, item => this.uniqueValue(item) === key)
      if (index !== -1) {
        this.dispatch('me-tree-map--remove', key)
      }
    })

    this.listener('me-tree-map--append', ({ key, value }) => {
      this.nodesMap.set(key, value)
      this.refreshSize()
    })
    this.listener('me-tree-map--remove', key => {
      this.nodesMap.delete(key)
      this.refreshSize()
    })
  },
  mounted () {
    this.layout()
  },
  methods: {
    async layout () {
      await this.$nextTick()
      const meIcon = this.$el.querySelector('.me-icon')
      if (meIcon) {
        this.indentSize = meIcon.getBoundingClientRect().width
      }
      const meCheckbox = this.$el.querySelector('.me-checkbox')
      if (meCheckbox) {
        this.checkboxWidth = meCheckbox.getBoundingClientRect().width
      }
    },
    refreshSize () {
      this.nodesSize = this.nodesMap.size
    },
    clearChecked () {
      this.setChecked(null, false, true)
    },
    setChecked (target, checked = false, deep = false) {
      if (Tools.isBlank(target)) {
        return this.handlerNodeCheck(checked, deep)
      }
      const uniqueValue = Type.isObject(target) ? this.uniqueValue(target) : target
      const targetNode = this.nodesMap.get(uniqueValue)
      if (targetNode && targetNode.component) {
        targetNode.component.handlerNodeCheck(checked, deep)
      }
    },
    removeNode (value) {
      this.dispatch('me-tree-node--remove', value)
    },
    removeCheckedNode () {
      const checkedData = this.getCheckedData()
      if (Type.isArray(checkedData)) {
        for (const item of checkedData) {
          this.removeNode(this.uniqueValue(item))
        }
      }
    },
    getCheckedData ({ leaf = false, callback } = {}) {
      const result = []
      this.nodesMap.forEach(value => {
        const { data, component } = value
        if (component.isCheckedAll()) {
          if (callback) {
            if (callback(data) === true) {
              result.push(data)
            }
          } else {
            result.push(data)
          }
        }
      })
      return result
    },
    getCheckedTreeData ({ leaf = true } = {}) {
      return this.getCheckedChildren({ leaf, tree: true })
    }
  }
}
</script>

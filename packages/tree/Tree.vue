<template>
  <div class="me-column me-tree" style="overflow: auto;">
    <me-tree-header
      :action="action"
      :checkbox="checkbox"
      :checked="checkedAll"
      :checked-number="checkedNumber"
      :checkedHalf="checkedHalf"
      :disabled="nodeNumber === 0"
      :header-label="headerLabel"
      :lazy="lazy"
      :expandable="expandable"
      :nodeNumber="nodeNumber"
      :statistics="statistics"
      :parent-grandson="parentGrandson__"
      @click="handlerNodeCheck"
      class="node-header"
      v-if="header"
    >
      <template #node-header>
        <slot name="node-header" />
      </template>
    </me-tree-header>
    <template v-if="nodeNumber > 0">
      <div style="overflow: auto;">
        <me-tree-node
          :action="action"
          :checkbox="checkbox"
          :checked="checkedChildren"
          :checked-strictly="checkedStrictly"
          :data="node"
          :expandable="expandable"
          :expanded-all="expandedAll"
          :expanded-level="expandedLevel"
          :expanded-node-click="expandedNodeClick"
          :key="uniqueValue(node)"
          :lazy="lazy"
          :parent-grandson="parentGrandson__"
          :statistics="statistics"
          :field-value="fieldValue"
          :field-label="fieldLabel"
          v-for="node in data"
        >
          <template #node-label="{data}">
            <slot :data="data" name="node-label" />
          </template>
        </me-tree-node>
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
  name: 'MeTree',
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
      nodesSize: 0,
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
  created () {
    this.nodesMap.clear()
    this.listener('notification-parent', this.handlerChildrenNotification)
    this.listener('me-tree--clear', () => {
      const newData = [ ...this.data ]
      for (const item of newData) {
        this.removeNode(this.uniqueValue(item))
      }
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
      if ([ 'MeTree', 'MeTreeNode' ].includes(parentName) === false) { return }
      const data = parent?.data // 组件当前数据
      const children = (parentName === 'MeTree' ? data : data?.children) || []
      if (name === 'MeTreeNode') {
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
  methods: {
    refreshSize () {
      this.nodesSize = this.nodesMap.size
    },
    clearChecked () {
      this.setChecked(null, false, true)
    },
    setChecked (target, checked = false, deep = false) {
      if (Tools.isBlank(target)) {
        return this.handlerNodeCheck(checked)
      }
      const uniqueValue = Type.isObject(target) ? this.uniqueValue(target) : target
      const targetNode = this.nodesMap.get(uniqueValue)
      if (targetNode && targetNode.component) {
        targetNode.component.handlerNodeCheck(checked)
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

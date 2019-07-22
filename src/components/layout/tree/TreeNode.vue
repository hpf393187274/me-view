<template>
  <div class="me-column tree-node-body">
    <div :style="styleIndent" class="me-row tree-node-item">
      <me-icon @click="doExpanded" v-if="expandable && nodeBranch">{{iconExpanded}}</me-icon>
      <me-checkbox :checkedHalf="checkedHalf" :value="allChecked" @click="clickCheckbox(!allChecked)" v-if="checkbox" />
      <div @click="onClickLabel" class="me-row me-flex tree-node-label">
        <slot :data="getData()" name="node-label">{{data.label}}</slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber!==0">
        <span>{{allCheckedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div class="em-center tree-node-action" v-if="action">
        <me-link @click="removeCurrentNode">移除</me-link>
        <me-link @click="refreshChildrenNode" v-if="lazy">刷新</me-link>
      </div>
    </div>
    <div class="tree-node-children" v-if="renderFirst" v-show="expanded__">
      <me-tree-node
        :action="action"
        :checkbox="checkbox"
        :checked="checkedChildren || data.checked === true"
        :checked-directly="checkedDirectly"
        :checked-strictly="checkedStrictly"
        :data="node"
        :expandable="expandable"
        :expanded-all="expandedAll"
        :expanded-level="expandedLevel"
        :expanded-node-click="expandedNodeClick"
        :indent="indent__ + 1"
        :key="node[nodeKey]"
        :lazy="lazy"
        :level=" level + 1 "
        :statistics="statistics"
        @alter-parent="alterParent"
        ref="treeNode"
        v-for="node in data.children"
      >
        <template #node-label="{data}">
          <slot :data="data" name="node-label" />
        </template>
      </me-tree-node>
    </div>
  </div>
</template>

<script>
import treeIndex from '@components/mixins/tree'
import treeCommon from '@components/mixins/tree/common'
import treeInner from './common.mixin'
import EventTree from './EventTree'
export default {
  name: 'MeTreeNode',
  mixins: [treeCommon, treeIndex, treeInner],
  props: {
    data: { type: Object, default() { return {} } },
    level: { type: Number, default: 1 }
  },
  created() {
    this.renderFirst = this.nodeBranch && (this.expandable === false || this.expandedAll || this.expandedLevel >= this.level)
  },
  watch: {
    checked(newValue) {
      this.checkedChildren = newValue
      this.setAllChecked(newValue)
    }
  },
  data() {
    return {
      expanded__: this.expandable === false || this.expandedAll || this.expandedLevel >= this.level,
      /**
       * 第一次渲染
       */
      renderFirst: false
    }
  },
  computed: {
    iconExpanded() {
      return this.expanded__ ? 'icon-sort-down' : 'icon-caret-right'
    },
    nodeLeaf() {
      /* 判断当前节点是否为最后一个节点 */
      return this.nodeNumber === 0
    },
    nodeBranch() {
      return this.nodeNumber > 0
    },
    styleIndent() {
      return {
        'padding-left': `${this.indent__}rem`
      }
    },
    indent__() {
      if (this.expandable && this.nodeLeaf) { return this.indent + 1 }
      return this.indent
    }
  },
  methods: {
    /**
    * 点击 Checkbox
    * @param {Booelan} value 变更后的Checkbox 状态
    */
    clickCheckbox(value) {
      this.setAllChecked(value)
      this.$emit('alter-parent')
      this.alterChildrenNodeChecked(value)
    },

    /**
    * 获取节点数据
    */
    getData({ deep = false, exclude = ['children'] } = {}) {
      return this.$tools.clone(this.data, { deep, exclude })
    },
    /**
     * 移除当前节点
     */
    removeCurrentNode() {
      this.$parent.removeChildrenNode(this)
      EventTree.$emit('remove-node', this.getData())
    },
    /**
     * 刷新子节点
     */
    refreshChildrenNode() {
      EventTree.$emit('refresh-node', this.getData(), this)
    },

    /**
     * 展开子节点
     */
    doExpanded() {
      if (this.expandable === false) { return }
      this.expanded__ = !this.expanded__
      if (this.renderFirst === false) {
        this.renderFirst = true
        this.alterChildrenNodeChecked(this.allChecked)
      }
    },

    /**
     * 获取子节点个数
     */
    getChildrenNodeNumber() { return this.nodeNumber },
    /**
     * 获取选中的叶子节点数据
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedData({ filter, ...param } = {}) {
      const list = []
      if (this.nodeLeaf) {
        const resource = this.getData()
        list.push(this.$type.isFunction(filter) ? filter(resource) : resource)
      }
      list.push(...this.getCheckedChildren({ filter, ...param }))
      return list
    },
    /**
     * 获取选中的数据(TreeData)
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedTreeData({ ...param } = {}) {
      if (this.allChecked) {
        return this.getData({ deep: true })
      }
      const resource = this.getData()
      const childrenList = this.getCheckedChildren({ ...param })
      if (childrenList.length !== 0) {
        resource.children = [...childrenList]
      }
      return resource
    },
    onClickLabel() {
      if (this.nodeBranch && this.expandedNodeClick) {
        this.doExpanded()
      }
      const data = this.getData()
      this.handlerClickNode(data, this)
      if (this.nodeLeaf) {
        this.handlerClickNodeLeaf(data, this)
      }
      if (this.nodeBranch) {
        this.handlerClickNodeBranch(data, this)
      }
    },
    handlerClickNode(data, node) {
      EventTree.$emit('click-node', data, node)
    },
    handlerClickNodeBranch(data, node) {
      EventTree.$emit('click-node-branch', data, node)
    },
    handlerClickNodeLeaf(data, node) {
      EventTree.$emit('click-node-leaf', data, node)
    }
  }
}

</script>

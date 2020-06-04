<template>
  <div class="tree-node-body">
    <div :style="styleIndent" :title="nodeLabel" class="me-row tree-node-item">
      <me-icon @click="doExpanded" v-if="expandable && nodeBranch">{{iconExpanded}}</me-icon>
      <me-checkbox :checkedHalf="checkedHalf" :value="checkedAll" @click="handlerNodeCheck" v-if="checkbox" />
      <div @click="handlerClickLabel" class="me-row me-flex me-cross-center tree-node-label">
        <slot :data="data" name="node-label">
          <span class="tree-label-inner">{{nodeLabel}}</span>
        </slot>
      </div>
      <div class="tree-node-statistics" v-if="statistics && nodeNumber!==0">
        <span>{{checkedNumber}}</span>
        <span>/</span>
        <span>{{nodeNumber}}</span>
      </div>
      <div class="em-center tree-node-action" v-if="action">
        <me-link @click="removeCurrentNode">移除</me-link>
        <me-link @click="handlerEvent('refresh-node')" v-if="lazy">刷新</me-link>
      </div>
    </div>
    <div class="tree-node-children" v-if="renderFirst" v-show="expanded__">
      <me-tree-node
        :action="action"
        :checkbox="checkbox"
        :checked-strictly="checkedStrictly"
        :data="node"
        :expandable="expandable"
        :expanded-all="expandedAll"
        :expanded-level="expandedLevel"
        :expanded-node-click="expandedNodeClick"
        :indent="indent__"
        :key="uniqueValue(node)"
        :lazy="lazy"
        :level="level + 1"
        :field-value="fieldValue"
        :field-label="fieldLabel"
        :statistics="statistics"
        :parent-grandson="parentGrandson__"
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
import Type from 'me-view/src/script/type'
import Tools from 'me-view/src/script/tools'
import TreeCommon from './tree-common'
import TreeProp from './tree-prop'
import emitter from 'me-view/src/mixins/emitter'
export default {
  name: 'MeTreeNode',
  mixins: [ TreeCommon, TreeProp, emitter ],
  props: {
    data: { type: Object, default () { return {} } },
    parentGrandson: Boolean,
    indent: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
  },
  created () {
    this.renderFirst = this.nodeBranch && (this.expandable === false || this.expandedAll || this.expandedLevel >= this.level)

    this.listenerParent('broadcast-children', value => {
      this.setCheckedAll(value)
      this.dispatch('broadcast-children', value)
    })

    this.listener('notification-parent', this.handlerChildrenNotification)
  },
  async mounted () {
    await this.$nextTick()
    this.dispatchUpward('MeTree', 'me-tree-map--append', {
      key: this.uniqueValue(this.data),
      value: { data: this.data, component: this }
    })
  },
  beforeDestroy () {
    this.dispatchUpward('MeTree', 'me-tree-map--remove', this.uniqueValue(this.data))
  },
  data () {
    return {
      expanded__: this.expandable === false || this.expandedAll || this.expandedLevel >= this.level,
      /**
       * 第一次渲染
       */
      renderFirst: false
    }
  },
  computed: {
    nodeLabel () {
      return Reflect.get(this.data, this.fieldLabel)
    },
    iconExpanded () {
      return this.expanded__ ? 'icon-triangle_fill_down' : 'icon-triangle_fill_right'
    },
    nodeLeaf () {
      /* 判断当前节点是否为最后一个节点 */
      return this.nodeNumber === 0
    },
    nodeBranch () {
      return this.nodeNumber > 0
    },
    styleIndent () {
      return {
        'padding-left': `${this.indent__ * 16}px`
      }
    },
    indent__ () {
      if (this.expandable === false) {
        return this.level === 1 ? this.indent : this.indent + 1
      }
      const indent = this.level === 1 ? this.indent : this.indent + 1
      if (this.parentGrandson) {
        return this.nodeNumber === 0 ? indent + 1 : indent
      }
      if (this.level === 1) {
        return indent
      }
      return this.nodeNumber === 0 ? indent + 1 : indent
    },
    /**
     * 获取当前节点的子节点个数
     */
    nodeNumber () {
      /* 获取当前节点的子节点数 */
      return Type.isArray(this.children) ? this.children.length : 0
    }
  },
  methods: {
    /**
    * 获取节点数据
    */
    getData ({ deep = false, exclude = [ 'children' ] } = {}) {
      return Tools.clone(this.data, { deep, exclude })
    },
    /**
     * 移除当前节点
     */
    removeCurrentNode () {
      const uniqueValue = this.uniqueValue(this.data)
      this.dispatchUpward('MeTree', 'me-tree-node--remove', uniqueValue)
      this.handlerEvent('remove')
    },
    /**
     * 展开子节点
     */
    doExpanded () {
      if (this.expandable === false) { return }
      this.expanded__ = !this.expanded__
      if (this.renderFirst === false) {
        this.renderFirst = true
      }
    },
    /**
     * 获取子节点个数
     */
    getChildrenNodeNumber () { return this.nodeNumber },
    /**
     * 获取选中的叶子节点数据
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedData ({ filter, ...param } = {}) {
      const list = []
      if (this.nodeLeaf) {
        const resource = this.getData()
        list.push(Type.isFunction(filter) ? filter(resource) : resource)
      }
      list.push(...this.getCheckedChildren({ filter, ...param }))
      return list
    },
    /**
     * 获取选中的数据(TreeData)
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedTreeData ({ ...param } = {}) {
      if (this.checkedAll) {
        return this.getData({ deep: true })
      }
      const resource = this.getData()
      const childrenList = this.getCheckedChildren({ ...param })
      if (childrenList.length !== 0) {
        resource.children = [ ...childrenList ]
      }
      return resource
    },
    handlerClickLabel () {
      if (this.nodeBranch && this.expandedNodeClick) {
        this.doExpanded()
      }
      this.handlerEvent('click')
      if (this.nodeLeaf) {
        this.handlerEvent('click-leaf')
      }
      if (this.nodeBranch) {
        this.handlerEvent('click-branch')
      }
    },
    handlerEvent (eventName) {
      this.dispatchUpward('MeTree', eventName, { data: this.getData(), node: this })
    }
  }
}

</script>

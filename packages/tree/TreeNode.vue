<template>
  <div class="tree-node-body" >
    <div :style="styleIndent" :title="nodeLabel" :class="classes">
      <me-icon style="width: 13px;" @click="handlerExpanded" v-if="expandable && nodeBranch">{{iconExpanded}}</me-icon>
      <me-checkbox :checkedHalf="checkedHalf" :value="checkedAll" @click="handlerClickNode" v-if="checkbox" />
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
      <tree-node
        :action="action"
        :checkbox="checkbox"
        :checked-strictly="checkedStrictly"
        :data="node"
        :expandable="expandable"
        :expanded-all="expandedAll"
        :expanded-level="expandedLevel"
        :click-expanded="clickExpanded"
        :click-checked="clickChecked"
        :indent="indent__"
        :indent-size="indentSize"
        :checkbox-width = "checkboxWidth"
        :key="uniqueValue(node)"
        :lazy="lazy"
        :level="level + 1"
        :highlight="highlight"
        :field-value="fieldValue"
        :field-label="fieldLabel"
        :statistics="statistics"
        :grandson="grandson__"
        v-for="node in data.children"
      >
        <slot :data="data" name="node-label" slot="node-label" slot-scope="{data}"/>
      </tree-node>
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
  name: 'TreeNode',
  mixins: [ TreeCommon, TreeProp, emitter ],
  props: {
    data: { type: Object, default () { return {} } },
    grandson: Boolean,
    indent: { type: Number, default: 0 },
    indentSize: { type: Number, default: 16 },
    checkboxWidth: { type: Number, default: 16 },
    level: { type: Number, default: 1 }
  },
  created () {
    this.initRenderFirst()
    this.initExpanded()
    this.listenerParent('broadcast-children', checked => {
      this.setCheckedAll(checked)
      this.dispatch('broadcast-children', checked)
    })
    this.uniqueKey = this.uniqueValue(this.data)

    this.listener('notification-parent', this.handlerChildrenNotification)
  },
  async mounted () {
    await this.$nextTick()
    this.dispatchUpward('Tree', 'me-tree-map--append', {
      key: this.uniqueValue(this.data),
      value: { data: this.data, component: this }
    })
  },
  beforeDestroy () {
    this.dispatchUpward('Tree', 'me-tree-map--remove', this.uniqueValue(this.data))
  },
  watch: {
    checkedAll (value) {
      this.dispatchUpward('Tree', `me-tree-node--checked-${value}`, { key: this.uniqueKey, target: this })
    },
    checkedHalf (value) {
      this.dispatchUpward('Tree', `me-tree-node--indeterminate-${value}`, { key: this.uniqueKey, target: this })
    }
  },
  data () {
    return {
      expanded__: false,
      uniqueKey: '',
      statusHighlight: false,
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
        'padding-left': `${this.indent__ * this.indentSize}px`
      }
    },
    indent__ () {
      if (this.expandable === false) {
        return this.level === 1 ? this.indent : this.indent + 1
      }
      const indent = this.level === 1 ? this.indent : this.indent + 1
      if (this.grandson) {
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
    },
    classes () {
      return [
        'me-row tree-node-item',
        { 'is-selected': this.highlight && (this.checkedAll || this.statusHighlight) }
      ]
    }
  },
  methods: {
    initExpanded () {
      if (this.checkbox === true) {
        this.setExpanded(true)
      }
      this.setExpanded(this.expandable === false || this.expandedAll || this.expandedLevel >= this.level)
    },
    setExpanded (value) {
      this.expanded__ = value
    },
    initRenderFirst () {
      if (this.checkbox === true) {
        return (this.renderFirst = true)
      }
      if (this.nodeBranch === true) {
        this.renderFirst = this.expandable === false || this.expandedAll || this.expandedLevel >= this.level
      }
    },
    /**
    * 获取节点数据
    */
    getData ({ deep = false, exclude = [ 'children' ], clone = true } = {}) {
      if (clone === true) {
        return Tools.clone(this.data, { deep, exclude })
      }
      return this.data
    },
    /**
     * 移除当前节点
     */
    removeCurrentNode () {
      const uniqueValue = this.uniqueValue(this.data)
      this.dispatchUpward('Tree', 'me-tree-node--remove', uniqueValue)
      this.handlerEvent('remove')
    },
    /**
     * 展开子节点
     */
    handlerExpanded () {
      if (this.expandable === false) { return }
      this.setExpanded(!this.expanded__)
      if (this.renderFirst === false) {
        this.renderFirst = true
      }
    },
    /**
     * 获取子节点个数
     */
    getChildrenNodeNumber () { return this.nodeNumber },
    /**
     * 获取选中的数据(TreeData)
     * @param {Boolean} param.leaf 是否包含叶子节点：默认：true
     */
    getCheckedTreeData ({ ...param } = {}) {
      const resource = this.getData()
      const childrenList = this.getCheckedChildren({ ...param })
      if (childrenList.length !== 0) {
        resource.children = [ ...childrenList ]
      }
      return resource
    },
    handlerClickLabel () {
      if (this.nodeBranch && this.clickExpanded) {
        this.handlerExpanded()
      }
      this.statusHighlight = !this.statusHighlight
      this.dispatchUpward('Tree', 'me-tree-node--click', this)
      this.handlerEvent('click')
      if (this.nodeLeaf) {
        this.handlerEvent('click-leaf')
      }
      if (this.nodeBranch) {
        this.handlerEvent('click-branch')
      }
    },
    handlerEvent (eventName) {
      this.dispatchUpward('Tree', eventName, { data: this.getData(), node: this })
    }
  }
}

</script>

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
      :grandson="grandson__"
      @click="handlerClickNode"
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
          :grandson="grandson__"
          :statistics="statistics"
          :highlight="highlight"
          :field-value="fieldValue"
          :field-label="fieldLabel"
          v-for="node in data"
        >
          <slot :data="data" name="node-label" slot="node-label" slot-scope="{data}"/>
        </tree-node>
      </div>
    </template>
    <div class="me-empty" v-else>暂无数据</div>
  </div>
</template>

<script>
import { Type, Assert, Tools } from 'me-view/src/script/index'
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
      checkedNodeMap: {},
      indeterminateNodeMap: {},
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
    this.listener('me-tree-node--checked-true', ({ key, target }) => {
      this.$set(this.checkedNodeMap, key, target)
    })
    this.listener('me-tree-node--checked-false', ({ key }) => {
      this.$delete(this.checkedNodeMap, key)
    })

    this.listener('me-tree-node--indeterminate-true', ({ key, target }) => {
      this.$set(this.indeterminateNodeMap, key, target)
    })
    this.listener('me-tree-node--indeterminate-false', ({ key }) => {
      this.$delete(this.indeterminateNodeMap, key)
    })

    this.listener('notification-parent', this.handlerChildrenNotification)
    this.listener('me-tree--clear', () => {
      for (const item of [ ...this.data ]) {
        this.removeNode(this.uniqueValue(item))
      }
    })
    this.listenerUpward([ 'Dialog', 'Combo' ], 'me-attribute--visible-true', () => this.layout())

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
    /**
     * 批量设置多个节点选中
     * @param {String} key 主键，唯一键
     * @param {Boolean} checked 设置选中状态
     */
    setBatchChecked (keyList, checked = false) {
      Assert.isArray(keyList, '第一个参数必须为数组')
      this.handlerClickNode(false/** 调用点击事件，清空状态 */)
      for (const key of keyList) {
        this.setChecked(key, checked, false)
      }
    },
    /**
     * 设置某个节点选中
     * @param {String} key 主键，唯一键
     * @param {Boolean} checked 设置选中状态
     * @param {Boolean} clear 是否清空状态
     */
    setChecked (key, checked = false, clear = true) {
      Assert.notBlank(key, '第一个参数不能为空')
      if (clear === true) {
        this.handlerClickNode(false/** 调用点击事件，清空状态 */)
      }
      if (checked === false) { return }
      const targetNode = this.nodesMap.get(key)
      if (targetNode && targetNode.component) {
        targetNode.component.handlerNodeCheck(checked)
      }
    },
    removeNode (value) {
      this.dispatch('me-tree-node--remove', value)
    },
    removeCheckedNode () {
      const checkedData = this.getCheckedData({ checked: true })
      if (Type.isArray(checkedData)) {
        for (const item of checkedData) {
          this.removeNode(this.uniqueValue(item))
        }
      }
    },
    /**
     * 获取选中的数据
     * @param {Boolean} param.leaf 只需要叶子节点
     * @param {Boolean} param.checked 只需要严格选中节点
     */
    getCheckedData ({ leaf = false, checked = false } = {}) {
      const result = []
      for (const key in this.checkedNodeMap) {
        const node = Reflect.get(this.checkedNodeMap, key)
        if (leaf === false) {
          result.push(node.getData())
          continue
        }
        if (node.isLeaf()) {
          result.push(node.getData())
        }
      }
      if (checked === false && leaf === false) {
        for (const key in this.indeterminateNodeMap) {
          const node = Reflect.get(this.indeterminateNodeMap, key)
          result.push(node.getData())
        }
      }
      return result
    },
    getCheckedTreeData () {
      return this.getCheckedChildren()
    }
  }
}
</script>

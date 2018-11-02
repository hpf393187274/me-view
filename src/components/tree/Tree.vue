<!--
  Tree 使用说明及参数
  props: {
    /* 当前节点若存在子集,则是否打开 */
    configOpen: { type: Boolean, default: false },
    /* 是否存在复选框 */
    configCheckbox: { type: Boolean, default: false },
    /* 是否默认选中 */
    configChecked: { type: Boolean, default: false },
    /* 缩进 ，默认 2 em */
    configRetract: { type: Number, default: 1 },
    retract: { type: Number, default: 0 },

    /* tree 名称，默认无名 */
    name: { type: String, default: '' },
    data:{
      text: '一级 1',
      nodes: [
        {
          text: '二级 1.1',
          nodes: [
            { text: '三级 1.1.1', route: { path: 'http://www.baidu.com' } },
            { text: '三级 1.1.2', route: { path: 'http://www.baidu.com' } }
          ]
        },
        { text: '二级 2.1', route: { path: 'http://www.baidu.com' } }
      ]
    }
  }
-->
<template>
  <div class="tree">
    <div class="tree-head"><slot name="tree-head"/></div>
    <div class="node">
      <div 
        :class='["node-trunk",{ selectLast: nodeLeaf }]' 
        :style="{paddingLeft: (retract * (level-1)) + 'em'}" >
        <slot name="node-trunk">
          <div 
            class="aa" 
            v-if="nodeBranch" 
            @click='toggle'>
            <svg 
              v-if="stateOpen" 
              mark="south" 
              xmlns="http://www.w3.org/2000/svg" 
              version="1.1" 
              width="15" 
              height="15">
              <polygon points="0,4 15,4 8,12" />
            </svg>
            <svg 
              v-else 
              mark="east" 
              xmlns="http://www.w3.org/2000/svg" 
              version="1.1" 
              width="15" 
              height="15">
              <polygon points="4,0 4,15 12,8" />
            </svg>
          </div>
          <div v-if='hasCheckbox'><input 
            ref="checkbox" 
            type="checkbox" 
            v-model='stateCheckbox' 
            @change="changeCheckbox()" ></div>
          <div v-if="data.icon"><span 
            class="node-icon" 
            :class="data.icon"/></div>
          <div 
            style="flex: 1;"
            @click.stop="click({ level })" 
            @dblclick.stop="dbclick({ level })" >
            <slot 
              name="node-text" 
              :data="data" 
              :state="{clickLevel,childrenCheckedNumner,stateView,childrenIndeterminateNumner}">{{ data.text }}</slot>
          </div>
        </slot>
      </div>
      <slot 
        name="node-grid" 
        :data="data"/>
      <slot 
        v-if="nodeLeaf" 
        name="node-leaf" 
        :data="data"/>
      <slot 
        v-if="nodeBranch" 
        name="node-branch" 
        :data="data"/>
    </div>
    <div v-show='stateOpen && nodeBranch'>
      <hpf-tree 
        :is-open='isOpen' 
        :has-checkbox='hasCheckbox' 
        :checked='checked' 
        :retract='retract' 
        :level=" level + 1 "
        @modifyParent="modifyParent" 
        @modifyChildren="modifyChildren"
        @click="click" 
        @dblclick="dbclick"
        v-for='item in data.children' 
        :node-data='item' 
        :key="item.text">
        <template 
          slot="node-text" 
          slot-scope="{ data, state }">
          <slot 
            name="node-trunk" 
            :data="data">
            <slot 
              name="node-text" 
              :data="data" 
              :state="state"/>
          </slot>
        </template>
        <template 
          slot="node-grid" 
          slot-scope="{ data }">
          <slot 
            name="node-grid" 
            :data="data" />
        </template>
        <template 
          slot="node-leaf" 
          slot-scope="{ data }">
          <slot 
            name="node-leaf" 
            :data="data"/>
        </template>
        <template 
          slot="node-branch" 
          slot-scope="{ data }">
          <slot 
            name="node-branch" 
            :data="data"/>
        </template>
      </hpf-tree>
    </div>
  </div>
</template>
<script>
import { PREFIX } from '@/src/config.js'
import checkboxMixin from './checkbox.mixin'
import eventMixin from './event.mixin'
export default {
  name: `${PREFIX}tree`,
  mixins: [checkboxMixin, eventMixin],
  props: {
    retract: { type: Number, default: 1 },
    nodeData: {
      type: Object, default() { return {} }
    }
  },
  data() {
    return {
      data: this.nodeData
    }
  },
  computed: {
    nodeLeaf() {
      /* 判断当前节点是否为最后一个节点 */
      return this.nodeNumber === 0
    },
    nodeBranch() {
      return this.nodeNumber > 0
    }
  }
}
</script>
<style>
.tree {
  line-height: 44px;
  background: #f2f4f7;
  font-size: 14px;
  color: #333;
  width: 100%;
  display: flex;
  flex-direction:column;
}
.tree .tree-head {
  display: flex;
  flex-direction: row;
}
.tree .node {
  display: flex;
  flex-direction: row;
}
.tree > div > div {
  text-align: center;
}

.tree .node .node-trunk {
  display: flex;
  flex: 1;
  flex-direction: row;
  text-align: left;
}

.tree .node-selected {
  background-color: #fc6e30;
}

.tree .node-active {
  background-color: #fc6e30;
  color: #fc6e30;
}

.tree .node-selected .selectLast {
  background: #fff;
  color: #fc6e30;
}

.tree .node-icon {
  padding-left: 30px;
  margin-right: 15px;
}

.tree .node-icon-text {
  width: 20px;
}
</style>

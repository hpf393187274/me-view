<template>
  <div class="demo">
    <tree 
      :node-data="treeData" 
      :has-checkbox="true" 
      :is-open='false'>
      <template slot="tree-head">
        <div style="flex:1;">机构名称</div>
        <div style="width:50px;">姓名</div>
        <div style="width:50px;">年龄</div>
        <div style="width:50px;">性别</div>
      </template>
      <template 
        slot="node-text" 
        slot-scope="{ data }">
        {{ data.text }}
      </template>
      <template 
        v-if="type === 'grid'" 
        slot="node-grid" 
        slot-scope="{ data }">
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.name }}</div>
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.sex }}</div>
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.age }}</div>
      </template>
      <template 
        v-if="type === 'branch'" 
        slot="node-branch" 
        slot-scope="{ data }">
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.name }}</div>
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.sex }}</div>
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.age }}</div>
      </template>
      <template 
        v-if="type === 'leaf'" 
        slot="node-leaf" 
        slot-scope="{ data }">
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.name }}</div>
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.sex }}</div>
        <div 
          @click="clickItem(data)" 
          style="width:50px;">{{ data.age }}</div>
      </template>
    </tree>
  </div>
</template>
<script>
import Tree from './Tree'

export default {
  components: {Tree},
  props: {},
  data() {
    const obj = {
      text: '一级 1',
      name: '张三1',
      sex: '男',
      age: 28,
      children: []
    }
    const strObj = JSON.stringify(obj)
    let item = JSON.parse(strObj)
    for (let i = 0; i < 10; i++) {
      let itemA = JSON.parse(strObj)
      for (let j = 0; j < 100; j++) {
        let itemB = JSON.parse(strObj)
        itemB.text += i + '' + j
        itemA.children.push(itemB)
      }
      itemA.text += i
      item.children.push(itemA)
    }
    return {
      type: 'grid', // grid branch leaf
      treeData: item
    }
  },
  methods: {
    clickItem({ name }) {
      console.log(name)
    }
  }
}
</script>
<style scoped>
.demo {
  width: 1200px;
  text-align: center;
  padding-left: 100px;
  padding-top: 100px;
}
</style>

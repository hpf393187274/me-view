
<template>
  <div :class="addClass('row','flex')" style="overflow: auto;">
    <me-tree
      ref="tree"
      :class="addClass('border','flex')"
      :data="data"
      :expanded-level="1"
      header
      statistics
      :checked="checked"
      lazy
      action
      checkbox
    ></me-tree>
    <div class="me-border" style="width:300px;overflow: auto;">
      <pre>{{result}}</pre>
    </div>
    <div class="me-flex me-border">
      <div>
        <me-button @click="checked = !checked">全选/反选{{checked}}</me-button>
        <me-button @click="$refs.tree.clearCheckedNode()">清除选中节点</me-button>
        <me-button @click="$refs.tree.removeCheckedNode()">移除选中节点</me-button>
      </div>
      <div>
        <me-button @click="result = $refs.tree.getCheckedData()">获取叶子节点</me-button>
        <me-button @click="result = $refs.tree.getCheckedTreeData()">checkboxTree(包含叶子节点)</me-button>
        <me-button
          @click="result = $refs.tree.getCheckedTreeData({leaf:false})"
        >checkboxTree(不包含叶子节点)</me-button>
      </div>
    </div>
  </div>
</template>
<script>
import data from './data/tree'
export default {
  data() {
    return {
      result: [],
      checked: false,
      data
    }
  }
}
</script>

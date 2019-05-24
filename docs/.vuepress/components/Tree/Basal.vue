
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
    <div class="me-row me-border" style="width:300px;color:white;">
      <pre class="me-flex">{{result}}</pre>
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
export default {
  data() {
    return {
      result: [],
      checked: false,
      data: [
        {
          id: '1',
          label: '陕西省',
          resource: { name: '陕西省' },
          children: [
            {
              id: '1-1', label: '西安市',
              resource: { name: '陕西省' },
              children: [
                { id: '1-1-1', label: '雁塔区' },
                { id: '1-1-2', label: '长安区' }
              ]
            },
            {
              id: '1-2', label: '咸阳市',
              children: [
                {
                  id: '1-2-1', label: '礼泉县',
                  children: [
                    { id: '1-2-1-1', label: '城关镇' },
                    { id: '1-2-1-2', label: '烟霞镇' },
                    { id: '1-2-1-3', label: '烽火镇' },
                    { id: '1-2-1-4', label: '石潭镇' },
                    { id: '1-2-1-5', label: '昭陵乡' },
                  ]
                },
                { id: '1-2-2', label: '乾县' },
                { id: '1-2-3', label: '永寿县' }
              ]
            }
          ]
        },
        {
          id: '2',
          label: '四川省',
          // children: [
          //   { id: '2-1', label: '成都市' },
          //   { id: '2-2', label: '汶川市' }
          // ]
        }
      ]
    }
  }
}
</script>


<template>
  <div :class="addClass('column')" style="overflow: auto;">
    <vv-tree ref="tree" :class="addClass('flex')" :data="data" expand show-checkbox/>
    <div>
      <vv-button @click="result = $refs.tree.getCheckedData()">获取叶子节点</vv-button>
      <vv-button @click="result = $refs.tree.getCheckedTreeData()">checkboxTree(包含叶子节点)</vv-button>
      <vv-button @click="result = $refs.tree.getCheckedTreeData({leaf:false})">checkboxTree(不包含叶子节点)</vv-button>
    </div>
    <div style="overflow: auto;">
      <pre>{{result}}</pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: [],
      data: [
        {
          id: '1',
          text: '陕西省',
          children: [
            {
              id: '1-1', text: '西安市',
              children: [
                { id: '1-1-1', text: '雁塔区' },
                { id: '1-1-2', text: '长安区' }
              ]
            },
            { id: '1-2', text: '咸阳市' }
          ]
        },
        {
          id: '2',
          text: '四川省',
          children: [
            { id: '2-1', text: '成都市' },
            { id: '2-2', text: '汶川市' }
          ]
        }
      ]
    }
  }
}
</script>

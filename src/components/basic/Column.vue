<template>
  <div class="me-column">
    <div class="me-row">
      <me-button @click="comboTree=[]">变更</me-button>
      <me-button @click="comboTree=[]">重置</me-button>
      外面={{treeValue}}
    </div>
    <me-combo-tree :data="comboTree" border field-value="id" v-model="treeValue"></me-combo-tree>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MeColumn',
  data() {
    return {
      comboTree: [
        {
          id: '1', label: '陕西省', children: [
            {
              id: '1-1', label: '西安市', children: [
                { id: '1-1-1', label: '雁塔区' },
                { id: '1-1-2', label: '长安区' }
              ]
            }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '成都市' },
            { id: '2-2', label: '汶川市' }
          ]
        }
      ],
      treeValue: [],
      comboSelect: [
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' },
        { label: '四川省', value: '3' },
        { label: '河南省', value: '4' },
        { label: '江苏省', value: '5' }
      ]
    }
  }
}

</script>

<template>
  <div class="me-flex" style="overflow: auto;">
    <me-tree-basic class="me-flex"/>
    <me-tree-checkbox class="me-flex"/>
    <me-tree-all class="me-flex"/>

    <me-panel label="Tree Attributes">
      <me-table :data="attributes" node-key="paramName">
        <me-table-column label="参数名" field="paramName"/>
        <me-table-column label="描述" field="describe" column-style="flex: 0, width:600px;"/>
        <me-table-column label="类型" field="type"/>
        <me-table-column label="默认值" field="defaultValue"/>
        <me-table-column label="可选值" field="enumValue"/>
      </me-table>
    </me-panel>
    <div height="50">&nbsp;</div>
    <me-panel label="Tree methods">
      <me-table :data="methods" node-key="methodName">
        <me-table-column label="方法名" field="methodName"/>
        <me-table-column label="描述" field="describe"/>
        <me-table-column label="参数" field="paramName"/>
        <me-table-column label="返回值" field="returnValue"/>
      </me-table>
    </me-panel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attributes: [
        { paramName: 'statistics', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '是否显示统计' },
        { paramName: 'checkbox', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '是否显示复选框' },
        { paramName: 'checked-strict', type: 'Boolean', defaultValue: 'true', enumValue: '[true, false]', describe: '是否严格模式false 父子联动互不干涉' },
        { paramName: 'checked', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '复选框是否选中' },
        { paramName: 'action', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '是否显示功能' },
        { paramName: 'lazy', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '是否懒加载' },
        { paramName: 'expanded', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '是否展开' },
        { paramName: 'expanded-level', type: 'Number', defaultValue: '0', enumValue: '[1, 2, 3, ...]', describe: '展开的级别' },
        { paramName: 'expanded-node-click', type: 'Boolean', defaultValue: 'true', enumValue: '[true, false]', describe: '点击节点是否展开' },
        { paramName: 'accordion', type: 'Boolean', defaultValue: 'false', enumValue: '[true, false]', describe: '是否每次只打开一个同级树节点展开：手风琴' },
        { paramName: 'node-key', type: 'String', defaultValue: 'id', enumValue: '-', describe: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的' }
      ],
      methods: [
        { methodName: 'removeCheckedNode', paramName: '-', returnValue: '-', describe: '移除选中的节点' },
        { methodName: 'clearCheckedNode', paramName: '-', returnValue: '-', describe: '清除选中的节点' }
      ]
    }
  }
}
</script>

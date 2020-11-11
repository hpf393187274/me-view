# Dialog 模态框

## Dialog 使用方式

### 普通用法
::: demo `data` 数据 `border` 边框
```html
<template>
  <div class="me-row">
    <me-dialog title="dialog" height="500px" v-model="statusTable" @confirm="handlerConfirm">
      <me-table ref="tableList" checkbox multiple :data="data" :columns="columns" highlight>
        <template #action="{data}">
          <me-input v-model="data.label" />
        </template>
        <template #test>
          <me-button>test</me-button>
        </template>
        <template #footer>
          <me-paging :total="50" class="me-flex"/>
        </template>
      </me-table>
    </me-dialog>
    <me-dialog title="dialog" min-height="100px" min-width="900px" v-model="statusForm" @confirm="handlerFormConfirm">
      <me-form class="me-flex me-grid-column-2" :rules="rules" ref="form">
        <!-- <div class="me-row">
          <me-label required title="姓名" prop="name">
            <me-input clearable placeholder="请输入姓名" v-model="form.name"></me-input>
          </me-label>
          <me-label title="年龄" prop="age">
            <me-input type="number" clearable placeholder="请输入年龄" v-model="form.age"></me-input>
          </me-label>
        </div> -->
        <div class="me-row">
          <me-label title="性别" prop="sex">
            <me-combo-select readonly :data="sexList" v-model="form.sex" clearable placeholder="请选择性别">
            </me-combo-select>
          </me-label>
        </div>
        <!-- <div class="me-row">
          <me-label title="省份" prop="province">
            <me-combo-table clearable v-model="form.province" readonly :columns="columnsRegion" :data="provinceList" field-value="id" field-label="title">
            </me-combo-table>
          </me-label>
          <me-label title="行政区域" prop="region">
            <me-combo-tree 
              readonly 
              v-model="form.region"
              :data="regionList"
              :expanded-level="2"
              field-value="id"
              field-label="title">
              <template #node-label="{data}">{{data.title}}</template>
            </me-combo-tree>
          </me-label>
        </div> -->
      </me-form>`
    </me-dialog>
    <me-dialog title="dialog" min-height="100px" min-width="600px" v-model="statusTree">
      <me-tree class="me-flex" expandedAll highlight action :data="treeData" checkbox statistics header header-label="全选">
      
    </me-tree>
    </me-dialog>
    <me-button @click="statusTable=!statusTable">Dialog - Table</me-button>
    <me-button @click="dialogForm">Dialog - Form</me-button>
    <me-button @click="statusTree=!statusTree">Dialog - Tree</me-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusTable: false,
      statusForm: false,
      statusTree: false,
      checkedRows:[],
      regionList:[
        {
          id: '1', title:'陕西', children: [
            {
              id: '1-1', title: '西安', children: [
                { id: '1-1-1', title: '雁塔' },
                { id: '1-1-2', title: '长安' }
              ]
            }
          ]
        },
        {
          id: '2', title:'四川', children: [
            { id: '2-1', title: '成都' },
            { id: '2-2', title: '汶川' }
          ]
        }
      ],
      sexList: (() => {
        return [ 
          { label: '男', value: '1' },
          { label: '女', value: '0' },
          { label: '未知', value: '-1' }
        ]
      })(),
      columnsRegion: [
        { label:'编号', field: 'value'},
        { label:'名称', field: 'label' },
      ],
      form: {
        name: '1',
        sex: '-1',
        age: null,
        province: '2',
        region: '2'
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空' },
          { 
            asyncValidator(rule,value,callback) {
              if(value.length <= 1){ callback(new Error('长度必须大于1位'))}
              else {callback()}
            }
          }
        ],
        age: [
          { required: true, message: '年龄不能为空' },
          { type:'number', message: '年龄必须为数字' },
          { type:'number', min:10, max:100, message: '年龄不能小于10岁，不能大于100岁' }
        ],
        sex: [
          { required: true, message: '性别不能为空' },
          { type: 'enum', message:'性别必须是 男 或 女', enum:['1','0']}
        ]
      },
      provinceList:[
        { label: '山西省', value: '1' },
        { label: '陕西省', value: '2' },
        { label: '四川省', value: '3' },
        { label: '河南省', value: '4' },
        { label: '江苏省', value: '5' }
      ],
      columns: [
        { label:'编号', field: 'id'},
        { label:'测试', field: 'test' },
        { label:'操作', field: 'action' }
      ],
      selectData: [ ],
      data: [
        { id: '1', label: '陕西省sssss'},
        { id: '2', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '4', label: '四川省'},
        { id: '5', label: '江苏省'},
        { id: '6', label: '河南省'},
        { id: '7', label: '陕西省'},
        { id: '8', label: '四川省'},
        { id: '9', label: '江苏省'},
        { id: '10', label: '河南省'},
        { id: '11', label: '河南省'}
      ],
      treeData: [],
      dataTree: [
        {
          code: '1', label: '陕西省', children: [
            {
              code: '1-1', label: '西安市', children: [
                { code: '1-1-1', label: '雁塔区' },
                { code: '1-1-2', label: '长安区' }
              ]
            }
          ]
        },
        {
          code: '2', label: '四川省', children: [
            { code: '2-1', label: '成都市' },
            { code: '2-2', label: '汶川市' }
          ]
        }
      ]
    }
  },
  created () {
    setTimeout(() => {
      this.treeData = [ ...this.dataTree ]
    }, 1000 * 2)
  },
  methods: {
    async handlerFormConfirm () {
      try {
        const message = await this.$refs.form.validate()
        this.$message.success('表单校验成功')
      } catch (message) {
        this.$message.error(message)
      }
    },
    dialogForm () {
      this.statusForm = true
      setTimeout(() => {
        this.form.sex = '1'
      })
    },
    handlerChange () {

    },
    handlerConfirm () {
      const selectedData = this.$refs.tableList.getCheckedRows()
      if(!selectedData || selectedData.length < 1) {
        this.$message.info('请选择数据')
        return 
      }

      this.$message.info(`选择了 ${selectedData.length} 条数据`)
    }
  }
}
</script>
```
:::

# Dialog 弹出框

### Alert 用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-button @click="onHandler">你叫什么名字</me-button>
</template>
<script>
export default {
  methods: {
    onHandler() {
      this.$dialog.alert('我们都是好孩子')
    }
  }
}
</script>
```
:::



### Confirm 用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-button @click="onHandler">你叫什么名字</me-button>
</template>
<script>
export default {
  methods: {
    onHandler() {
      this.$dialog.confirm('请确认：你叫什么名字')
        .then(() => { this.$message.info('点击了确认') })
        .catch(() => { this.$message.error('点击了取消') })
    }
  }
}
</script>
```
:::

### Prompt 用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-button @click="handlerClick">请输入</me-button>
</template>
<script>
export default {
  methods: {
    handlerClick() {
      this.$dialog.prompt({
        content: '请输入文件夹名称',
        rules:[ { required: true, message: '文件夹名称不能为空' }]
      })
      .then(value => { this.$message.info(`输入的内容为：${value}`) })
      .catch(() => { this.$message.error('点击了取消') })
    }
  }
}
</script>
```
:::

## Dialog Attributes
| 名称      | 描述   |  类型   | 默认值 | 可选值      |
| --------- | ------ | :-----: | :----: | ----------- |
| title     | 标题   | String  |   -    | -           |
| width     | 宽度   | String  | false  | true, false |
| height    | 高度   | String  | false  | true, false |
| draggable | 可拖拽 | Boolean |  true  | true, false |
| closable  | 可关闭 | Boolean |  true  | true, false |

## Dialog Events
| 名称    | 描述     | 参数  |
| ------- | -------- | :---: |
| confirm | 确定 |   -   |

## Dialog Slot
| 名称 | 描述 |
| ---- | ---- |
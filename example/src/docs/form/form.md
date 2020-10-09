
## Form 表单

### 基础用法
::: demo `label` 设置标签 `clearable` 可清除的
```html
<template>
  <me-form ref="form" :rules="rules" labelWidth="150px">
    <div class="me-row">
      <me-label required title="姓名" prop="name">
        <me-input clearable placeholder="请输入姓名" v-model="form.name"></me-input>
      </me-label>
      <me-label title="年龄" prop="age">
        <me-input type="number" clearable placeholder="请输入年龄" v-model="form.age"></me-input>
      </me-label>
    </div>
    <div class="me-row">
      <me-label title="性别" prop="sex">
        <me-combo-select readonly :data="sexList" v-model="form.sex" clearable placeholder="请选择性别">
        </me-combo-select>
      </me-label>
    </div>
    <div class="me-row">
      <me-label title="省份" prop="province">
        <me-combo-table clearable v-model="form.province" readonly :columns="columnsRegion" :data="provinceList" field-value="id" field-label="title" @change="handlerChangeProvince">
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
    </div>
    <me-label title="描述" prop="description">
      <me-textarea clearable placeholder="请输入描述" v-model="form.description"> </me-textarea>
    </me-label>
    <div class="me-row me-center">
      <me-button type="primary" @click="confirm">确 定</me-button>
      <me-button @click="reset">重 置</me-button>
      <me-button @click="initData">初始化数据</me-button>
    </div>
  </me-form>
</template>
<script>
export default {
  methods:{
    async confirm () {
      try {
        const message = await this.$refs.form.validate()
        this.$message.success('表单校验成功')
      } catch (message) {
        this.$message.error(message)
      }
    },
    reset(){
      this.$refs.form.reset()
    },
    initData () {
      this.form.region = '1-1-1'
      this.$refs.form.initialize(this.form)
    },
    handlerChangeProvince ( { value, data, index } = { }) {
      console.log('value = ', value)
      console.log('index = ', index)
      console.log('data = ', data)
    }
  },
  data() {
    return {
      form: {
        name: '男2',
        sex: '',
        age: 12,
        province: '2',
        description: undefined,
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
      sexList:[ 
        { label: '男', value: '1' },
        { label: '女', value: '0' },
        { label: '未知', value: '-1' }
      ],
      sexListSource:[ 
        { label: '男', value: '1' },
        { label: '女', value: '0' },
        { label: '未知', value: '-1' }
      ],
      provinceList:[
        { title: '山西省', id: '1' },
        { title: '陕西省', id: '2' },
        { title: '四川省', id: '3' },
        { title: '河南省', id: '4' },
        { title: '江苏省', id: '5' }
      ],
      columnsRegion: [
        { label:'编号', field: 'id'},
        { label:'名称', field: 'title' },
      ],
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
      ]
    }
  }
}
</script>
```
:::

### Form Attributes
| 名称 | 描述 | 类型  | 默认值 | 可选值 |
| ---- | ---- | :---: | :----: | ------ |

### Form Events
| 名称 | 描述 | 参数  |
| ---- | ---- | :---: |

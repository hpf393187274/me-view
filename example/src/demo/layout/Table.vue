<template>
  <me-table
    style="overflow: auto;"
    class="me-flex"
    field-value="code"
    :columns="columns"
    :data="list"
    checkbox
    multiple
    ref="table"
  >
    <template #header>
      <div class="me-row me-flex">
        <div class="me-flex">&nbsp;</div>
        <div class="me-row">
          <me-button @click="handlerLoadMenuList('click')" type="primary" icon="icon-search">查 询</me-button>
        </div>
      </div>
    </template>
    <template #footer>
      <me-paging
        :pageSize="form.pageSize"
        :total="total"
        class="me-flex"
        @change-page="handlerPaging"
      />
    </template>
  </me-table>
</template>

<script>
import api from '../../http/authority/Menu.api'
export default {
  data () {
    return {
      height: 400,
      checkedRows: [],
      columns: [
        { label: '操作', field: 'action', layout: 'center', width: '200px' },
        {
          label: '所属系统',
          field: 'systemName',
          layout: 'center',
          width: '200px'
        },
        {
          label: '所属模块',
          field: 'moduleName',
          layout: 'center',
          width: '200px'
        },
        { label: '菜单名称', field: 'name' },
        { label: '菜单地址', field: 'url' },
        { label: '菜单排序', field: 'order' }
      ],
      form: {
        systemCode: '',
        moduleCode: '',
        code: '',
        name: '',
        parentCode: '',
        url: '',
        pageSize: 50,
        pageNum: 1
      },
      list: [],
      total: 0
    }
  },
  created () {
    this.handlerLoadMenuList()
  },
  methods: {
    handlerPaging (data) {
      Object.assign(this.form, data)
      this.handlerLoadMenuList()
    },
    handlerLoadMenuList (action) {
      if (action === 'click') { this.form.parentCode = '' }
      api.findPage(this.form).then(({ list, total }) => {
        this.list = [...list || []]
        this.total = total || 0
      })
    }
  }
}
</script>

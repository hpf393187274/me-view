
# Database 前端数据库
    基于 IndexedDB 数据库存储
### Database 示例用法
``` js
import { Database, database } from 'me-view'

// database 数据库实例，库名默认 'me-view-database-default'
const database = new Database('me-view-database-default')

// 初始化 数据表及索引
!(async () => {
  await database.createStore({ 
    tableName: 'schema_table', // 表名
    keyPath: 'id',  // 主键 path
    index: [{ key: 'databaseName' }]  //索引
  })
})()

// 保存数据
database.save('schema_table', { id:'1', name: '张三', sex: '男', age: 25 })
  .then(() => {
    console.log('本地数据保存成功')
  })
  .catch((error) => {
    const { message } = error.currentTarget.error
    console.error(message)
  })
// 查询数据
database.find('schema_table', '1')
  .then((data) => {
    console.log('数据查询成功。', data)
  })
  .catch((error) => {
    const { message } = error.currentTarget.error
    console.error(message)
  })

...
```

### Database Methods

| 方法名      | 描述                                  | 参数                                | 返回值 |
| ----------- | ------------------------------------- | ----------------------------------- | ------ |
| createStore | 创建表，索引，主键                    | { tableName, keyPath, index }        | -      |
| add         | 新增数据                              | tableName, data = {}                | -      |
| update      | 变更数据 - 主键                       | tableName, data = {}                | -      |
| save        | 保存数据，不存在 add, 存在 update     | tableName, data = {}                | -      |
| batchSave   | 批量保存数据，不存在 add, 存在 update | tableName, data = [{}]              | -      |
| remove      | 移出元素                              | tableName, value= 主键值            | -      |
| batchRemove | 批量移出元素                          | tableName, values= [] // 主键值集合 | -      |
| findOne     | 查找单一元素                          | tableName, values= [] // 主键值集合 | 结果   |
| findList    | 查找集合                              | tableName, key= 索引, value= 值     | 结果   |
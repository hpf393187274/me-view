
# Storage 数据存储
``` js
import { local, session } from 'me-view'
```
``` js
local.set('userList', [])
local.get('userList')
local.remove('uesrName')
```

### LocalStorage or SessionStorage Methods

| 方法名      | 描述             | 参数                | 返回值      |
| ----------- | ---------------- | ------------------- | ----------- |
| set         | 设置当前值       | key, value          | -           |
| get         | 获取 当前 key 值 | key                 | 结果        |
| remove      | 移出 当前 key    | key                 | -           |
| arrayAppend | 追加元素         | key, value, compare | true, false |
| arrayRemove | 移出元素         | key，value, compare | true, false |
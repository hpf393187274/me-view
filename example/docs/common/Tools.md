
# Tools 常用工具
``` js
import { local, session } from 'me-view'
```
``` js
local.set('userList', [])
local.get('userList')
local.remove('uesrName')
```

### LocalStorage or SessionStorage Methods

| 方法名     | 描述               | 参数                                                                    | 返回值      |
| ---------- | ------------------ | ----------------------------------------------------------------------- | ----------- |
| isEmpty    | 是否为空           | target                                                                  | true, false |
| isNotEmpty | 是否非空           | target                                                                  | true, false |
| trim       | 去除字符串前后空格 | target                                                                  | 结果        |
| UUId       | 获取唯一UUID       | -                                                                       | 唯一值      |
| clone      | 克隆               | target，{deep: false /* 是否深度拷贝 */, exclude:[/* 排除拷贝的key */]} | true, false |

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

| 方法名       | 描述                       | 参数                                                                    | 返回值      |
| ------------ | -------------------------- | ----------------------------------------------------------------------- | ----------- |
| isEmpty      | 是否为空                   | target                                                                  | true, false |
| notEmpty     | 是否非空                   | target                                                                  | true, false |
| isEmptyArray | 是否空数组，非数组抛出异常 | target                                                                  | true, false |
| trim         | 去除字符串前后空格         | target                                                                  | 结果        |
| UUId         | 获取唯一UUID               | -                                                                       | 唯一值      |
| clone        | 克隆                       | target，{deep: false /* 是否深度拷贝 */, exclude:[/* 排除拷贝的key */]} | true, false |
| urlParam     | 获取Url参数                | key，target = location.search                                           | value       |
| expendTime   | 目标消耗时间               | callback, classify = second                                             | 时/分/秒    |

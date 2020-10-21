
# Storage 数据存储
``` js
import { local, session } from 'me-view'
```
``` js
local.set('userList', [])
local.get('userList')
local.remove('uesrName')
```

::: demo `type` 按钮类型
```html
<template>
  <div>
    --{{ $session.get('undefined') }} --<br />
    --{{ $session.get('null') }} --<br />
    --{{ $session.get('string-undefined') }} --<br />
    --{{ $session.get('string-null') }} --<br />
    --{{ $session.get('string-') }} --<br />
    --{{ $session.get('boolean-true') }} --<br />
    --{{ $session.get('boolean-false') }} --<br />
    --{{ $session.get('object-blank') }} --<br />
    --{{ $session.get('object-inner') }} --<br />
    --{{ $session.get('array-blank') }} --<br />
    --{{ $session.get('array-inner') }} --
  </div>
</template>
<script>
export default {
  created () {
    this.$session.set('undefined', undefined, true)
    this.$session.set('null', null)
    this.$session.set('string-undefined', 'undefined')
    this.$session.set('string-null', 'null')
    this.$session.set('string-', '')
    this.$session.set('boolean-true', true, true)
    this.$session.set('boolean-false', false, true )
    this.$session.set('object-blank', {}, true)
    this.$session.set('object-inner', { name: '姓名' }, true )
    this.$session.set('array-blank', [], true)
    this.$session.set('array-inner', [1, "aaa", 'bbb'], true )
  }
}
</script>
```
:::

### LocalStorage or SessionStorage Methods

| 方法名 | 描述             | 参数                | 返回值 |
| ------ | ---------------- | ------------------- | ------ |
| set    | 设置当前值       | key, value, encrypt | -      |
| get    | 获取 当前 key 值 | key                 | 结果   |
| remove | 移出 当前 key    | key                 | -      |
| clear  | 清除             | -                   | -      |
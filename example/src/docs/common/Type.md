
# Type 类型判断
``` js
import {type} from 'me-view'

Type.notString(null | undefined | { } | [ ]) // true
Type.isString("我们都是好孩子") // true

Type.notFunction(null | undefined | { } | [ ]) // true
Type.isFunction(function(){} | ()->{}) // true

Type.notArray(null | undefined | { } ) // true
Type.isArray([]) // true

...
```
### Type Methods

| 方法名           | 描述               | 参数   | 返回值      |
| ---------------- | ------------------ | ------ | ----------- |
| getType          | 获取类型           | target | [object type] |
| isBoolean        | Boolean 类型       | target | true, false |
| notBoolean       | 非 Boolean 类型    | target | true, false |
| isNumber         | Number 类型        | target | true, false |
| notNumber        | 非 Number 类型     | target | true, false |
| isString         | String 类型        | target | true, false |
| notString        | 非 String 类型     | target | true, false |
| isObjectOrArray  | Object or Array    | target | true, false |
| notObjectOrArray | 非 Object or Array | target | true, false |
| isObject         | Object             | target | true, false |
| notObject        | 非 Object          | target | true, false |
| isArray          | Array              | target | true, false |
| notArray         | 非 Array           | target | true, false |
| isFunction       | Function           | target | true, false |
| notFunction      | 非 Function        | target | true, false |
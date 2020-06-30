import Tools from '../script/tools'

const value = Tools.stringify({ user: { name: [ '张三', '李四' ], age: 23, sex: '男' } }, {})
console.debug('Tools.stringify -> ', value)

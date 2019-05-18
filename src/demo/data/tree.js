// import { tools } from '@assets/script/common'
const parseData = (num, level, parentId = 0) => {
  if (level <= 0) { return [] }
  const data = []
  for (let index = 0; index < num; index++) {
    const item = {
      id: `${parentId}_${index + 1}`,
      label: `节点_${index + 1}`,
      children: parseData(num, level - 1, `${parentId}_${index + 1}`)
      // children: parseData(Math.ceil(num / 2), level - 1, `${parentId}_${index + 1}`)
    }
    data.push(item)
  }
  return data
}
// const result = tools.expendTime({
//   callback() {
//     parseData(5, 6)
//   }
// })

// console.log(`执行函数：parseData(40, 3)， 耗时 ${result} 秒`)
const data = parseData(3, 5)
console.log(`执行函数：parseData(40, 3)， 耗时 ${data} 秒`)

// export default data

export default [
  {
    id: '1',
    label: '陕西省',
    resource: { name: '陕西省' },
    children: [
      {
        id: '1-1', label: '西安市',
        resource: { name: '陕西省' },
        children: [
          { id: '1-1-1', label: '雁塔区' },
          { id: '1-1-2', label: '长安区' }
        ]
      },
      {
        id: '1-2', label: '咸阳市',
        children: [
          {
            id: '1-2-1', label: '礼泉县',
            children: [
              { id: '1-2-1-1', label: '城关镇' },
              { id: '1-2-1-2', label: '烟霞镇' },
              { id: '1-2-1-3', label: '烽火镇' },
              { id: '1-2-1-4', label: '石潭镇' },
              { id: '1-2-1-5', label: '昭陵乡' },
            ]
          },
          { id: '1-2-2', label: '乾县' },
          { id: '1-2-3', label: '永寿县' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '四川省',
    // children: [
    //   { id: '2-1', label: '成都市' },
    //   { id: '2-2', label: '汶川市' }
    // ]
  }
]

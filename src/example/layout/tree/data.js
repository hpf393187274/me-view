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
    children: [
      { id: '2-1', label: '成都市' },
      { id: '2-2', label: '汶川市' }
    ]
  }
]
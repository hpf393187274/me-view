export default [
  {
    id: '1',
    text: '陕西省',
    children: [
      {
        id: '1-1', text: '西安市',
        children: [
          { id: '1-1-1', text: '雁塔区' },
          { id: '1-1-2', text: '长安区' }
        ]
      },
      {
        id: '1-2', text: '咸阳市',
        children: [
          {
            id: '1-2-1', text: '礼泉县',
            children: [
              { id: '1-2-1-1', text: '城关镇' },
              { id: '1-2-1-2', text: '烟霞镇' },
              { id: '1-2-1-3', text: '烽火镇' },
              { id: '1-2-1-4', text: '石潭镇' },
              { id: '1-2-1-5', text: '昭陵乡' },
            ]
          },
          { id: '1-2-2', text: '乾县' },
          { id: '1-2-3', text: '永寿县' }
        ]
      }
    ]
  },
  {
    id: '2',
    text: '四川省',
    children: [
      { id: '2-1', text: '成都市' },
      { id: '2-2', text: '汶川市' }
    ]
  }
]
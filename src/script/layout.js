
export default class Layout {
  #data = []
  #max
  #dataSource
  #pointList
  #denominator
  #height
  constructor (data, denominator = 12, screenHeight) {
    this.#dataSource = data
    this.#max = denominator + 1
    this.#denominator = denominator
    this.pointList = [ { row: 1, column: 1 } ]
    this.#height = screenHeight
  }

  get pointList () {
    return this.#pointList
  }

  set pointList (data) {
    this.#pointList = data
  }

  get data () {
    return this.#data
  }

  get areaHeight () {
    return Math.round(this.#height / this.#denominator)
  }

  get containerStyle () {
    return {
      display: 'grid',
      'grid-template-columns': `repeat(${this.#denominator}, 1fr)`,
      'grid-auto-rows': `${this.areaHeight}px`
    }
  }

  itemStyle ({ row, column }) {
    if (row && column) {
      return {
        'grid-row': `${row.start} / ${row.end}`,
        'grid-column': `${column.start} / ${column.end}`
      }
    }
    return {}
  }

  include ({ start, end }, value) {
    value += 0.1
    return value >= start && value <= end
  }

  includePoint ({ row, column }) {
    for (const item of this.data) {
      if (this.include(item.row, row) && this.include(item.column, column)) {
        return true
      }
    }
    return false
  }

  mergeArea () {
    for (const point of this.pointList) {
      if (this.includePoint(point)) {
        Object.assign(point, { discarded: true })
      }
    }
  }

  orderArea () {
    this.pointList.sort((a, b) => {
      if (a.row === b.row) {
        return a.column - b.column
      }
      return a.row - b.row
    })
  }

  push (data) {
    this.#data.push(data)
  }

  parseAllArea () {
    for (let index = 0; index < this.#dataSource.length; index++) {
      const data = this.parseArea(this.#dataSource[index], index)
      if (data.row && data.column) {
        this.push(data)
        this.parsePoint()
        this.#dataSource[index].row = data.row
        this.#dataSource[index].column = data.column
      }
    }
    return this.#dataSource
  }

  removeMarkArea () {
    const length = this.pointList.length
    for (let index = length - 1; index >= 0; index--) {
      const item = this.pointList[index]
      if (item.discarded === true) {
        this.pointList.splice(index, 1)
      }
    }
  }

  crossVerify (target, { start, end }) {
    if (start + 0.001 > target.end || end - 0.001 < target.start) {
      return false
    }
    return true
  }

  crossArea ({ row, column }) {
    for (const item of this.data) {
      if (this.crossVerify(item.row, row) && this.crossVerify(item.column, column)) {
        return true
      }
    }
    return false
  }

  /**
   * 点位向上移动， 每次减 1
   * @param {Object} param
   */
  extendPointUpAndPush ({ row, column }) {
    let temp = { row, column }
    let count = 0
    do {
      count++
      if (count > 100) { break }
      temp = { row: temp.row - 1, column }
      if (temp.row === 0 || this.includePoint(temp)) {
        return this.pointList.push({ row: temp.row + 1, column })
      }
    } while (true)
  }

  /**
   * 点位向左移动， 每次减 1
   * @param {Object} param
   */
  extendPointLeftAndPush ({ row, column }) {
    let temp = { row, column }
    let count = 0
    do {
      count++
      if (count > 100) { break }
      temp = { row, column: temp.column - 1 }
      if (temp.column === 0 || this.includePoint(temp)) {
        return this.pointList.push({ row, column: temp.column + 1 })
      }
    } while (true)
  }

  /**
   * 点位解析
   */
  parsePoint () {
    this.pointList = []
    for (const item of this.data) {
      if (item.column.end < this.#max) {
        this.extendPointUpAndPush({
          column: item.column.end,
          row: item.row.start
        })
      }

      this.extendPointLeftAndPush({
        column: item.column.start,
        row: item.row.end
      })
    }
    this.orderArea(/** 区域排序 */)
    this.mergeArea(/** 区域合并 */)
    this.removeMarkArea(/** 区域移出 */)
  }

  parseArea (item) {
    const { rowspan, colspan, ...other } = item
    if (rowspan > this.#max - 1 || colspan > this.#max - 1) {
      throw new Error('数据异常，请检查。')
    }
    const result = { ...other }
    let storage = false

    for (const point of this.pointList) {
      const { row, column } = point
      if (point.discarded === true) { continue }
      if (storage === true) { break }
      if (column + colspan > this.#max) { continue }

      const temp = {
        row: { start: row, end: row + rowspan },
        column: { start: column, end: column + colspan }
      }
      if (this.crossArea(temp)) { continue }
      Object.assign(result, temp)
      point.discarded = storage = true
    }
    return result
  }
}

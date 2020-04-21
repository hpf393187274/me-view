
class Watermark {
  #id = '1.23452384164.123412416'
  #canvas
  createCanvas (value) {
    // 创建一个画布
    if (this.#canvas) { return }
    this.#canvas = document.createElement('canvas')
    // 设置画布的长宽
    this.#canvas.width = 300
    this.#canvas.height = 150

    const cans = this.#canvas.getContext('2d')
    // 旋转角度
    cans.rotate(-15 * Math.PI / 180)
    cans.font = '18px Vedana'
    // 设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.40)'
    // 设置文本内容的当前对齐方式
    cans.textAlign = 'left'
    // 设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle'
    // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(value, this.#canvas.width / 8, this.#canvas.height)
  }

  createDiv () {
    if (document.getElementById(this.#id)) { return }
    const div = document.createElement('div')
    div.id = this.#id
    div.style.pointerEvents = 'none'
    div.style.top = '10px'
    div.style.left = '10px'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + this.#canvas.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
  }

  init (value) {
    this.createCanvas(value)
    this.createDiv()
  }
}

export default new Watermark()

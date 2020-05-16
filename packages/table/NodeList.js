import Node from 'me-view/src/script/node'
import Tools from 'me-view/src/script/tools'
import Assert from 'me-view/src/script/assert'
export default class NodeList {
  #container = []

  get container () { return this.#container }

  pushAll (container, clear = false) {
    this.clear === true && this.clear()

    for (const item of container) {
      this.add(item)
    }
  }

  push (node, clear = false) {
    this.clear === true && this.clear()
    if (node instanceof Node) {
      this.#container.push(node)
      return
    }
    this.#container.push(new Node({ data: node }))
  }

  remove (value) {
    Assert.notBlank(value, 'value is blank')
    Tools.arrayRemove(this.#container, ({ uniqueValue }) => uniqueValue === value)
  }

  get (value) {
    return this.#container.find(({ uniqueValue }) => uniqueValue === value)
  }

  clear () {
    this.#container = []
  }
}

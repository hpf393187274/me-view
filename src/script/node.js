export default class Node {
  #uniqueValue
  #component
  #data

  #checked = false

  set uniqueValue (value) { this.#uniqueValue = value }
  set component (value) { this.#component = value }
  set checked (value) { this.#checked = value }

  get uniqueValue () { return this.#uniqueValue }
  get component () { return this.#component }
  get checked () { return this.#checked }
  get data () { return this.#data }

  constructor ({ data } = {}) {
    this.#data = data
  }

  // toString () {
  //   // return JSON.stringify({
  //   //   uniqueValue: this.uniqueValue,
  //   //   data: this.data,
  //   //   checked: this.checked
  //   // })

  //   return {
  //     uniqueValue: this.uniqueValue,
  //     data: this.data,
  //     checked: this.checked
  //   }
  // }
}

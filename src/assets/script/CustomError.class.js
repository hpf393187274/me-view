export default class CustomError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CustomError'
    console.debug(`${this.name}：`, message)
    Error.captureStackTrace(this, this.constructor)
  }
}

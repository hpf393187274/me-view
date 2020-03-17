export default class CustomError extends Error {
  constructor (message, data) {
    super(message)
    this.name = 'CustomError'
    console.debug(`${this.name}：${message}`, data)
    Error.captureStackTrace(this, this.constructor)
  }
}

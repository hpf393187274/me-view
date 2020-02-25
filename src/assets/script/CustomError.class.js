export default class CustomError extends Error {
  constructor (message) {
    super(message)
    console.error(message)
    this.name = 'CustomError'
    Error.captureStackTrace(this, this.constructor)
  }
}

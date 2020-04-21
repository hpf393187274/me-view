export default class CustomError extends Error {
  constructor (message, data) {
    super(message)
    this.name = 'CustomError'
    console.debug(`${this.name}：${message}; 目标值 = `, data)
    Error.captureStackTrace(this, this.constructor)
  }
}

window.CustomError = CustomError

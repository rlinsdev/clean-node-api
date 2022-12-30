module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('An Internal Error')
    this.name = 'ServerError'
  }
}

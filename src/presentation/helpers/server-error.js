module.exports = class serverError extends Error {
  constructor (paramName) {
    super('An Internal Error')
    this.name = 'ServerError'
  }
}

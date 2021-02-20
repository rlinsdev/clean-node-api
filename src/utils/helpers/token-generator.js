const jwt = require('jsonwebtoken')
const MissimParamError = require('../errors/missing-param-error')
module.exports = class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    // Lins, sem este código gerará o erro de unhandled error [no teste: Should throw if no secret is provided]
    if (!this.secret) {
      throw new MissimParamError('secret')
    }
    if (!id) {
      throw new MissimParamError('id')
    }
    return jwt.sign(id, this.secret)
  }
}

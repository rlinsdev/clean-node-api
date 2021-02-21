const MissimParamError = require('../../utils/errors/missing-param-error')
module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    if (!email) {
      throw new MissimParamError('email')
    }
    const user = await this.userModel.findOne({
      email
    }, {
      projection: {
        password: 1,
        email: 1
      }
    })
    return user
  }
}

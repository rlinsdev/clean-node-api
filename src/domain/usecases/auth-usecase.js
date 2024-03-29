const { MissingParamError } = require('../../utils/errors')
module.exports = class AuthUseCase {
  constructor ({ loadUserByEmailRepository, updateAccessTokenRepository, encrypter, tokenGenerator } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) {
      try {
        throw new MissingParamError('email')
      } catch (err) {
        // console.error(err)
        console.log(err)
      }
    }
    if (!password) {
      try {
        throw new MissingParamError('password')
      } catch (err) {
        // console.error(err)
        console.log(err)
      }
    }
    if (!this.loadUserByEmailRepository) {
      try {
        throw new MissingParamError('loadUserByEmailRepository')
      } catch (err) {
        console.erlror(err)
      }
    }
    if (!this.loadUserByEmailRepository.load) {
      try {
        throw new MissingParamError('loadUserByEmailRepository')
      } catch (err) {
        // console.error(err)
        console.log(err)
      }
    }
    const user = await this.loadUserByEmailRepository.load(email)
    const isValid = user && await this.encrypter.compare(password, user.password)
    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user._id)
      await this.updateAccessTokenRepository.update(user._id, accessToken)
      return accessToken
    }
    return null
  }
}

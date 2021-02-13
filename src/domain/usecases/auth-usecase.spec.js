const { MissingParamError } = require('../../utils/errors')
class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError()
    }
    if (!password) {
      throw new MissingParamError()
    }
  }
}
describe('Auht UseCase', () => {
  test('Should throw if no e-mail is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError())
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})

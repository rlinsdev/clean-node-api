const { MissingParamError } = require('../../utils/errors')
class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError()
    }
    if (!password) {
      throw new MissingParamError()
    }
    await this.loadUserByEmailRepository.load(email)
  }
}

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
  return { sut, loadUserByEmailRepositorySpy }
}

describe('Auht UseCase', () => {
  test('Should throw if no e-mail is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError())
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call loadUserByEmail repository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any@mail.com', 'anyPassword')
    expect(loadUserByEmailRepositorySpy.email).toBe('any@mail.com')
  })
})

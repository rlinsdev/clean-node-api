const { MissingParamError, InvalidParamError } = require('../../utils/errors')
class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository')
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      return null
    }
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

  test('Should throw if no repository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any@mail.com', 'anyPassword')
    expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if no repository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any@mail.com', 'anyPassword')
    expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })

  test('Should return null if loadUserByEmailRepository returns null', async () => {
    const { sut } = makeSut()
    const accesssToken = await sut.auth('invalid_email@mail.com', 'invalidPassword')
    expect(accesssToken).toBe(null)
  })
})

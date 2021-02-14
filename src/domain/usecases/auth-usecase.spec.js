const AuthUseCase = require('./auth-usecase')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

const makeSut = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashadPassword = hashedPassword
    }
  }
  const encrypterSpy = new EncrypterSpy()
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    password: 'hashed_password'
  }
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy)
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy
  }
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

  test('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accesssToken = await sut.auth('invalid_email@mail.com', 'validPassword')
    expect(accesssToken).toBe(null)
  })

  test('Should return null if an invalid password is provided', async () => {
    const { sut } = makeSut()
    const accesssToken = await sut.auth('valid_email@mail.com', 'invalidPassword')
    expect(accesssToken).toBe(null)
  })

  test('Should call encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth('valid_email@mail.com', 'any_Password')
    expect(encrypterSpy.password).toBe('any_Password')
    expect(encrypterSpy.hashadPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})

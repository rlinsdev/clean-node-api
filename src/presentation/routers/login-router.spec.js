const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-erro')
const Unauthorized = require('../helpers/unauthorized-erro')

// SuitUnderTest
const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)

  return {
    sut,
    authUseCaseSpy
  }
}
describe('Login router', () => {
  test('Should return 400 if no email is provider', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provider', () => {
    const { sut } = makeSut() // Suit under Test
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        body: new MissingParamError('email')
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest was passed', () => {
    const { sut } = makeSut() // Suit under Test

    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no Body', () => {
    const { sut } = makeSut() // Suit under Test
    const httpRequest = { }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut() // Suit under Test
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should 401 when invalid credentials are provided', () => {
    const { sut, authUseCaseSpy } = makeSut() // Suit under Test
    authUseCaseSpy.accessToken = null
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new Unauthorized())
  })

  test('Should 200 when valid credentials are provided', () => {
    const { sut, authUseCaseSpy } = makeSut() // Suit under Test
    authUseCaseSpy.accessToken = 'anyAccessToken'
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken)
  })

  test('Should 500 if no AuthUseCase was provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should 500 if AuthUseCase has no auth method', () => {
    class AuthUseCaseSpy { }
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})

const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-erro')
describe('Login router', () => {
  test('Should return 400 if no email is provider', () => {
    const sut = new LoginRouter() // Suit under Test
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
    const sut = new LoginRouter() // Suit under Test
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
    const sut = new LoginRouter() // Suit under Test

    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no Body', () => {
    const sut = new LoginRouter() // Suit under Test
    const httpRequest = { }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})

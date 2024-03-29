jest.mock('validator', () => ({
  isEmailValid: true,

  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}
))

const validator = require('validator')
const MissingParamError = require('../errors/missing-param-error')
const EmailValidator = require('./email-validator')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('any_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const anyEmail = 'any_email@mail.com'
    sut.isValid(anyEmail)
    expect(validator.email).toBe(anyEmail)
  })
  test('Should throw if no email is provided', () => {
    const sut = makeSut()
    // expect(sut.isValid).toThrow(new MissingParamError('email'))
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})

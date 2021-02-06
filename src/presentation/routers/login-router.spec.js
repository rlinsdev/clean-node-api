class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login router', () => {
  test('Should return 4000 if no email is provider', () => {
    const sut = new LoginRouter() // Suit under Test
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // expect(httpResponse.statusCode).expect.toBe(400)
  })
})

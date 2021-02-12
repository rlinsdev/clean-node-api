class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new Error()
    }
  }
}
describe('Auht UseCase', () => {
  test('Should throw if no e-mail is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow()
  })
})

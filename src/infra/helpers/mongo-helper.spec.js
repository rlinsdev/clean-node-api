const sut = require('./mongo-helper')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect when getCollection() is invoked and client is disconected', async () => {
    expect(sut.db).toBeTruthy()
    await sut.diconect()
    expect(sut.db).toBeFalsy()
    await sut.getCollection('users')
    expect(sut.db).toBeTruthy()
  })
})

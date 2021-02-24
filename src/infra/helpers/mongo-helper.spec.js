const sut = require('./mongo-helper')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect when getDb() is invocked and client is disconected', async () => {
    expect(sut.db).toBeTruthy()
    await sut.diconect()
    expect(sut.db).toBeFalsy()
    await sut.getDB()
    expect(sut.db).toBeTruthy()
  })
})

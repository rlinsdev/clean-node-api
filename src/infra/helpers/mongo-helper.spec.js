const MongoHelper = require('./mongo-helper')
describe('Mongo Helper', () => {
  test('Should reconnect when getDb() is invocked and client is disconected', async () => {
    const sut = MongoHelper
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.diconect()
    expect(sut.db).toBeFalsy()
    await sut.getDB()
    expect(sut.db).toBeTruthy()
  })
})

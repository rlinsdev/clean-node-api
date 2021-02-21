const { MongoClient } = require('mongodb')
module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db(dbName)
  },
  async diconect () {
    await this.client.close()
  },

  async getDB () {
    if (!this.client.isConnected()) {
      await this.connect(this.uri, this.dbName)
    }
    return this.db
  }
}

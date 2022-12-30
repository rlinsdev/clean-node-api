const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('../main/config/env')
MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    app.listen(env.port, () => {
      console.log('server running')
    })
  })
  //.catch(console.error)
  .catch(err){
    console.log(err)
  }

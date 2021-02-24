const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('../main/config/env')
MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    app.listen(5858, () => {
      console.log('server running')
    })
  })
  .catch(console.error)

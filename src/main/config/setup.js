const cors = require('../middleware/cors')
const JSONParser = require('../middleware/json-parser')
const contentType = require('../middleware/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(JSONParser)
  app.use(contentType)
}

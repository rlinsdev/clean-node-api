const cors = require('../middleware/cors')
const JSONParser = require('../middleware/json-parser')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(JSONParser)
}

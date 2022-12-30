const request = require('supertest')
const app = require('../config/app')

describe('JSON parser Middleware', () => {
  test('Should parser body as JSON', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_json_parser')
      .send({ name: 'Lins' })
      .expect({ name: 'Lins' })
  })
})

const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('Should enabled CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/test_cors')

    expect(res.headers['access-controll-allow-origin']).toBe('*')
    expect(res.headers['access-controll-allow-methods']).toBe('*')
    expect(res.headers['access-controll-allow-headers']).toBe('*')
  })
})

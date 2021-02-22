const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('Should desable x-powered-by header', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/test_x_powered_by')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })

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

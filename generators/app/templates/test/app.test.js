/* eslint-env jest */
const rp = require('request-promise')
const app = require('../src/app')

describe('application tests', () => {
  beforeAll(function (done) {
    this.server = app.listen(3030)
    this.server.once('listening', () => done())
  })

  afterAll(function (done) {
    this.server.close(done)
  })

  describe('404', function () {
    it('shows a 404 HTML page', () => {
      return rp({
        url: 'http://localhost:3030/path/to/nowhere',
        headers: {
          Accept: 'text/html'
        }
      }).catch(res => {
        expect(res.statusCode).toBe(404)
        expect(res.error.indexOf('<html>')).not.toBe(-1)
      })
    })

    it('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: 'http://localhost:3030/path/to/nowhere',
        json: true
      }).catch(res => {
        expect(res.statusCode).toBe(404)
        expect(res.error.code).toBe(404)
        expect(res.error.message).toBe('Page not found')
        expect(res.error.name).toBe('NotFound')
      })
    })
  })
})

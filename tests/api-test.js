'use strict'

const test = require('ava')
const request = require('supertest')

const server = require('../server')

test.serial.cb('/api/hotels', t => {
  request(server)
        .get('/api/hotels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, res) => {
          t.falsy(error, 'should not return an error')
          let body = res.body
          t.deepEqual(body, {}, 'response body should be the expected')
          t.end()
        })
})

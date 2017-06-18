/* eslint-env jest */
const MongoInMemory = require('mongo-in-memory')

beforeAll(done => {
  this.mongo = new MongoInMemory(27017)
  this.mongo.start(done)
})

afterAll(done => this.mongo.stop(done))

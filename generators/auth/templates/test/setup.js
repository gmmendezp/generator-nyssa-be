const MongoInMemory = require('mongo-in-memory')

module.exports = function () {
  let mongo = new MongoInMemory(27017)
  return new Promise((resolve, reject) => {
    mongo.start(resolve)
  })
}

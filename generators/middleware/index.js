'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(
      require.resolve('generator-feathers/generators/middleware')
    )
  }

  end () {
    return this.spawnCommand('npm', ['run', 'format'])
  }
}

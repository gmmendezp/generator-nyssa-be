'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(
      require.resolve('generator-feathers/generators/middleware')
    )
  }

  end () {
    return new Promise(resolve =>
      this.spawnCommand('npm', ['run', 'format']).on('exit', resolve)
    )
  }
}

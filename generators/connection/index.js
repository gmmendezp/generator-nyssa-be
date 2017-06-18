'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(
      require.resolve('generator-feathers/generators/connection')
    )
  }

  writing () {
    this.fs.copy(this.templatePath(), this.destinationPath('.'))
  }

  end () {
    return this.spawnCommand('npm', [
      'install',
      '-D',
      'mongo-in-memory'
    ]).on('exit', () => this.spawnCommand('npm', ['run', 'format']))
  }
}

'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: 'FeathersTest'
    }, {
      type: 'input',
      name: 'path',
      message: 'Path to use relative to the current folder',
      default: '.'
    }]).then(answers => {
      this.promptOptions = answers
    })
  }

  writing () {
    let path = this.promptOptions.path
    let name = this.promptOptions.name
    this.fs.copyTpl(this.templatePath(), this.destinationPath(path), { name })
    this.fs.copyTpl(this.templatePath('.*'), this.destinationRoot(), { name })
  }
}

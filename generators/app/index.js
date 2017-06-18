'use strict'
const Generator = require('yeoman-generator')
const transform = require('gulp-transform')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(require.resolve('generator-feathers'))
  }

  writing () {
    this.fs.copy(this.templatePath(), this.destinationPath('.'))
    this.fs.copy(this.templatePath('.*'), this.destinationRoot())
  }

  conflicts () {
    this.fs.copy(
      this.templatePath('test/app.test.js'),
      this.destinationPath('test/app.test.js')
    )
    this.fs.extendJSON('package.json', {
      scripts: {
        start: 'nodemon src/',
        test: 'jest --env=node',
        lint: 'standard --verbose | snazzy',
        format:
          'prettier --single-quote --no-semi --write "**/*.js" && standard --fix'
      },
      'lint-staged': {
        '*.js': [
          'prettier --single-quote --no-semi --write',
          'standard --fix',
          'git add'
        ]
      }
    })
    this.fs.delete(this.destinationPath('.eslintrc.json'))
    this.fs.delete(this.destinationPath('public'))
    this.registerTransformStream(
      transform(
        (contents, file) => {
          if (file.relative.includes('src/app.js')) {
            contents = contents.replace(
              /const favicon = require\('serve-favicon'\);\n/,
              ''
            )
            contents = contents.replace(
              /app.use\('\/', feathers.static\(app.get\('public'\)\)\);\n/,
              ''
            )
            contents = contents.replace(/\/\/ Host the public folder\n/, '')
            contents = contents.replace(
              /app.use\(favicon\(path.join\(app.get\('public'\), 'favicon.ico'\)\)\);\n/,
              ''
            )
          } else if (file.relative.includes('production.json')) {
            contents = contents.replace(/"host": "(.+)",/, '"host": "HOST",')
          } else if (file.relative.includes('default.json')) {
            contents = contents.replace(/ {2}"public": "..\/public\/",\n/, '')
          }
          return contents
        },
        {
          encoding: 'utf-8'
        }
      )
    )
  }

  end () {
    return this.spawnCommand('npm', [
      'uninstall',
      'mocha',
      'eslint',
      'serve-favicon'
    ]).on('exit', () =>
      this.spawnCommand('npm', [
        'i',
        '-D',
        'husky',
        'jest',
        'lint-staged',
        'nodemon',
        'prettier',
        'snazzy',
        'standard'
      ]).on('exit', () => this.spawnCommand('npm', ['run', 'format']))
    )
  }
}

'use strict'
const Generator = require('yeoman-generator')
const transform = require('gulp-transform')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(
      require.resolve('generator-feathers/generators/authentication')
    )
  }

  writing () {
    this.fs.copy(this.templatePath(), this.destinationPath('.'))
  }

  conflicts () {
    this.registerTransformStream(
      transform(
        (contents, file) => {
          if (/.*\.filters.*/.test(file.relative)) {
            contents = contents
              .split('\n')
              .filter(line => line && !line.includes('console'))
              .join('\n')
          } else if (/.*\.(test|spec).*/.test(file.relative)) {
            let beginning = ['/* eslint-env jest */']
            contents = contents
              .split('\n')
              .filter(line => !/require\('assert'\)/.test(line))
              .map(
                line =>
                  /assert.ok/.test(line)
                    ? `expect(${line.match(
                        /assert.ok\((.*), *['"].*['"]\)/
                      )[1]}).toBeTruthy()`
                    : line
              )
            contents = beginning.concat(contents).join('\n')
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
      'install',
      '-D',
      'mongo-in-memory'
    ]).on('exit', () => this.spawnCommand('npm', ['run', 'format']))
  }
}

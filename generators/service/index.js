'use strict'
const Generator = require('yeoman-generator')
const transform = require('gulp-transform')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(require.resolve('generator-feathers/generators/service'))
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
    return new Promise(resolve =>
      this.spawnCommand('npm', ['run', 'format']).on('exit', resolve)
    )
  }
}

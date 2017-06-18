'use strict'
const Generator = require('yeoman-generator')
const transform = require('gulp-transform')

module.exports = class extends Generator {
  initializing () {
    this.composeWith(
      require.resolve('generator-feathers/generators/hook')
    )
  }

  conflicts () {
    this.registerTransformStream(
      transform(
        (contents, file) => {
          console.log(file.relative)
          if (/.*\.(test|spec).*/.test(file.relative)) {
            let beginning = ['/* eslint-env jest */']
            contents = contents
              .split('\n')
              .filter(line => !/require\('assert'\)/.test(line))
              .map(line => {
                if (/assert.equal/.test(line)) {
                  let lineMatch = line.match(/assert.equal\((.*), *(.*), *['"].*['"]\)/)
                  line = `expect(${lineMatch[1]}).toBe(${lineMatch[2]})`
                }
                return line
              })
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
    this.spawnCommand('npm', ['run', 'format'])
  }
}

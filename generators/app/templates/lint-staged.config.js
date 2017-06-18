module.exports = {
  '*.js': [
    'prettier --single-quote --no-semi --write',
    'standard --fix',
    'git add'
  ]
}

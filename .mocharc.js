module.exports = {
    require: '@babel/register',
    spec: 'tests/**/*.js',
    ignore: 'tests/example.spec.js',
    file: 'tests/config/setup.js',
    timeout: '20000',
}

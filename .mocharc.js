module.exports = {
    require: '@babel/register',
    ignore: 'tests/example.spec.js',
    file: 'tests/config/setup.js',
    timeout: '20000',
}

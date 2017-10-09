module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: 'airbnb-base',
    globals: {
        __static: true
    },
    plugins: ['html'],
    'rules': {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'keyword-spacing': ['error', { 'overrides': {
            'if': { 'after': false },
            'for': { 'after': false },
            'while': { 'after': false },
            'catch': { 'after': false },
            'from': { 'before': true, 'after': true },
            'switch': { 'before': true, 'after': false },
        } }],
        'no-unused-expressions': [ 'error', {
            'allowTernary': true,
        }],
        'global-require': 0,
        'import/no-unresolved': 0,
        'no-param-reassign': 0,
        'no-shadow': 0,
        'import/extensions': 0,
        'import/newline-after-import': 0,
        'no-multi-assign': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production'
            ? 2
            : 0,
    }
}

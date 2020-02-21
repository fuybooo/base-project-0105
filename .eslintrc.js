module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'no-new-func': 0,
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 对象最后一个键值对后面的逗号可以保留（推荐保留）
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'indent': 'off',
    'template-curly-spacing': 0,
    'space-unary-ops': 0,
    'no-return-assign': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}

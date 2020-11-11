module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-console": "off",
    "no-debugger": "off",
    "no-eval": "off",
    "no-new-func": "off",
    "no-callback-literal": 0,
    "array-bracket-spacing": [2, "always"]
  }
}
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'camelcase': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    'jsx-quotes': ['error', 'prefer-double'],
  },
}

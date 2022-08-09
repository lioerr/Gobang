module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    './node_modules/eslint-plugin-react',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    },
  
};

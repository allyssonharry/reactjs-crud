module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prefer-const': 'off',
    'no-alert': 'off',
    'react/no-array-index-key': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'no-param-reassign': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-stateless-function': 'off',
    'no-console': 'off',
  },
};

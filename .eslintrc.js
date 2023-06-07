module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier', '@react-native-community'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    curly: 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': ['error', {endOfLine: 'off'}],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

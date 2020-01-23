module.exports = {
  globals: {
    VERSION: 'readonly',
    ROUTER_MODE: 'readonly',
    BUILD_TYPE: 'readonly',
    NODE_ENV: 'readonly'
  },
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/prettier',
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  ignorePatterns: ["**/*bitbox*", "*bitbox*"],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-else-return': ['error', { allowElseIf: true }],
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    semi: 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'security/detect-new-buffer': 'off',
    'security/detect-object-injection': 'off',
    'require-atomic-updates': 'off',
    'no-prototype-builtins': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['security']
};

import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  {
    ignores: ['*.d.ts', '**/coverage', '**/dist'],
  },

  {
    files: ['**/*.{ts,vue}'],

    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: globals.browser,

      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
  },

  eslintConfigPrettier,
)

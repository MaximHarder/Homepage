import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

const sharedRules = {
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-debugger': 'warn',
  'vue/html-self-closing': 'off',
  'vue/multi-word-component-names': 'off',
  '@typescript-eslint/no-explicit-any': 'warn',
}

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    // .vue braucht vue-eslint-parser; TypeScript nur im <script>-Block
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint,
    },
    rules: sharedRules,
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: sharedRules,
  },
]

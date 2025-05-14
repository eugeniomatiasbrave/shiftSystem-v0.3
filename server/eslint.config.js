import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'error'
    }
  },
  {
    ignores: ['node_modules/', 'logs/', 'performance/']
  }
]; 
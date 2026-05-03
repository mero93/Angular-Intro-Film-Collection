import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...angular.configs.tsRecommended,
  unicorn.configs['recommended'],
  prettierConfig,

  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },

  ...angular.configs.templateRecommended.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  ...angular.configs.templateAccessibility.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  prettier,

  globalIgnores(['out/**', 'build/**', 'node_modules/**', '.angular/**', '.vscode/**']),
]);

export default eslintConfig;

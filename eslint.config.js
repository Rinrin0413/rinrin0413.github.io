import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import svelteParser from 'svelte-eslint-parser';

export default tseslint.config(
	{
		ignores: [
			'.DS_Store',
			'node_modules/',
			'build/',
			'.svelte-kit/',
			'package/',
			'.env',
			'.env.*',
			'!.env.example',
			'*.js',
			'*.cjs',
			// Ignore files for PNPM, NPM and YARN
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	},

	js.configs.recommended,
	...tseslint.configs.recommended,
	...sveltePlugin.configs['flat/recommended'],
	prettierConfig,

	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2017
			},
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte']
			}
		},
		rules: {
			'@typescript-eslint/strict-boolean-expressions': 'error',
			eqeqeq: ['error', 'always'],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			]
		}
	},

	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte']
			}
		}
	}
);

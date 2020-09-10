module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
		browser: true,
		mocha: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
	},
	plugins: ['eslint-plugin-prettier'],
	extends: ['eslint:recommended', 'eslint-config-prettier'],
	rules: {
		'no-console': 'off',
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 90,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};

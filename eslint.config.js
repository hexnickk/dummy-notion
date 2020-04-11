module.exports = {
    parser: '@typescript-eslint/parser',
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: [
        'prettier',
        '@typescript-eslint'
    ],
    extends: [
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        'react/display-name': 'off',
        'react/prop-types': ['error', { ignore: ['children'] }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
    },
};

module.exports = {
    env: {
        test: {
            presets: ['@babel/preset-env'],
            plugins: [
                'transform-vue-jsx',
                '@babel/plugin-syntax-dynamic-import',
            ],
        },
    },
};

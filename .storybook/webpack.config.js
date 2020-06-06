// https://storybook.js.org/docs/configurations/custom-webpack-config/
module.exports = async ({ config, mode }) => {
    // https://vue-loader.vuejs.org/zh/guide/pre-processors.html#less
    config.module.rules = config.module.rules.concat([
        {
            test: /\.less$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'less-loader'
            ],
        },
        // https://github.com/storybookjs/storybook/tree/next/addons/storysource#prettierconfig
        {
            test: /\.stories\.jsx?$/,
            loaders: [
                {
                    loader: require.resolve('@storybook/source-loader'),
                    options: {
                        prettierConfig: {
                            printWidth: 100,
                            singleQuote: false,
                        },
                    },
                },
            ],
            enforce: 'pre',
        },
    ]);

    return config;
};

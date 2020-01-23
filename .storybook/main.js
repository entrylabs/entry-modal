const postcssPrefixer = require('postcss-prefixer');

module.exports = {
    stories: ['../stories/**/*.stories.js', '../src/**/*.stories.js'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: [
                            postcssPrefixer({
                                prefix: 'entry-modal-',
                            }),
                        ],
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        });

        return config;
    },
};

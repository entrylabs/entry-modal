const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPrefixer = require('postcss-prefixer');

const isProduction = process.env.NODE_ENV === 'production';
const FILENAME = 'entry-modal' + (isProduction ? '.min' : '');

const BANNER = [
    'ENTRY MODAL by @entrylabs',
    '@version ' + pkg.version + ' | ' + new Date().toDateString(),
    '@author ' + pkg.author,
    '@license ' + pkg.license,
].join('\n');

const config = {
    entry: {
        'entry/entry-modal': './src/styles/entry/index.scss',
        'line/entry-modal': './src/styles/line/index.scss',
        'entry-modal': './src/index.jsx',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'EntryModal',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$|\.js?$/,
                use: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
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
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: 'url-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json'],
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@hoc': path.resolve(__dirname, './src/hoc'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
    plugins: [
        new SafeUmdPlugin(),
        new FixStyleOnlyEntriesPlugin(),
        new webpack.BannerPlugin({
            banner: BANNER,
            entryOnly: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
};

module.exports = config;

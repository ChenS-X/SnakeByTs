const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const proPlugins = [];
if (isProd) {
    proPlugins.push(new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }))
}

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'postcss-preset-env'
                            ]
                        }
                    }
                }, 'sass-loader']
            },
            /*{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset'
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource'
            }*/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist'),
                toType: 'dir',
                filter: resourcePath => {
                    return !/\.html$/.test(resourcePath)
                }
            }]
        }),
        ...proPlugins
    ]
}
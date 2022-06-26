const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: false
        }),
        new CleanWebpackPlugin(),
        ...proPlugins
    ]
}
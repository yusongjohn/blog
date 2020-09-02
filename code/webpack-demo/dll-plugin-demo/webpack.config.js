const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    mode: 'production',
    // mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'index.js'), // tree-shaking 使用 sideEffects 方式
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            title: '管理输出'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(__dirname, 'dll-plugin/react.manifest.json'))
        }),
        new AddAssetHtmlWebpackPlugin([ // 会自动进行copy 并创建script标签添加到index.html中
            {
                filepath: path.resolve(__dirname, 'dll-plugin/react.dll.js'),
            },
        ]),
    ],
    module: {
        rules: []
    },
};

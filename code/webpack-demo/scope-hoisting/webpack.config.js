//使用 Node 内置的 path 模块，并在它前面加上 __dirname这个全局变量。可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    // mode: 'production',
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'index.js'),
    },
    optimization: {
        // concatenateModules: true // 方式一
    },
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(), // 方式2
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            title: '管理输出'
        }),
    ],
    module: {
        rules: []
    },
};

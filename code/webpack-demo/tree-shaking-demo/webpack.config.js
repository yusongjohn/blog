//使用 Node 内置的 path 模块，并在它前面加上 __dirname这个全局变量。可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // mode: 'production',
    mode: 'development',
    entry: {
        // app: path.resolve(__dirname, 'index-usedExports.js'), // tree-shaking 使用 usedExports 方式
        app: path.resolve(__dirname, 'index-sideEffects.js'), // tree-shaking 使用 sideEffects 方式
    },
    optimization: {
        // usedExports: true,// 模块内未使用的部分不进行导出
        sideEffects: true,
        // 方便查看构建的结果
        splitChunks: {
            cacheGroups: {
                vendor: {
                    minSize: 0,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
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
    ],
    devtool: 'inline-source-map',//用于开发环境
    module: {
        rules: []
    },
};

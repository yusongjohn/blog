const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/compare-cjs-and-esm/cjs/index.js',
    },
    // 出口文件配置项
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    optimization: {
        runtimeChunk: true,
    },
    mode: 'production',
    // 插件
    plugins: [
        new CopyWebpackPlugin(['./src/compare-cjs-and-esm/cjs/index.html'])
    ]

}
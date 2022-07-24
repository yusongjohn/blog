const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        cjsIndex: './src/compare-cjs-and-esm/cjs/index.js',
        esmIndex: './src/compare-cjs-and-esm/esm/index.js',
    },
    // 出口文件配置项
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    optimization: {
        minimize: false,
        runtimeChunk: true,
    },
    mode: 'none', // 默认有 模块内联 优化，取消优化
    // 插件
    plugins: [
        new CopyWebpackPlugin(['./src/compare-cjs-and-esm/cjs/cjsIndex.html','./src/compare-cjs-and-esm/esm/esmIndex.html'])
    ]

}
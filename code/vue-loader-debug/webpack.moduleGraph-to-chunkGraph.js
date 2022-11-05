const path = require('path')
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        A: './src/moduleGraph2chunkGraph/skippedItemsShrinkedCase/temp1/A.js',
        AA: './src/moduleGraph2chunkGraph/skippedItemsShrinkedCase/temp1/AA.js'
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
    plugins: [
        new CopyWebpackPlugin(['./src/moduleGraph2chunkGraph/skippedItemsShrinkedCase/index.html'])
    ],
    mode: 'none',
    watch: true,
}

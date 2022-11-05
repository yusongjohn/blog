const path = require('path')

module.exports = {
    entry: {
        main: './src/moduleParse/main.js',
    }, // 出口文件配置项
    output: {
        path: path.join(__dirname, 'dist'), filename: '[name].js',
    },
    optimization: {
        runtimeChunk: true,
    },
    mode: 'none',
    watch: true
}


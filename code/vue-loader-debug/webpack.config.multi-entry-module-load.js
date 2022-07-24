const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        main1: './src/multi-entry-module-load-test/main1.js',
        main2: './src/multi-entry-module-load-test/main2.js',
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
    mode: 'production',
    // devtool: 'cheap-source-map',
    mode: 'none',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            // 用正则匹配当前访问的文件的后缀名是  .css
            test: /\.css$/,
            use: ['style-loader', 'css-loader'] // webpack底层调用这些包的顺序是从右到左
        }]
    },
    // 插件
    plugins: [
        new CopyWebpackPlugin(['./src/multi-entry-module-load-test/index.html'])
    ]

}
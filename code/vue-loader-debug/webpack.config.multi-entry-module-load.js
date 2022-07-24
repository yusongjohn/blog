const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
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
        runtimeChunk: true,
    },
    // mode: 'production',
    mode: 'development',
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
        new VueLoaderPlugin()
    ]

}
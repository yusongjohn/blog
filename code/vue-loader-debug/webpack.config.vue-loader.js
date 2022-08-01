const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: {
        index: './src/vue-loader-test/index.js',
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
    ],
    watch: true,
}

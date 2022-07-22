const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: {
        index: './src/index.js',
    },
    // 出口文件配置项
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development', // 默认为production, 可以手动设置为development, 区别就是是否进行压缩混淆
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
//使用 Node 内置的 path 模块，并在它前面加上 __dirname这个全局变量。可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin'); // 构建manifest.json文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css文件的拆分
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//css文件的压缩
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app1: path.resolve(__dirname, 'index.js'),
    },
    optimization: {
        // 暂不确定这里对于文件缓存的好处？？(官方文档有说分离runtime和manifest对长效缓存有帮助
        runtimeChunk: 'single',//将 runtime 代码拆分为一个单独的 chunk

        // minimizer: [ // 如果设置了该属性，那么会覆盖mode:production自动压缩的配置，需要在这里手动配置：TerserPlugin
        //    /* new TerserPlugin(), */new OptimizeCSSAssetsPlugin({})
        // ],
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
        // 注意这里 hash和chunkhash的区别? hash应该是指最终所有构件产物的hash，而chunkhash则是每个chunk的hash值
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            title: '管理输出'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new ManifestPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.css$/,
                // v4 版本之后才开始使用 mini-css-extract-plugin，之前的版本是使用 extract-text-webpack-plugin
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
};

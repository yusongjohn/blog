const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 新增
module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js",
        chunk1: "./src/chunk1.js"
    },
    output: {
        filename: "[name].[contenthash].js"
    },
    module: { // 新增
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [ // 新增
        // 提取css插件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[contenthash].css"
        })
    ]
};

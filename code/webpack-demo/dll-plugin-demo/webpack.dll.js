const path = require("path");
const webpack = require("webpack");

const distPath = path.resolve(__dirname, 'dll-plugin');
module.exports = {
    mode: "production",
    entry: {
        react: ["react", "react-dom"]
    },
    output: {
        path: path.resolve(distPath),
        // 指定文件名
        filename: "[name].dll.js",
        //暴露全局变量的名称
        library: "[name]_dll_lib",
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(distPath, "[name].manifest.json"),
            name: "[name]_dll_lib",
        }),
    ],
};

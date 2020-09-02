参考
- [官方文档](https://webpack.js.org/concepts/)
- [掘进小册: 使用 webpack 定制前端开发环境](https://juejin.im/book/6844733709808041992/section/6844733709896122376)
- [webpack构建优化](https://juejin.im/post/6858905382861946894)

# 使用
1. code-spliting的几种方式
    - 通过entry传递多个入口，'手工'分离
    - webpack4之前可以使用 CommonsChunkPlugin，webpack4提供了 optimization.splitChunks
    - import() \ require.ensure
    
2. runtime & manifest.json 的作用
    - [参考: 官方](https://webpack.js.org/concepts/manifest/#root)
    - & 长效缓存: 分离runtime & manifest

3. dll、external、tree-shaking等实现，见相应demo

# hrm 原理
[参考](https://zhuanlan.zhihu.com/p/30669007)

# 原理
[webpack原理](https://segmentfault.com/a/1190000015088834)

[webpack流程](https://fed.taobao.org/blog/taofed/do71ct/webpack-flow/?spm=taofed.homepage.header.7.7eab5ac868z4yF)







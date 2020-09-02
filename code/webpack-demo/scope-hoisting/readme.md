- concatenate：连接(结)

- production mode 默认开启，其他模式是关闭的，按照以下方式手动开启
    - plugin: new webpack.optimize.ModuleConcatenationPlugin()
    - optimization.concatenateModules = true
    
- 优点
    - 代码体积会变小，因为函数声明语句(\_\_webpack__require__)会产生大量代码，开启后则没有了函数声明。
    - 代码在运行时因为创建的函数作用域减少了，所以内存开销就变小了。
           
- 降级处理
    - 使用非 ES6 模块或使用异步 import() 时，不会应用作用域提升，模块依然会拆分开
    - webpack时候带上 --display-optimization-bailout 参数，告诉哪个文件因为什么原因导致了降级处理
    - 有很多第三方库并没有使用ES6模块语法的代码，webpack它会降级处理这些非ES6编写的代码，不使用 Scope Hoisting 优化

- 参考
    - [参考](https://webpack.js.org/plugins/module-concatenation-plugin/#root)
    - [参考1](https://juejin.im/post/6844904003109650445) 
    - [参考2](https://www.cnblogs.com/tugenhua0707/p/9735894.html)



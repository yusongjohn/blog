[参考](https://juejin.im/post/6844903935812059144)

- hash: 所有输出结果整体的hash
- contenthash: 基于输出文件内容的hash
- chunkhash: 一个入口文件开始设计到所有的依赖模块称为chunk，但是其构建结果可能会被拆分为多个bundle

>hash 所有文件哈希值相同； chunkhash 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值； contenthash 计算与文件内容本身相关，主要用在css抽取css文件时。

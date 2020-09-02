import { cube } from './math.js' // 在这里只是引用了 cube 这个方法

console.log(cube(3),'tree-shaking-test');

// development环境下（没有开启压缩的情况下）不会去除无效代码，只是标识：如 unused harmony export square
// production环境下(开启压缩）才会去除dead code

// 注意点: 参考官网 https://webpack.js.org/guides/tree-shaking/#root
// 1. Use ES2015 module syntax (i.e. import and export).
// 2. Ensure no compilers transform your ES2015 module syntax into CommonJS modules (this is the default behavior of the popular Babel preset @babel/preset-env - see the documentation for more details).
// 3. Add a "sideEffects" property to your project's package.json file.
// 4. Use the production mode configuration option to enable various optimizations including minification and tree shaking.


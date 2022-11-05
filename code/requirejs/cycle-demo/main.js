// 循环依赖demo
define(['./cycleA'], function ( cycleA) {
    console.log(cycleA, '============================');
    return 'main.test_module'
});

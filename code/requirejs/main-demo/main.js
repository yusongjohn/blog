requirejs.config({
    paths: {}
});

define(['./A', './B'], function(moduleA, moudleB){
    return moduleA + moudleB;
});

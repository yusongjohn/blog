#!/usr/bin/env node --inspect-brk

const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    AsyncSeriesLoopHook
} = require("tapable");

// -------------- sync --------------
const synHook = new SyncHook(["arg1", "arg2", "arg3"]); // call时传递的参数
synHook.tap('test', function () {
    console.log(arguments)
})
synHook.tap('test', function () {
    console.log(arguments)
})

synHook.call('p1', 'p2')


const synBailHook = new SyncBailHook(); // call时传递的参数
synBailHook.tap('test', function () {
    console.log(1)
})

synBailHook.tap('test', function () {
    console.log(1)
})
synBailHook.call()

const synWaterHook = new SyncWaterfallHook(["arg1", "arg2", "arg3"]); // call时传递的参数
synWaterHook.tap('test', function () {
    console.log(1)
})

synWaterHook.tap('test', function () {
    console.log(1)
})
synWaterHook.call()

const synLoopHook = new SyncLoopHook(); // call时传递的参数
synLoopHook.tap('test', ()=>console.log(1))
synLoopHook.tap('test', ()=>console.log(1))
synLoopHook.call()

// -------------- asyncparallel --------------
const asyncParallelBailHook = new AsyncParallelBailHook(["arg1", "arg2", "arg3"]); // call时传递的参数
asyncParallelBailHook.tapAsync('test', function (arg1, arg2, arg3, callback) {
    callback()
})

asyncParallelBailHook.tapAsync('test', function (arg1, arg2, arg3, callback) {
    callback()
})

asyncParallelBailHook.callAsync('1', '2', '3', function (result) {

})

const asyncParallelHookPromise = new AsyncParallelHook();
asyncParallelHookPromise.tapPromise('test', () => new Promise(resolve => setTimeout(() => { resolve(1) }, 1000)))
asyncParallelHookPromise.tapPromise('test', () => new Promise(resolve => setTimeout(() => { resolve(2) }, 1000)))
const p1 = asyncParallelHookPromise.promise();


// -------------- asyncSeries --------------

// 异步状态由通过callback进行流转
const asyncSeriesHook = new AsyncSeriesHook();

asyncSeriesHook.tapAsync('test', (callback) => setTimeout(() => { callback(null, 1) }, 1000))
asyncSeriesHook.tapAsync('test', (callback) => setTimeout(() => { callback(null, 2) }, 1000))
asyncSeriesHook.callAsync((err, result) => console.log('执行结束'))

const asyncSeriesHookPromise = new AsyncSeriesHook();
asyncSeriesHookPromise.tapPromise('test', () => new Promise(resolve => setTimeout(() => { resolve(1) }, 1000)))
asyncSeriesHookPromise.tapPromise('test', () => new Promise(resolve => setTimeout(() => { resolve(2) }, 1000)))
const p = asyncSeriesHookPromise.promise();
const resolveHandler = () => { console.log('resolved') };
const rejectHandler = () => { console.log('rejected') }
p.then(resolveHandler, rejectHandler)


const asyncSeriesBailHook = new AsyncSeriesBailHook(["arg1", "arg2", "arg3"]); // call时传递的参数
asyncSeriesBailHook.tapAsync('test', function (arg1, arg2, arg3, callback) {
    callback()
})

asyncSeriesBailHook.tapAsync('test', function (arg1, arg2, arg3, callback) {
    callback()
})

asyncSeriesBailHook.callAsync('1', '2', '3', function () {
    console.log('---')
})


const asyncSeriesBailHookTapPomise = new AsyncSeriesBailHook(["arg1", "arg2", "arg3"]); // call时传递的参数
asyncSeriesBailHookTapPomise.tapPromise('test', function (arg1, arg2, arg3) {
    return new Promise((resolve) => {
        const timeoutHandler = () => resolve(1)
        setTimeout(timeoutHandler, 1000)
    })
});

asyncSeriesBailHookTapPomise.tapPromise('test', function (arg1, arg2, arg3) {
    return new Promise((resolve) => {
        const timeoutHandler = () => resolve(1)
        setTimeout(timeoutHandler, 1000)
    })
});

asyncSeriesBailHookTapPomise.promise('1', '2', '3');


const syncLoopHook = new SyncLoopHook();
syncLoopHook.tap('test', function () {
    console.log(1)
})

syncLoopHook.tap('test', function () {
    console.log(1)
})
syncLoopHook.call()


const asyncSeriesLoopHook = new AsyncSeriesLoopHook(['arg1']);
asyncSeriesLoopHook.tapPromise('test', function () {
    return new Promise((resolve) => {
        const timeoutHandler = () => resolve(1)
        setTimeout(timeoutHandler, 1000)
    })
})

asyncSeriesLoopHook.tapPromise('test', function () {
    return new Promise((resolve) => {
        const timeoutHandler = () => resolve(1)
        setTimeout(timeoutHandler, 1000)
    })
})
asyncSeriesLoopHook.promise()




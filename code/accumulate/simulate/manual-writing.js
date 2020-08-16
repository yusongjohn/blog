/**
 * --------------------------------
 * bind apply call new instanceof
 * --------------------------------
 */
Function.prototype.bind = function(context){
    const args = arguments.slice(1);
    const fn = this;
    return function F(){
        if (this instanceof F) {
            return new fn(...args, ...arguments)
        }
        return fn.apply(context, [...args, ...arguments])
    }
}

Function.prototype.myApply = function(context){
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window;
    context.fn = this;
    let result;
    // 处理参数和 call 有区别
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn;
    return result
}

Function.prototype.myCall = function(context){
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result
}

function _new(Constructor){
    let obj = {};
    obj.__proto__ = Constructor.prototype;
    let result = Constructor.apply(obj, arguments);
    return result instanceof Object ? result : obj
}

var newInstanceof = (obj, ctor) => {
    let proto = obj && obj.__proto__;
    while (proto) {
        if (proto === Constructor.prototype) {
            return true
        }
        proto = proto.__proto__;
    }

    return false;
}

/**
 * --------------------------------
 * 防抖: debounce 节流: throttle
 * --------------------------------
 */
// 第一个人说的算
// fn是我们需要包装的事件回调, interval是时间间隔的阈值
function throttle(fn, interval){
    // last为上一次触发回调的时间
    let last = 0;

    // 将throttle处理结果当作函数返回
    return function(){
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 记录本次触发回调的时间
        let now = +new Date();

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last >= interval) {
            // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
            last = now;
            fn.apply(context, args);
        }
    }
}

// 最后一个人说的算
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay){
    // 定时器
    let timer = null;

    // 将debounce处理结果当作函数返回
    return function(){
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;

        // 每次事件被触发时，都去清除之前的旧定时器
        if (timer) {
            clearTimeout(timer)
        }
        // 设立新定时器
        timer = setTimeout(function(){
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * --------------------------------
 * 瀑布流 + 懒加载
 * --------------------------------
 */
function lazyLoad(){
    // 关键点：
    const viewHeight = window.innerHeight || document.documentElement.clientHeight; // 可视区域高度
    const eleDis = domEle.getBoundingClientRect().top; // 元素顶部距离可视区域顶部距离高度
    if (viewHeight > eleDis) {
        // 加载
    }
}

// 等高布局的实现

// 电话号码的正则表达式

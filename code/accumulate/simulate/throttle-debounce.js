// 一段时间内有连续触发，以最后一次为准
function debounce(cb, t) {
    var instance;
    return function () {
        clearTimeout(instance);
        instance = setTimeout(cb, t)
    }
}

// 第一次执行之后，一段时间内不再执行
function throttle(cb, t) {
    var instance;
    return function () {
        if (!instance) {
            instance = setTimeout(function () {
                cb();
                instance = undefined;
            }, t)
        }
    }
}

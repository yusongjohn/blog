// apply第二个参数为数组
Function.prototype.myCall = function () {
    if (typeof this !== 'function') {
        throw new Error('...');
    }
    let context = arguments[0];
    let _this = context || window;
    _this.fn = this;
    let args = [...arguments].slice(1);
    let result = _this.fn(...args);
    delete _this.fn;
    return result;
};

// 支持 new 形式
Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
        throw new TypeError('xxx');
    }

    let foToBind = this;
    let _args = [...arguments].slice(1);
    let fNop = function () {
    };
    let fBound = function () {
        let _this = this instanceof fNop ? this : oThis;
        foToBind.apply(_this, _args.concat([...arguments]));
    };

    fNop.prototype = foToBind.prototype;
    fBound.prototype = new fNop();
    return fBound();
}

//简易版
Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
        throw new TypeError('xxx');
    }
    let fToBind = this;
    let _args = [...arguments].slice(1);

    return function () {
        fToBind.apply(oThis, _args.concat([...arguments]));
    }
}


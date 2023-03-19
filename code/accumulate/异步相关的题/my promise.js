const fulfilled = 'fulfilled';
const rejected = 'rejected';
const pending = 'pending'

function Promise(fn) {
    this.state = pending;
    this.fulfilledCbs = [];
    this.rejectedCbs = [];
    this.value = undefined;
    this.reason = undefined;

    function resolve(value) {
        if (this.state !== pending) return;
        this.value = value;
        this.state = fulfilled;

        this.fulfilledCbs.forEach(fn => fn(this.value))

    }
    function reject(e) {
        if (this.state !== pending) return;
        this.state = rejected
        this.reason = e;

        this.fulfilledCbs.forEach(fn => fn(this.reason))
    }

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function (fulfilledCb, rejectCb) {

    fulfilledCb = typeof fulfilledCb === 'function' ? fulfilled : value => value;
    rejectCb = typeof rejectCb === 'function' ? rejectCb : e => { throw e };

    if (this.state === fulfilled) {
        const p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = fulfilledCb();
                    this.resolvePromise(p2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
        return p2;
    }

    if (this.state === rejected) {

    }

    if (this.state === pending) {
        return new Promise(function (resolve, reject) {
            this.fulfilledCb.push(function (value) {
                setTimeout(() => fulfilledCb(value), 0)
            })
        })

    }

}

Promise.prototype.resolvePromise = function (p2, x, p2Resovle, p2Rject) {
    if (x === p2) {
        throw Error('');
    }

    if (x instanceof Promise) {
        x.then((y) => {
            this.resolvePromise(p2, y, p2Resovle, p2Rject);
        }, p2Rject)
    } else if (((typeof x === 'object' && x !== null) || typeof x === 'function') && typeof x.then === 'function') {
        
        //...

    } else {
        p2Resovle(x)
    }
}
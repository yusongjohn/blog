const state = {
    pending: 'pending',
    resovled: 'resolved',
    rejected: 'rejected'
}

function Promise(executor){
    this.state = state.pending;
    this.success = [];
    this.fail = [];

    function resolve(value){
        if (this.state === state.pending) {
            this.value = value;
            this.state = state.resovled;
            this.success.forEach(fn => fn())
        }
    }

    function rejected(value){

    }

    try {
        executor(resolve, rejected)
    } catch (e) {
        rejected(e);
    }
}

Promise.prototype.then = function(success, fail){
    if (typeof success !== 'function') success = value => value;
    if (typeof fail !== 'function') fail = reason => throw reason;
    const self = this;
    const p2 = new Promise((resolve, reject) => {
        if (this.state === state.resovled) {

        }
        if (this.state === state.rejected) {

        }

        if (this.state = state.pending) {
            self.success.push(function(){
                setTimeout(function(){
                    const x = success;
                    resolvePromise(p2, x, resolve, reject);
                }, 0)
            })

            self.fail.push()
        }

    })
    return p2;
}

function resolvePromise(p2, x, resolve, reject){
    if (x === p2) {
        reject(new Error('state self dependent'));
    }

    if (typeof x === 'object' || typeof x === 'function') {
        const then = x.then;
        if (then && typeof then === 'function') {
            let used = false;
            try {
                x.then(function(value){
                    if (used) return;
                    used = true;
                    resolvePromise(p2, value, resolve, reject)
                }, function(reason){
                    if (used) return;
                    used = true;
                    reject(reason);
                })
            } catch (e) {
                reject();
            }
        } else {
            resolve(x)
        }
    } else {
        resolve(x);
    }
}

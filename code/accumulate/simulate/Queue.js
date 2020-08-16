class Queue {
    constructor() {
        this.queue = [];
    }

    task(time, callBack) {
        this.queue.push([time, callBack]);
        return this;
    }

    start() {
        this.queue.forEach(function (item) {
            setTimeout(item[1], item[0])
        })
    }
}

(new Queue()).task(1000, function () {
    console.log(1)
}).task(3000, function () {
    console.log(2)
}).task(4000, function () {
    console.log(3)
}).start();

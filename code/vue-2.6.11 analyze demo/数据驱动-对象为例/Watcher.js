import Dep from "./Dep.js";

let uid = 0;
const watcherStack = [];

function noop() {
}

export default class Watcher {
    constructor(fn = noop, cb = noop) {
        this.deps = []
        this.id = `Watcher_${uid++}`;

        this.getter = fn
        this.cb = cb;
        this.value = this.get();
    }

    get() {
        this.pushTarget();
        const value = this.getter(); // 这里面读取响应式数据，则会进行依赖收集
        this.popTarget();
        this.cleanupDeps();
        return value;
    }

    pushTarget() {
        watcherStack.push(this)
        Dep.currentWatcher = this;
    }

    popTarget() {
        watcherStack.pop()
        Dep.currentWatcher = watcherStack.length ? watcherStack[watcherStack.length - 1] : null
    }

    addDep(dep) {
        if (this.deps.findIndex(item => item === dep) >= 0) {
            return
        }
        this.deps.push(dep)
        dep.addSub(this);
    }

    cleanupDeps() {
        console.log('更新和清理新旧依赖')
    }

    update(dep) {
        const oldValue = this.value;
        this.value = this.get();

        this.cb(oldValue, this.value);
        console.log(`${this.id}_${dep.id}, changed`);
    }
}

class CustomEventEmitter {
    private center = {}

    // 订阅通知
    addListener(type: string, fn: (...args: any) => void) {
        if (!this.center[type]) {
            this.center[type] = []
        }
        this.center[type].push(fn)
    }

    // 取消订阅
    removeListener(type) {
        if (!type) {
            this.center = {}
        }
        this.center[type] = []
    }

    // 发送通知
    trigger(type, ...args) {
        const fns = this.center[type]
        if (!fns || fns.length <= 0) {
            return
        }
        fns.forEach(fn => fn.apply(this, args));
    }
}

const customEventEmitter = new CustomEventEmitter;
customEventEmitter.addListener('eventA', () => { console.log('eventA') })
customEventEmitter.trigger('eventA', () => { console.log('eventA') })
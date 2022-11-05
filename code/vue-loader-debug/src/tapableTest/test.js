const { SyncHook } = require("tapable");

class Somebody {
    constructor() {
        this.hooks = {
            sleep: new SyncHook(),
        };
    }
    sleep() {
        //   触发回调
        this.hooks.sleep.callAsync((err) => {
            if (err) {
                console.log(`interrupt with "${err.message}"`);
            }
        });
    }
}

const person = new Somebody();

// 注册回调
person.hooks.sleep.tap("test", (cb) => {
    console.log("callback A");
    throw new Error("我就是要报错");
});
// 第一个回调出错后，后续回调不会执行
person.hooks.sleep.tap("test", () => {
    console.log("callback B");
});

person.sleep();

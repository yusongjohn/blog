import {observe} from "./observe.js";
import Watcher from "./Watcher.js";
import {set, del} from "./api.js";

function main_1() {
    const data = {
        a: 'a',
        b: {
            c: 'c'
        }
    }
    // 让数据变成响应式，即具备观察者模式的能力
    observe(data);

    console.log('建立双向关系------------')
    // 建立双向关系（依赖（或者主题的）订阅者、观察者的依赖（或者订阅的主题）
    new Watcher(function () {
        console.log('watcher.fn_1 读取数据，建立双向关系', JSON.stringify(data.b));

        // 嵌套
        new Watcher(function () {
            console.log('watcher.fn_2 读取数据，建立双向关系', JSON.stringify(data.a));
        }, function () {
            console.log('watcher.cb_2 数据变更回调', JSON.stringify(data.a))
        });

    }, function () {
        console.log('watcher.cb_1 数据变更回调', JSON.stringify(data.b))
    });

    console.log('派发更新------------watcher_1')
    // 派发跟新
    data.b = {d: 'd'}
    console.log('派发更新------------watcher_2')
    data.a = 'a_1'

    // data.c = 'c';
    // set(data.b, 'c1', 'c1')
}

// main_1();

function main_2() {
    const data = {
        a: 'a',
        b: {
            c: 'c'
        }
    }
    // 让数据变成响应式，即具备观察者模式的能力
    observe(data);

    new Watcher(function () {
        console.log(data)
        // console.log(data.b) // 属性b变更，以及属性b指向对象新增或者删除属性
    }, function () {
        console.log('set/del 数据变更回调', JSON.stringify(data))
    })

    // console.log('常规新增属性------')
    // data.b.e = 'e' // 新增属性

    // console.log('api新增属性------')
    // set(data.b, 'd', 'd')

    // set(data, 'e', 'e')

}

// main_2()

function main_3() {
    const data = {
        arr_1: [1, 2, 3],
        arr_2: [1, 2, 3]
    }

    observe(data)
    // debugger
    new Watcher(function () {
        console.log('数组更新回调 读取数据，建立双向关系', JSON.stringify(data.arr_1, data.arr_2));
    }, function () {
        console.log('数组更新回调', JSON.stringify(data))
    })

    console.log('更新对象属性-------begin')
    data.arr_1[1] = 'x' // 不是响应性的
    console.log('-----------------------')
    data.arr_1.length = 2 // 不是响
    console.log('更新对象属性-------end')

    // console.log('数组添加新元素-------begin')
    const newLength = 2;
    set(data.arr_2, 1, 'x');
    console.log('-----------------------')
    data.arr_2.splice(newLength) // 等价于 data.arr.length = newLength
    // console.log('数组添加新元素-------end')
}

main_3();
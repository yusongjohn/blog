import {defineReactive} from "./observe.js";

function isValidArrayIndex(val) {
    const n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function set(data, key, val) {
    //... 数组场景
    if (Array.isArray(data) && isValidArrayIndex(key)) {
        data.length = Math.max(data.length, key)
        data.splice(key, 1, val)
        return val
    }

    if (key in data && !(key in Object.prototype)) {
        data[key] = val
        return val
    }
    const ob = (data).__ob__
    if (!ob) {
        data[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}

export function del(data, key) {
    if (Array.isArray(data) && isValidArrayIndex(key)) {
        data.splice(key, 1)
        return
    }
    const ob = data.__ob__
    if (!hasOwn(data, key)) {
        return
    }
    delete data[key]
    if (!ob) {
        return
    }
    ob.dep.notify()
}
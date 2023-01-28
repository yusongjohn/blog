import { defineReactive } from "./observe.js";

export function set(data, key, val) {
  //... 数组场景

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

export function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target).__ob__
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}
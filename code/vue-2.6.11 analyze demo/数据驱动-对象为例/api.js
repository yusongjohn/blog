import {defineReactive} from "./observe.js";

export function set(watcher, key, val) {
  if (key in watcher && !(key in Object.prototype)) {
    watcher[key] = val
    return val
  }
  const ob = (watcher).__ob__

  if (!ob) {
    watcher[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

export function del(watcher, key) {
  const ob = (watcher).__ob__
  if (watcher.hasOwnProperty(key)) {
    return
  }

  delete watcher[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

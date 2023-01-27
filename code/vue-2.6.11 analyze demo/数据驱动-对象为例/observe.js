import Dep from "./Dep.js";

function isPlainObject(obj) {
  return obj.toString() === '[object Object]'
}

export function observe(value) {
  if (!isPlainObject(value)) {
    return
  }
  let ob
  if (value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (Object.isExtensible(value)) {
    ob = new Observer(value)
  }
  return ob
}

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()

    // 这里添加的属性不应被枚举
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true
    })

    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      defineReactive(obj, key, obj[key])
    }
  }
}

export function defineReactive(obj, key, val) {
  // obj[key]的getter/setter 通过闭包来关联一个依赖
  // 可以认为这个dep的状态就是这个属性的数据状态
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  const getter = property && property.get
  const setter = property && property.set

  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      const value = getter ? getter.call(obj) : val

      if (Dep.currentWatcher) {
        Dep.currentWatcher.addDep(dep) // 这个dep是当前方法提供的
        childOb && Dep.currentWatcher.addDep(childOb.dep) // childOb.dep是Observer实例上的
      }

      return value
    },
    set: function (newVal) {
      const value = getter ? getter.call(obj) : val

      if (newVal === value || (newVal !== newVal && value !== value)) { // 后者是为了判断 NaN
        return
      }

      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

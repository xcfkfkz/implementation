const arrayProto = Array.prototype
// 创建一个对象作为拦截器
const arrayMethods = Object.create(arrayProto)
// 改变数组自身内容的7个方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function (method) {
  const original = arrayProto[method]      // 缓存原生方法
  Object.defineProperty(arrayMethods, method, {
    enumerable: false,
    configurable: true,
    writable: true,
    value:function mutator(...args) {
      const result = original.apply(this, args)
      return result
    }
  })
})
const hasProto = '__proto__' in {};
function protoAugment (target, src, keys) {
  target.__proto__ = src
}
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    Object.defineProperty(target, key, {
      value: src[key],
      writable: true,
      configurable: true,
      enumerable: true
    })
  }
}
class Observer {
  // delete或新增属性时，无法observe
  constructor (value) {  // 观测value内的各个属性，value本身的变化观测不到
    this.value = value
    // 给value新增一个__ob__属性，值为该value的Observer实例
    // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
    Object.defineProperty(value, '__ob__', this)
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment;
      augment(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }
  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}
function defineReactive (obj,key,val) {
  // 如果只传了obj和key，那么val = obj[key]
  if(arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object') { // 也支持Array的观测
    new Observer(val)
  }
  const dep = new Dep(); //闭包保存Watcher实例的数组
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if(val === newVal) {
        return
      }
      val = newVal;
      dep.notify()
    }
  })
}
function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // 添加一个依赖
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知所有依赖更新
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
const bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn)
    this.value = this.get()
  }
  get () {
    window.target = this;
    const vm = this.vm
    let value = this.getter.call(vm, vm)
    window.target = undefined;
    return value
  }
  update () {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}
// 数组的observer，可以实现对新增元素的观测，通过改写push方法

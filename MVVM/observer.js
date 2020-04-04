class Dep {
  constructor() {
    this.deps = []
  }
  addDep(watcher) {
    this.deps.push(watcher)
  }
  notify(newVal) {
    this.deps.forEach(watcher => watcher.update(newVal))
  }
}
class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    if(typeof data !== 'object') return;
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key])
    })
  }
  defineReactive(obj, key, value) {
    let deps = new Dep();
    Object.defineProperty(obj, key, {
      get: () => {
        Dep.target && deps.addDep(Dep.target);
        Dep.target = null;
        return value
      },
      set: (newVal) => {
        value = newVal;
        deps.notify(value)
       }
    })
  }
}

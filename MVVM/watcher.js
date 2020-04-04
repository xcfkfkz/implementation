const CompileUtil = {
  getVal(vm, path) {
    return path.split('.').reduce((pre, cur) => {
      return pre[cur]
    }, vm.$data)
  },
  text(node, vm, expr) {
    new Watcher(vm, node, expr, this.updater.textUpdater);
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
}
class Watcher {
  constructor(vm, node, expr, cb) {
    Dep.target = this;
    this.node = node;
    this.value = CompileUtil.getVal(vm, expr);
    this.cb = cb;
    this.cb(node, this.value)
  }
  update(node, newVal) {
    console.log('UPDATE');
    if(this.value !== newVal) {
      this.cb(this.node, newVal);
    }
  }
}
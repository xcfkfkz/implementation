//获取一个唯一标识
function getUid() {
  return Math.random().toString(36)
}
//在对象中属性是否存在
function has(obj,value) {
  return obj.hasOwnProperty(value)
}
//为一个对象添加key属性
function hide(obj, value) {
  Object.defineProperties(obj, {
    [Symbol.for('mapKey')]: {
      value: value,
      writable: true
    }
  })
}
//是否为一个对象
function isObject(it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
}
//获取map某数据key值
function fastKey(it, create) {
  if(!isObject(it)) {
    return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  }
  if(has(it, Symbol.for('mapKey'))) {
    return it[Symbol.for('mapKey')]
  } else {
    if(create) {
      var uid = getUid()
      hide(it, uid)
      return uid
    } else {
      return false
    }
  }
}
//获取map某个数据的实体
function getEntry(that, key) {
  let index = fastKey(key)
  if(index) {
    return that.data[index]
  }
  return false
}
//声明map对象
function myMap() {
  this.data = {}
  this.size = 0
}
//get方法
myMap.prototype.get = function(key) {
  let entry = getEntry(this, key)
  if(entry) {
    return entry.v
  }
  return false
}
//清除方式
myMap.prototype.clear = function() {
  this.data = {}
  this.size = 0
}
//是否存在
myMap.prototype.has = function(key) {
  let entry = getEntry(this, key)
  return entry ? true : false
}
//删除
myMap.prototype.remove = function(key) {
  let entry = getEntry(this, key)
  if(entry) {
    delete this.data[entry.i]
    this.size--;
    return true
  }
  return false
}
//添加
myMap.prototype.set = function(key, value) {
  let entry = getEntry(this, key)
  if(entry) {
    entry.v = value
  } else {
    var index = fastKey(key, true)
    this.data[index] = {
      i: key,
      v: value
    }
    this.size++
  }
}
//获取大小
myMap.prototype.size = function() {
  return this.size
}



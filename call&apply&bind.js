Function.prototype.mycall = function () {
  arguments[0].fn = this;
  let result = arguments[0].fn(...[...arguments].slice(1));
  delete arguments[0].fn;
  return result;
}
// 实现 (5).add(3).minus(2)
Number.prototype.add = function (m) {
  return this + m;
}
Number.prototype.minus = function (n) {
  return this - n;
}
~ function () {
  function add(m) {
    return this + m;
  }
  function minus(n) {
    return this - n;
  }
  ['add', 'minus'].forEach(v => {
    Number.prototype[v] = eval(v)
  })
}();

// 字符串大小写取反
function f(str) {
  let arr = str.split('').map(v => v.charCodeAt());
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > 64 && arr[i] < 91) {
      arr[i] = String.fromCharCode(arr[i] + 32)
    } else if(arr[i] > 96 && arr[i] < 123) {
      arr[i] = String.fromCharCode(arr[i] - 32)
    } else {
      arr[i] = String.fromCharCode(arr[i])
    }
  }
  return arr.join('')
}

// 模拟实现replace

// 数组扁平化，并去重、升序排序
// Array.prototype.flat(Infinity)
// arr.toString().split(',').map(v => parseInt(v))
// JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(v => parseInt(v))
// while(arr.some(v => Array.isArray(v))) { arr = [].concat(...arr) }
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    if(Array.isArray(cur)) return pre.push(...flatten(cur)) && pre;
    return pre.push(cur) && pre;
  }, [])
}
function mySet(arr) {
  let hash = {}, newArr = [];
  for(let v of arr) {
    if(hash[v]) continue;
    hash[v] = true && newArr.push(v);
  }
  return newArr;
}
function currying(fn) {
  let args1 = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn(...args1, ...arguments);
  }
};
function currying(fn, ...args1) {
  return function (...args2) {
    return fn(...args1, ...args2);
  }
}
function currying(fn) {
  return function (...args1) {
    return function (...args2) {
      return fn(...args1, ...args2);
    }
  }
}
function true_currying(fn) {
  let args = [];
  return function () {
    args.push(...arguments);
    if (args.length < fn.length) {
      return arguments.callee;
    } else {
      return fn(...args);
    }
  }
}
function true_currying(fn) {
  return function f() {
    let args = arguments;
    if(args.length < fn.length) {
      return function () {
        return f(...[...args, ...arguments]);
      }
    } else {
      return fn(...args);
    }
  }
}
function true_currying(fn) {
  return function f(...args1) {
    if(args1.length < fn.length) {
      return function (...args2) {
        return f(...args1, ...args2);
      }
    } else {
      return fn(...args1);
    }
  }
}
const curry = fn =>
  (judge = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg));

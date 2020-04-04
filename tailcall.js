//求和1+2+3+...+n
function sum(n) {
  if(n === 1) return 1;
  // sum(n) = sum(n - 1) + n;
  return sum(n - 1) + n; //acc
}

function tailSum(n, acc = 0) {
  if(n === 1) return acc + 1;
  //n = n - 1;
  //acc_n = acc_n-1 + n;
  //return tailSum(n, acc);
  return tailSum(n - 1, acc + n);
}

//fibonacci数列
function fibonacci(n) {
  if(n === 0 || n === 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
function tailFibonacci(n, acc_pre = 0, acc_cur = 1) {
  if(n === 1) return acc_cur;
  return tailFibonacci(n - 1, acc_cur, acc_pre + acc_cur)
}
// n=1, fn(1,0,1) 1
// n=2, fn(2,0,1) fn(1,1,1) 1
// n=3, fn(3,0,1) fn(2,1,1) fn(1,1,2) 2
// n=4, fn(4,0,1) fn(3,1,1) fn(2,1,2) fn(1,2,3) 3
function loopSum(n) {
  let acc = 0;
  while(n > 0) {
    acc = acc + n;
    n--;
  }
  return acc;
}
//蹦床函数
function curriedSum(n, acc = 0) {
  if(n === 1) return acc + 1;
  return function () {
    return curriedSum(n - 1, acc + n);
  }
}
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while(typeof result === 'function') {
      result = result();
    }
    return result;
  }
}
//
function time_sum(n, cb, acc = 0) {
  if(n === 1) return cb(acc + 1);
  setTimeout(function () {
    return time_sum(n - 1, cb, acc + n);
  }, 0)
}
time_sum(1000, v => console.log(v));
//
function promise_sum(n, cb, acc = 0) {
  if(n === 1) return cb(acc + 1);
  Promise.resolve().then(function () {
    return time_sum(n - 1, cb, acc + n);
  })
}
promise_sum(1000, v => console.log(v));


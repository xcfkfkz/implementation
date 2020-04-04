//立即执行
function debounce(fn, wait) {
  let timeoutID;
  return function () {
    if(timeoutID) clearTimeout(timeoutID);
    if(!timeoutID) fn.call(this);
    timeoutID = setTimeout(() => {
      timeoutID = null;
    }, wait)
  }
}
//延迟执行
function debounce(fn, wait) {
  let timeoutID;
  return function () {
    if(timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      timeoutID = null;
      fn.call(this);
    }, wait)
  }
}
//延迟执行
function debounce(fn, wait) {
  let timeoutID;
  return function () {
    if(timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(fn.bind(this), wait)
  }
}
//延迟执行
function throttle(fn, wait) {
  let timeoutID;
  return function () {
    if(!timeoutID) {
      timeoutID = setTimeout(() => {
        timeoutID = null;
        fn.call(this);
      }, wait)
    }
  }
}
//立即执行
function throttle(fn, wait) {
  let timeoutID;
  return function () {
    if(!timeoutID) {
      fn.call(this);
      timeoutID = setTimeout(() => {
        timeoutID = null;
      }, wait)
    }
  }
}
function throttle(fn, wait) {
  let prev = 0;
  return function () {
    let now = Date.now();
    if(now - prev > wait) {
      fn.call(this);
      prev = now;
    }
  }
}
function myInterval(fn, wait) {
  setTimeout(function () {
    fn();
    setTimeout(arguments.callee, wait)
  }, wait)
}


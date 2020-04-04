//继承
function inherit(target, origin) {
  target.prototype.__proto__ = origin.prototype;
}
function inherit(target, origin) {
  Object.setPrototypeOf(target.prototype, origin.prototype);
}
function inherit(target, origin) {
  target.prototype = Object.create(origin.prototype);
  target.prototype.constructor = target;
}
let inherit = function () {
  function F() {};
  return function (target, origin) {
    F.prototype = origin.prototype;
    target.prototype = new F();
    target.prototype.constructor = target;
  }
}();
module.exports = inherit;

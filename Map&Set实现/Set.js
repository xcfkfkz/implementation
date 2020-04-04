(function(global) {
  // 在Set中，+0 === -0 true，NaN === NaN true
  // x === y || Object.is(x, y)
  var NaNSymbol = Symbol('NaN');

  var encodeVal = function(value) {
    return value !== value ? NaNSymbol : value;
  }

  var decodeVal = function(value) {
    return (value === NaNSymbol) ? NaN : value;
  }

  function Set(data) {
    this._values = [];
    this.size = 0;
    data.forEach((item) => {
      this.add(item);
    })

  }

  Set.prototype['add'] = function(value) {
    value = encodeVal(value);
    if (this._values.indexOf(value) == -1) {
      this._values.push(value);
      ++this.size;
    }
    return this;
  }

  Set.prototype['has'] = function(value) {
    return (this._values.indexOf(encodeVal(value)) !== -1);
  }

  Set.prototype['delete'] = function(value) {
    var idx = this._values.indexOf(encodeVal(value));
    if (idx == -1) return false;
    this._values.splice(idx, 1);
    --this.size;
    return true;
  }

  Set.prototype['clear'] = function(value) {
    this._values = [];
    this.size = 0;
  }

  Set.prototype['values'] = Set.prototype['keys'] = function() {
    return this._values;
  }

  Set.prototype['entries'] = function() {
    return this._values.map((ele) => [ele, ele]);
  }

  Set.prototype[Symbol.iterator] = function() {
    return this._values[Symbol.iterator]();
  }

  Set.prototype['forEach'] = function(callbackFn, thisArg) {
    thisArg = thisArg || global;
    this._values.forEach(callbackFn, thisArg)
  }

  global.Set = Set;

})(this)
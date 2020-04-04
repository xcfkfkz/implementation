function objFlatten(data) {
  const flatted = Object.create(Object.getPrototypeOf(data));
  let acc_str = '';
  function obj_join(acc, cur) {
    if(acc === '') return cur;
    return `${acc}.${cur}`;
  }
  function arr_join(acc, cur) {
    return `${acc}[${cur}]`;
  }
  (function set_prop(obj) {
    let type = Object.prototype.toString.call(obj);
    function prop_join(o, join_method) {
      let keys = Object.keys(o);
      if(keys.length) {
        for(let key of keys) {
          let acc_str_temp = acc_str;
          acc_str = join_method(acc_str, key);
          set_prop(o[key]);
          acc_str = acc_str_temp;
        }
      } else {
        flatted[acc_str] = obj;
      }
    }
    switch (type) {
      case '[object Object]':
        prop_join(obj, obj_join);
        break;
      case '[object Array]':
      case '[object Set]':
        obj = Array.from(obj);
        prop_join(obj, arr_join);
        break;
      case '[object Map]':
        throw new TypeError();
        break;
      default:
        flatted[acc_str] = obj;
    }
  })(data);
  return flatted;
}


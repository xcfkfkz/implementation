// CommonJS规范
function myReq(path) {
  let fs = require('fs');
  let content = fs.readFileSync(path, 'utf8');
  let required = new Function('exports', 'module', 'require', '__dirname', '__filename', content + ';return module.exports');
  let module = {
    exports: {}
  }
  return required(module.exports, module, myReq, __dirname, __filename)
}

// AMD规范：require.js
// define声明模块，require使用模块
let factories = {};
function define(modName, dependencies, factory) {
  factory.dependencies = dependencies;
  factories[modName] = factory;
}
function require(mods, callback) {
  let results = mods.map((mod) => {
    let factory = factories[mod];
    let dependencies = factory.dependencies;
    // require(['name'], function (name, age) {})
    let exports = require(dependencies, function (...args) {
      return factory(...args)
    });
    return exports;
  });
  return callback.apply(null, results);
}




"use strict";
const uni_modules_uAjax_js_sdk_lib_utils = require("../utils.js");
function merge(obj1 = {}, obj2 = {}) {
  const obj = {};
  const objKeys = Object.keys({ ...obj1, ...obj2 });
  uni_modules_uAjax_js_sdk_lib_utils.forEach(objKeys, (prop) => {
    if (obj2[prop] !== void 0) {
      obj[prop] = uni_modules_uAjax_js_sdk_lib_utils.assign(obj1[prop], obj2[prop]);
    } else if (obj1[prop] !== void 0) {
      obj[prop] = uni_modules_uAjax_js_sdk_lib_utils.assign(void 0, obj1[prop]);
    }
  });
  return obj;
}
async function mergeConfig(...args) {
  let config = {};
  for (let i = 0, l = args.length; i < l; i++) {
    const current = typeof args[i] === "function" ? await args[i]() : args[i];
    config = merge(config, current);
  }
  config.method = config.method.toUpperCase();
  return config;
}
exports.mergeConfig = mergeConfig;

"use strict";
const _toString = Object.prototype.toString;
function isArray(val) {
  return _toString.call(val) === "[object Array]";
}
function isPlainObject(val) {
  return _toString.call(val) === "[object Object]";
}
function forEach(obj, fn) {
  if (obj === null || obj === void 0)
    return;
  if (typeof obj !== "object")
    obj = [obj];
  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        fn.call(null, obj[k], k, obj);
      }
    }
  }
}
function merge(...args) {
  const result = {};
  for (let i = 0, l = args.length; i < l; i++) {
    if (isPlainObject(args[i])) {
      forEach(args[i], (val, key) => {
        result[key] = assign(result[key], val);
      });
    }
  }
  return result;
}
function assign(target, source) {
  if (isPlainObject(target) && isPlainObject(source)) {
    return merge(target, source);
  } else if (isPlainObject(source)) {
    return merge({}, source);
  } else if (isArray(source)) {
    return source.slice();
  }
  return source;
}
exports.assign = assign;
exports.forEach = forEach;
exports.isArray = isArray;
exports.isPlainObject = isPlainObject;
exports.merge = merge;

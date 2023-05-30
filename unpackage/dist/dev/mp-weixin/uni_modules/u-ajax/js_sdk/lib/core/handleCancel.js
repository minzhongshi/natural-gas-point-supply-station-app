"use strict";
const CANCEL = Symbol("$$cancel");
function hasCancel(target) {
  return target === null || target === void 0 ? false : Object.prototype.hasOwnProperty.call(target, CANCEL);
}
function dispatchCancel(reason) {
  return Promise.reject({ [CANCEL]: reason });
}
function interceptCancel(rejected) {
  return rejected && ((response) => hasCancel(response) ? Promise.reject(response) : rejected(response));
}
function detachCancel(error) {
  return Promise.reject(hasCancel(error) ? error[CANCEL] : error);
}
exports.detachCancel = detachCancel;
exports.dispatchCancel = dispatchCancel;
exports.interceptCancel = interceptCancel;

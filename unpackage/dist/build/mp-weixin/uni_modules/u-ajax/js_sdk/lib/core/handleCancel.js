"use strict";const e=Symbol("$$cancel");function t(t){return null!=t&&Object.prototype.hasOwnProperty.call(t,e)}exports.detachCancel=function(r){return Promise.reject(t(r)?r[e]:r)},exports.dispatchCancel=function(t){return Promise.reject({[e]:t})},exports.interceptCancel=function(e){return e&&(r=>t(r)?Promise.reject(r):e(r))};
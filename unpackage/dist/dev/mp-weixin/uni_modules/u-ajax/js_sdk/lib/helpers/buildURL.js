"use strict";
const uni_modules_uAjax_js_sdk_lib_utils = require("../utils.js");
function combineURL(baseURL = "", relativeURL = "") {
  if (/^https?:\/\//.test(relativeURL))
    return relativeURL;
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function querystring(url, params) {
  let query;
  const parts = [];
  uni_modules_uAjax_js_sdk_lib_utils.forEach(params, (val, key) => {
    if (val === null || typeof val === "undefined")
      return;
    if (uni_modules_uAjax_js_sdk_lib_utils.isArray(val))
      key = key + "[]";
    else
      val = [val];
    uni_modules_uAjax_js_sdk_lib_utils.forEach(val, (v) => {
      if (v !== null && typeof v === "object") {
        v = JSON.stringify(v);
      }
      parts.push(encode(key) + "=" + encode(v));
    });
  });
  query = parts.join("&");
  if (query) {
    const hashmarkIndex = url.indexOf("#");
    hashmarkIndex !== -1 && (url = url.slice(0, hashmarkIndex));
    url += (url.indexOf("?") === -1 ? "?" : "&") + query;
  }
  return url;
}
function buildURL({ baseURL, url: relativeURL, params, query } = {}) {
  let url = combineURL(baseURL, relativeURL);
  if (!params && !query) {
    return url;
  }
  if (params) {
    if (/\/:/.test(url)) {
      uni_modules_uAjax_js_sdk_lib_utils.forEach(params, (val, key) => {
        url = url.replace(`/:${key}`, `/${encode(String(val))}`);
      });
    } else if (!query) {
      url = querystring(url, params);
    }
  }
  if (query) {
    url = querystring(url, query);
  }
  return url;
}
exports.buildURL = buildURL;

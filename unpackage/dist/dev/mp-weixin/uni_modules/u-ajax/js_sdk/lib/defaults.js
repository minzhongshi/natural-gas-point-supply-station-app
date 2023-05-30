"use strict";
const uni_modules_uAjax_js_sdk_lib_adapters_http = require("./adapters/http.js");
const uni_modules_uAjax_js_sdk_lib_utils = require("./utils.js");
const METHOD = ["get", "post", "put", "delete", "connect", "head", "options", "trace"];
const HEADER = ["common", ...METHOD];
const defaults = {
  adapter: uni_modules_uAjax_js_sdk_lib_adapters_http.adapter,
  header: {},
  method: "GET",
  validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300
};
uni_modules_uAjax_js_sdk_lib_utils.forEach(HEADER, (h) => defaults.header[h] = {});
exports.HEADER = HEADER;
exports.METHOD = METHOD;
exports.defaults = defaults;

"use strict";
const uni_modules_uAjax_js_sdk_lib_core_Ajax = require("./lib/core/Ajax.js");
const uni_modules_uAjax_js_sdk_lib_adapters_Fetcher = require("./lib/adapters/Fetcher.js");
const ajax = uni_modules_uAjax_js_sdk_lib_core_Ajax.Ajax();
ajax.create = function create(instanceConfig) {
  return uni_modules_uAjax_js_sdk_lib_core_Ajax.Ajax(instanceConfig);
};
ajax.Fetcher = uni_modules_uAjax_js_sdk_lib_adapters_Fetcher.Fetcher;
exports.ajax = ajax;

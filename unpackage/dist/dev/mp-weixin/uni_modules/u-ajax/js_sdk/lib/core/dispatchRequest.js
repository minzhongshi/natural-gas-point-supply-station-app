"use strict";
const uni_modules_uAjax_js_sdk_lib_helpers_buildURL = require("../helpers/buildURL.js");
const uni_modules_uAjax_js_sdk_lib_helpers_isCallback = require("../helpers/isCallback.js");
const uni_modules_uAjax_js_sdk_lib_utils = require("../utils.js");
const uni_modules_uAjax_js_sdk_lib_defaults = require("../defaults.js");
function dispatchRequest(config) {
  config.url = uni_modules_uAjax_js_sdk_lib_helpers_buildURL.buildURL(config);
  config.method = (config.method || "get").toUpperCase();
  config.header = uni_modules_uAjax_js_sdk_lib_utils.merge(
    config.header.common,
    config.header[config.method.toLowerCase()],
    config.header
  );
  uni_modules_uAjax_js_sdk_lib_utils.forEach(uni_modules_uAjax_js_sdk_lib_defaults.HEADER, (h) => uni_modules_uAjax_js_sdk_lib_utils.isPlainObject(config.header[h]) && delete config.header[h]);
  uni_modules_uAjax_js_sdk_lib_utils.forEach(config, (val, key) => uni_modules_uAjax_js_sdk_lib_helpers_isCallback.isCallback(key) && delete config[key]);
  return config.adapter(config);
}
exports.dispatchRequest = dispatchRequest;

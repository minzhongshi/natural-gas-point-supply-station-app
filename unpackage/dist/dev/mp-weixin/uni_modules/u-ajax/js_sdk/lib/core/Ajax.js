"use strict";
const uni_modules_uAjax_js_sdk_lib_core_InterceptorManager = require("./InterceptorManager.js");
const uni_modules_uAjax_js_sdk_lib_helpers_buildURL = require("../helpers/buildURL.js");
const uni_modules_uAjax_js_sdk_lib_helpers_mergeConfig = require("../helpers/mergeConfig.js");
const uni_modules_uAjax_js_sdk_lib_core_dispatchRequest = require("./dispatchRequest.js");
const uni_modules_uAjax_js_sdk_lib_core_handleCancel = require("./handleCancel.js");
const uni_modules_uAjax_js_sdk_lib_defaults = require("../defaults.js");
const uni_modules_uAjax_js_sdk_lib_utils = require("../utils.js");
function Ajax(defaultConfig) {
  ajax.config = Object.freeze(
    typeof defaultConfig === "object" ? uni_modules_uAjax_js_sdk_lib_utils.merge(defaultConfig) : defaultConfig
  );
  ajax.defaults = uni_modules_uAjax_js_sdk_lib_defaults.defaults;
  ajax.interceptors = {
    request: new uni_modules_uAjax_js_sdk_lib_core_InterceptorManager.InterceptorManager(),
    response: new uni_modules_uAjax_js_sdk_lib_core_InterceptorManager.InterceptorManager()
  };
  ajax.getURL = async function getURL(config) {
    const combineConfig = await uni_modules_uAjax_js_sdk_lib_helpers_mergeConfig.mergeConfig(uni_modules_uAjax_js_sdk_lib_defaults.defaults, defaultConfig, config);
    return uni_modules_uAjax_js_sdk_lib_helpers_buildURL.buildURL(combineConfig).replace(/^\?/, "");
  };
  uni_modules_uAjax_js_sdk_lib_utils.forEach(uni_modules_uAjax_js_sdk_lib_defaults.METHOD, (method) => {
    ajax[method] = function methodAjax(url, data, config) {
      if (typeof url === "string")
        return ajax(url, data, { ...config, method });
      return ajax({ ...url, method });
    };
  });
  function ajax(url, data, config) {
    const newConfig = typeof url === "string" ? { ...config, url, data } : { ...url };
    const chain = [uni_modules_uAjax_js_sdk_lib_core_dispatchRequest.dispatchRequest, uni_modules_uAjax_js_sdk_lib_core_handleCancel.dispatchCancel];
    ajax.interceptors.request.forEach(
      ({ fulfilled, rejected }) => chain.unshift(fulfilled, rejected),
      true
    );
    ajax.interceptors.response.forEach(
      ({ fulfilled, rejected }) => chain.push(fulfilled, uni_modules_uAjax_js_sdk_lib_core_handleCancel.interceptCancel(rejected)),
      false
    );
    chain.unshift((config2) => uni_modules_uAjax_js_sdk_lib_helpers_mergeConfig.mergeConfig(uni_modules_uAjax_js_sdk_lib_defaults.defaults, defaultConfig, config2), void 0);
    chain.push(void 0, uni_modules_uAjax_js_sdk_lib_core_handleCancel.detachCancel);
    let request = Promise.resolve(newConfig);
    while (chain.length) {
      request = request.then(chain.shift(), chain.shift());
    }
    return request;
  }
  return ajax;
}
exports.Ajax = Ajax;

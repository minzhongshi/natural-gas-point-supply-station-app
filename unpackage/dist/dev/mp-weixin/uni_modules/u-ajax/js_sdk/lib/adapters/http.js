"use strict";
const common_vendor = require("../../../../../common/vendor.js");
function adapter(config) {
  return new Promise((resolve, reject) => {
    var _a;
    const requestTask = common_vendor.index.request({
      ...config,
      complete: (result) => {
        const response = { config, ...result };
        !config.validateStatus || config.validateStatus(result.statusCode) ? resolve(response) : reject(response);
      }
    });
    (_a = config.fetcher) == null ? void 0 : _a.resolve(requestTask);
  });
}
exports.adapter = adapter;

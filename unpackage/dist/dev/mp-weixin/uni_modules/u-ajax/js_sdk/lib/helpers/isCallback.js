"use strict";
function isCallback(field) {
  return ["success", "fail", "complete"].includes(field);
}
exports.isCallback = isCallback;

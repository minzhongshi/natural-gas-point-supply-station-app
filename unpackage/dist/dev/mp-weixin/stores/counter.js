"use strict";
const common_vendor = require("../common/vendor.js");
const userAccountStore = common_vendor.defineStore("user", {
  state: () => ({
    information: {}
  }),
  unistorage: {
    paths: "information"
  }
});
const userToken = common_vendor.defineStore("token", {
  state: () => ({
    token: ""
  }),
  unistorage: {
    paths: "token"
  }
});
exports.userAccountStore = userAccountStore;
exports.userToken = userToken;

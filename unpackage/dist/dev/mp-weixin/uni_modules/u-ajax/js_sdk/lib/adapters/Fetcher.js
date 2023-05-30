"use strict";
const PROMISE = Symbol("$$promise");
class Fetcher {
  get [Symbol.toStringTag]() {
    return "[object Fetcher]";
  }
  constructor() {
    this[PROMISE] = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  async source() {
    return this[PROMISE];
  }
  async abort() {
    var _a;
    (_a = await this.source()) == null ? void 0 : _a.abort();
  }
}
exports.Fetcher = Fetcher;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.someOrFailException = someOrFailException;

var _index = /*#__PURE__*/require("../GlobalExceptions/index.js");

var _someOrFail = /*#__PURE__*/require("./someOrFail.js");

// ets_tracing: off

/**
 * Extracts the optional value, or fails with a `NoSuchElementException`
 */
function someOrFailException(self, __trace) {
  return (0, _someOrFail.someOrFail_)(self, () => new _index.NoSuchElementException(), __trace);
}
//# sourceMappingURL=someOrFailException.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.succeed = succeed;
exports.succeed_ = succeed_;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

// ets_tracing: off

/**
 * Completes the promise with the specified value.
 */
function succeed(a) {
  return promise => (0, _completeWith.completeWith)((0, _core.succeed)(a))(promise);
}
/**
 * Completes the promise with the specified value.
 */


function succeed_(promise, a) {
  return (0, _completeWith.completeWith)((0, _core.succeed)(a))(promise);
}
//# sourceMappingURL=succeed.js.map
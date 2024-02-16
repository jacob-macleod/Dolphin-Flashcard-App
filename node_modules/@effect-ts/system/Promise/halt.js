"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.halt = halt;
exports.halt_ = halt_;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

/**
 * Halts the promise with the specified cause, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
function halt_(promise, e) {
  return (0, _completeWith.completeWith)((0, _core.halt)(e))(promise);
}
/**
 * Halts the promise with the specified cause, which will be propagated to all
 * fibers waiting on the value of the promise.
 */


function halt(e) {
  return promise => halt_(promise, e);
}
//# sourceMappingURL=halt.js.map
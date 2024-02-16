"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fail = fail;
exports.fail_ = fail_;

var _fail = /*#__PURE__*/require("../Effect/fail.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

// ets_tracing: off

/**
 * Fails the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
function fail_(promise, e) {
  return (0, _completeWith.completeWith)((0, _fail.fail)(e))(promise);
}
/**
 * Fails the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */


function fail(e) {
  return promise => fail_(promise, e);
}
//# sourceMappingURL=fail.js.map
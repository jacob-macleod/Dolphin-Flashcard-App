"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.done = done;

var _done = /*#__PURE__*/require("../Effect/done.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

// ets_tracing: off

/**
 * Exits the promise with the specified exit, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
function done(e) {
  return promise => (0, _completeWith.completeWith)((0, _done.done)(e))(promise);
}
//# sourceMappingURL=done.js.map
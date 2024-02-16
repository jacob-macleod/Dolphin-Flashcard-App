"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complete = complete;

var _to = /*#__PURE__*/require("../Effect/to.js");

/**
 * Completes the promise with the result of the specified effect. If the
 * promise has already been completed, the method will produce false.
 *
 * Note that `Promise.completeWith` will be much faster, so consider using
 * that if you do not need to memoize the result of the specified effect.
 */
function complete(e) {
  return promise => (0, _to.to)(promise)(e);
}
//# sourceMappingURL=complete.js.map
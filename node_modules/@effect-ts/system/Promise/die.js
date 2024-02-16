"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.die = die;

var _die = /*#__PURE__*/require("../Effect/die.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

// ets_tracing: off

/**
 * Kills the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
function die(e) {
  return promise => (0, _completeWith.completeWith)((0, _die.die)(e))(promise);
}
//# sourceMappingURL=die.js.map
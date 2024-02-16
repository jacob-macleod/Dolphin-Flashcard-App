"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptAs = interruptAs;

var _interruption = /*#__PURE__*/require("../Effect/interruption.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

// ets_tracing: off

/**
 * Completes the promise with interruption. This will interrupt all fibers
 * waiting on the value of the promise as by the specified fiber.
 */
function interruptAs(id) {
  return promise => (0, _completeWith.completeWith)((0, _interruption.interruptAs)(id))(promise);
}
//# sourceMappingURL=interruptAs.js.map
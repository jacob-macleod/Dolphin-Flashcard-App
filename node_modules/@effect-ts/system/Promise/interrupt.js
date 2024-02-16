"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interrupt = interrupt;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _fiberId = /*#__PURE__*/require("../Effect/fiberId.js");

var _interruption = /*#__PURE__*/require("../Effect/interruption.js");

var _completeWith = /*#__PURE__*/require("./completeWith.js");

// ets_tracing: off

/**
 * Completes the promise with interruption. This will interrupt all fibers
 * waiting on the value of the promise as by the fiber calling this method.
 */
function interrupt(promise) {
  return (0, _core.chain_)(_fiberId.fiberId, id => (0, _completeWith.completeWith)((0, _interruption.interruptAs)(id))(promise));
}
//# sourceMappingURL=interrupt.js.map
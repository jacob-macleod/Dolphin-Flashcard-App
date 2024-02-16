"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.to = to;
exports.to_ = to_;

var _done = /*#__PURE__*/require("../Promise/done.js");

var _core = /*#__PURE__*/require("./core.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

// ets_tracing: off

/**
 * Returns an effect that keeps or breaks a promise based on the result of
 * this effect. Synchronizes interruption, so if this effect is interrupted,
 * the specified promise will be interrupted, too.
 *
 * @ets_data_first to_
 */
function to(p, __trace) {
  return effect => to_(effect, p, __trace);
}
/**
 * Returns an effect that keeps or breaks a promise based on the result of
 * this effect. Synchronizes interruption, so if this effect is interrupted,
 * the specified promise will be interrupted, too.
 */


function to_(effect, p, __trace) {
  return (0, _interruption.uninterruptibleMask)(({
    restore
  }) => (0, _core.chain_)((0, _core.result)(restore(effect)), x => (0, _done.done)(x)(p)), __trace);
}
//# sourceMappingURL=to.js.map
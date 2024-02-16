"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tapCause = tapCause;
exports.tapCause_ = tapCause_;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 *
 * @ets_data_first tapCause_
 */
function tapCause(f, __trace) {
  return effect => tapCause_(effect, f, __trace);
}
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 */


function tapCause_(effect, f, __trace) {
  return (0, _core.foldCauseM_)(effect, c => (0, _core.chain_)(f(c), () => (0, _core.halt)(c)), _core.succeed, __trace);
}
//# sourceMappingURL=tapCause.js.map
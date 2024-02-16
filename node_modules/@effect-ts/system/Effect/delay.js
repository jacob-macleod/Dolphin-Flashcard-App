"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;
exports.delay_ = delay_;

var _core = /*#__PURE__*/require("./core.js");

var _sleep = /*#__PURE__*/require("./sleep.js");

/**
 * Delay the effect of n milliseconds
 *
 * @ets_data_first delay_
 */
function delay(ms, __trace) {
  return effect => delay_(effect, ms, __trace);
}
/**
 * Delay the effect of ms milliseconds
 */


function delay_(effect, ms, __trace) {
  return (0, _core.chain_)((0, _sleep.sleep)(ms, __trace), () => effect);
}
//# sourceMappingURL=delay.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tap = tap;
exports.tap_ = tap_;

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

// ets_tracing: off

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @ets_data_first tap_
 */
function tap(f, __trace) {
  return fa => tap_(fa, f, __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 */


function tap_(_, f, __trace) {
  return (0, _core.chain_)(_, a => (0, _map.map_)(f(a), () => a), __trace);
}
//# sourceMappingURL=tap.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

// ets_tracing: off

/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @ets_data_first zipWith_
 */
function zipWith(b, f, __trace) {
  return a => zipWith_(a, b, f, __trace);
}
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */


function zipWith_(a, b, f, __trace) {
  return (0, _core.chain_)(a, ra => (0, _map.map_)(b, rb => f(ra, rb)), __trace);
}
//# sourceMappingURL=zipWith.js.map
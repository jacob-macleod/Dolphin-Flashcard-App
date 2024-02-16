"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crossWith = crossWith;
exports.crossWith_ = crossWith_;

var _chain = /*#__PURE__*/require("./chain.js");

var _map = /*#__PURE__*/require("./map.js");

// ets_tracing: off

/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */
function crossWith_(self, that, f) {
  return (0, _chain.chain_)(self, l => (0, _map.map_)(that, r => f(l, r)));
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements
 * with a specified function.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossWith_
 */


function crossWith(that, f) {
  return self => crossWith_(self, that, f);
}
//# sourceMappingURL=crossWith.js.map
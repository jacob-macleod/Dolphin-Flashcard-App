"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crossLeft = crossLeft;
exports.crossLeft_ = crossLeft_;

var _crossWith = /*#__PURE__*/require("./crossWith.js");

// ets_tracing: off

/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from this stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 */
function crossLeft_(self, that) {
  return (0, _crossWith.crossWith_)(self, that, o => o);
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements,
 * but keeps only elements from this stream.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * See also `Stream#zip` for the more common point-wise variant.
 *
 * @ets_data_first crossLeft_
 */


function crossLeft(that) {
  return self => crossLeft_(self, that);
}
//# sourceMappingURL=crossLeft.js.map
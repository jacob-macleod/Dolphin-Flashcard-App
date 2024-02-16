"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replicate = replicate;
exports.replicateMUnit = replicateMUnit;
exports.replicateMUnit_ = replicateMUnit_;
exports.replicate_ = replicate_;

var _index = /*#__PURE__*/require("../Collections/Immutable/Array/index.js");

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

// ets_tracing: off

/**
 * Replicates the given effect `n` times.
 *
 * @ets_data_first replicate_
 */
function replicate(n, __trace) {
  return self => replicate_(self, n);
}
/**
 * Replicates the given effect `n` times.
 */


function replicate_(self, n) {
  return (0, _index.range)(0, n).map(() => self);
}
/**
 * Performs this effect the specified number of times, discarding the
 * results.
 */


function replicateMUnit_(self, n) {
  return (0, _exclForEach.collectAllUnit)(replicate_(self, n));
}
/**
 * Performs this effect the specified number of times, discarding the
 * results.
 */


function replicateMUnit(n) {
  return self => replicateMUnit_(self, n);
}
//# sourceMappingURL=replicate.js.map
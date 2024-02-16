"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenPar = flattenPar;
exports.flattenPar_ = flattenPar_;

var _chainPar = /*#__PURE__*/require("./chainPar.js");

// ets_tracing: off

/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */
function flattenPar_(self, n, outputBuffer = 16) {
  return (0, _chainPar.chainPar)(n, outputBuffer)(x => x)(self);
}
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */


function flattenPar(n, outputBuffer = 16) {
  return self => flattenPar_(self, n, outputBuffer);
}
//# sourceMappingURL=flattenPar.js.map
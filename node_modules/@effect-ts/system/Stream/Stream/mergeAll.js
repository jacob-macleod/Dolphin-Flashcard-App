"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAll = mergeAll;

var _flattenPar = /*#__PURE__*/require("./flattenPar.js");

var _fromIterable = /*#__PURE__*/require("./fromIterable.js");

/**
 * Merges a variable list of streams in a non-deterministic fashion.
 * Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` chunks may be buffered by this operator.
 */
function mergeAll(n, outputBuffer = 16) {
  return (...streams) => (0, _flattenPar.flattenPar_)((0, _fromIterable.fromIterable)(streams), n, outputBuffer);
}
//# sourceMappingURL=mergeAll.js.map
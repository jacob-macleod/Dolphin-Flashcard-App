"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMParUnordered = mapMParUnordered;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _chainPar = /*#__PURE__*/require("./chainPar.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

// ets_tracing: off

/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 */
function mapMParUnordered(n) {
  return f => self => (0, _chainPar.chainPar)(n)(a => (0, _fromEffect.fromEffect)(f(a)))(self);
}
//# sourceMappingURL=mapMParUnordered.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffectParUnordered = mapEffectParUnordered;
exports.mapEffectParUnordered_ = mapEffectParUnordered_;

var ChainPar = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chainPar.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 */
function mapEffectParUnordered_(self, n, f) {
  return ChainPar.chainPar_(self, n, a => FromEffect.fromEffect(f(a)));
}
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 *
 * @ets_data_first mapEffectParUnordered_
 */


function mapEffectParUnordered(n, f) {
  return self => mapEffectParUnordered_(self, n, f);
}
//# sourceMappingURL=mapEffectParUnordered.js.map
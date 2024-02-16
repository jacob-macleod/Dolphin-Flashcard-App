"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldWeightedEffect = foldWeightedEffect;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var FoldWeightedDecomposeEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./foldWeightedDecomposeEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * @note Elements that have an individual cost larger than `max` will
 * force the sink to cross the `max` cost. See `foldWeightedDecomposeM`
 * for a variant that can handle these cases.
 */
function foldWeightedEffect(z, costFn, max, f) {
  return FoldWeightedDecomposeEffect.foldWeightedDecomposeEffect(z, costFn, max, i => T.succeed(CK.single(i)), f);
}
//# sourceMappingURL=foldWeightedEffect.js.map
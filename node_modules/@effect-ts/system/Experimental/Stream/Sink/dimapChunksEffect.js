"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dimapChunksEffect = dimapChunksEffect;
exports.dimapChunksEffect_ = dimapChunksEffect_;

var ContramapChunksEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./contramapChunksEffect.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 */
function dimapChunksEffect_(self, f, g) {
  return MapEffect.mapEffect_(ContramapChunksEffect.contramapChunksEffect_(self, f), g);
}
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 *
 * @ets_data_first dimapChunksEffect_
 */


function dimapChunksEffect(f, g) {
  return self => dimapChunksEffect_(self, f, g);
}
//# sourceMappingURL=dimapChunksEffect.js.map
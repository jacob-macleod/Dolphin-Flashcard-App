"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapConcatEffect = mapConcatEffect;
exports.mapConcatEffect_ = mapConcatEffect_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var MapConcatChunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapConcatChunk.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */
function mapConcatEffect_(self, f) {
  return MapConcatChunk.mapConcatChunk_(MapEffect.mapEffect_(self, a => T.map_(f(a), CK.from)), _index3.identity);
}
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 *
 * @ets_data_first mapConcatEffect_
 */


function mapConcatEffect(f) {
  return self => mapConcatEffect_(self, f);
}
//# sourceMappingURL=mapConcatEffect.js.map
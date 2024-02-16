"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapConcatChunkEffect = mapConcatChunkEffect;
exports.mapConcatChunkEffect_ = mapConcatChunkEffect_;

var _index = /*#__PURE__*/require("../../../../Function/index.js");

var MapConcatChunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapConcatChunk.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */
function mapConcatChunkEffect_(self, f) {
  return MapConcatChunk.mapConcatChunk_(MapEffect.mapEffect_(self, f), _index.identity);
}
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 *
 * @ets_data_first mapConcatChunkEffect_
 */


function mapConcatChunkEffect(f) {
  return self => mapConcatChunkEffect_(self, f);
}
//# sourceMappingURL=mapConcatChunkEffect.js.map
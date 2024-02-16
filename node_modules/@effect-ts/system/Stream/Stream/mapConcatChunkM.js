"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapConcatChunkM = mapConcatChunkM;
exports.mapConcatChunkM_ = mapConcatChunkM_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _mapConcatChunk = /*#__PURE__*/require("./mapConcatChunk.js");

var _mapM = /*#__PURE__*/require("./mapM.js");

/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */
function mapConcatChunkM_(self, f) {
  return (0, _mapConcatChunk.mapConcatChunk)(_index.identity)((0, _mapM.mapM)(f)(self));
}
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */


function mapConcatChunkM(f) {
  return self => mapConcatChunkM_(self, f);
}
//# sourceMappingURL=mapConcatChunkM.js.map
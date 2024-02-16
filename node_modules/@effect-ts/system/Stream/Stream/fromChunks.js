"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromChunks = fromChunks;

var _chain = /*#__PURE__*/require("./chain.js");

var _fromChunk = /*#__PURE__*/require("./fromChunk.js");

var _fromIterable = /*#__PURE__*/require("./fromIterable.js");

/**
 * Creates a stream from an array of values
 */
function fromChunks(...cs) {
  return (0, _chain.chain_)((0, _fromIterable.fromIterable)(cs), _fromChunk.fromChunk);
}
//# sourceMappingURL=fromChunks.js.map
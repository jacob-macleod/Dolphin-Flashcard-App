"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipLeft = zipLeft;
exports.zipLeft_ = zipLeft_;

var _zipWith = /*#__PURE__*/require("./zipWith.js");

/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */
function zipLeft_(self, that) {
  return (0, _zipWith.zipWith_)(self, that, o => o);
}
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */


function zipLeft(that) {
  return self => zipLeft_(self, that);
}
//# sourceMappingURL=zipLeft.js.map
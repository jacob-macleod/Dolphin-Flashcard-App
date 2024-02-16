"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipRight = zipRight;
exports.zipRight_ = zipRight_;

var _zipWith = /*#__PURE__*/require("./zipWith.js");

/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 */
function zipRight_(self, that) {
  return (0, _zipWith.zipWith_)(self, that, (_, o2) => o2);
}
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 */


function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=zipRight.js.map
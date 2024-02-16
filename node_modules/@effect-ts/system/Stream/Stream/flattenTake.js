"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenTake = flattenTake;

var _flattenChunks = /*#__PURE__*/require("./flattenChunks.js");

var _flattenExitOption = /*#__PURE__*/require("./flattenExitOption.js");

/**
 * Unwraps `Exit` values and flatten chunks that also signify end-of-stream by failing with `None`.
 */
function flattenTake(self) {
  return (0, _flattenChunks.flattenChunks)((0, _flattenExitOption.flattenExitOption)(self));
}
//# sourceMappingURL=flattenTake.js.map
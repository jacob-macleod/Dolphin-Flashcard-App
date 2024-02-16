"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenParUnbounded = flattenParUnbounded;

var _flattenPar = /*#__PURE__*/require("./flattenPar.js");

/**
 * Like `flattenPar`, but executes all streams concurrently.
 */
function flattenParUnbounded(self, outputBuffer = 16) {
  return (0, _flattenPar.flattenPar_)(self, Number.MAX_SAFE_INTEGER, outputBuffer);
}
//# sourceMappingURL=flattenParUnbounded.js.map
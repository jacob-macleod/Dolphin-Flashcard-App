"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAllUnbounded = mergeAllUnbounded;

var _mergeAll = /*#__PURE__*/require("./mergeAll.js");

/**
 * Like `mergeAll`, but runs all streams concurrently.
 */
function mergeAllUnbounded(outputBuffer = 16) {
  return (...streams) => (0, _mergeAll.mergeAll)(Number.MAX_SAFE_INTEGER, outputBuffer)(...streams);
}
//# sourceMappingURL=mergeAllUnbounded.js.map
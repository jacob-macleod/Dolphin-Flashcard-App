"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;

var _core = /*#__PURE__*/require("./core.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 */
function merge(self, __trace) {
  return (0, _foldM.foldM_)(self, _core.succeed, _core.succeed, __trace);
}
//# sourceMappingURL=merge.js.map
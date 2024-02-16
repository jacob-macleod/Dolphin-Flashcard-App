"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapErrorCause = mapErrorCause;
exports.mapErrorCause_ = mapErrorCause_;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns an effect with its full cause of failure mapped using
 * the specified function. This can be used to transform errors
 * while preserving the original structure of Cause.
 */
function mapErrorCause_(self, f, __trace) {
  return (0, _core.foldCauseM_)(self, c => (0, _core.halt)(f(c)), _core.succeed, __trace);
}
/**
 * Returns an effect with its full cause of failure mapped using
 * the specified function. This can be used to transform errors
 * while preserving the original structure of Cause.
 */


function mapErrorCause(f, __trace) {
  return self => (0, _core.foldCauseM_)(self, c => (0, _core.halt)(f(c)), _core.succeed, __trace);
}
//# sourceMappingURL=mapErrorCause.js.map
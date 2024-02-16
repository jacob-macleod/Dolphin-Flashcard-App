"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAllCause = catchAllCause;
exports.catchAllCause_ = catchAllCause_;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Recovers from all errors with provided cause.
 */
function catchAllCause_(effect, f, __trace) {
  return (0, _core.foldCauseM_)(effect, f, _core.succeed, __trace);
}
/**
 * Recovers from all errors with provided cause.
 *
 * @ets_data_first catchAllCause_
 */


function catchAllCause(f, __trace) {
  return effect => catchAllCause_(effect, f, __trace);
}
//# sourceMappingURL=catchAllCause.js.map
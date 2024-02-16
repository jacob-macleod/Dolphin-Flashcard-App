"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapError = mapError;
exports.mapError_ = mapError_;

var _core = /*#__PURE__*/require("../Cause/core.js");

var _core2 = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger"
 * error.
 */
function mapError_(self, f, __trace) {
  return (0, _core2.foldCauseM_)(self, c => (0, _core2.halt)((0, _core.map_)(c, f)), a => (0, _core2.succeed)(a), __trace);
}
/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger"
 * error.
 *
 * @ets_data_first mapError_
 */


function mapError(f, __trace) {
  return self => mapError_(self, f, __trace);
}
//# sourceMappingURL=mapError.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElse = orElse;
exports.orElse_ = orElse_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 */
function orElse_(self, that, __trace) {
  return (0, _core.tryOrElse_)(self, that, _core.succeed, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise executes the specified effect.
 *
 * @ets_data_first orElse_
 */


function orElse(that, __trace) {
  return self => orElse_(self, that, __trace);
}
//# sourceMappingURL=orElse.js.map
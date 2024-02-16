"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElseSucceed = orElseSucceed;
exports.orElseSucceed_ = orElseSucceed_;

var _core = /*#__PURE__*/require("./core.js");

var _orElse = /*#__PURE__*/require("./orElse.js");

// ets_tracing: off

/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @ets_data_first orElseSucceed_
 */
function orElseSucceed(a, __trace) {
  return self => orElseSucceed_(self, a, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 */


function orElseSucceed_(self, a, __trace) {
  return (0, _orElse.orElse_)(self, () => (0, _core.succeed)(a), __trace);
}
//# sourceMappingURL=orElseSucceed.js.map
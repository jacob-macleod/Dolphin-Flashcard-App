"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;

var _index = /*#__PURE__*/require("../Clock/index.js");

// ets_tracing: off

/**
 * Sleeps for `ms` milliseconds
 */
function sleep(ms, __trace) {
  return (0, _index.sleep)(ms, __trace);
}
//# sourceMappingURL=sleep.js.map
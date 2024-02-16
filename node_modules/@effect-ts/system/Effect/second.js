"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.second = second;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Returns an effectful function that extracts out the second element of a
 * tuple.
 */
function second(__trace) {
  return (0, _core.access)(a => a, __trace);
}
//# sourceMappingURL=second.js.map
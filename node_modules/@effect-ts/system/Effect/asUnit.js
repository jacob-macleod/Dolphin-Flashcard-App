"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asUnit = asUnit;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Ignores the result of the effect replacing it with a void
 */
function asUnit(self, __trace) {
  return (0, _core.chain_)(self, () => _core.unit, __trace);
}
//# sourceMappingURL=asUnit.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suspend = suspend;

var _core = /*#__PURE__*/require("../../Effect/core.js");

var _managed = /*#__PURE__*/require("../managed.js");

// ets_tracing: off

/**
 * Suspends the creation of this effect
 */
function suspend(f, __trace) {
  return (0, _managed.managedApply)((0, _core.suspend)(() => f().effect, __trace));
}
//# sourceMappingURL=suspend.js.map
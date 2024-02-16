"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracedMask = tracedMask;
exports.untracedMask = untracedMask;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off
function restore(b) {
  return self => b ? (0, _core.traced)(self) : (0, _core.untraced)(self);
}
/**
 * Makes the effect untraced, but passes it a restore function that can be used to restore
 * the inherited traceability from whatever region the effect is composed into.
 */


function untracedMask(f) {
  return (0, _core.checkTraced)(b => (0, _core.untraced)(f(restore(b))));
}
/**
 * Makes the effect traced, but passes it a restore function that can be used to restore
 * the inherited traceability from whatever region the effect is composed into.
 */


function tracedMask(f) {
  return (0, _core.checkTraced)(b => (0, _core.traced)(f(restore(b))));
}
//# sourceMappingURL=traceMask.js.map
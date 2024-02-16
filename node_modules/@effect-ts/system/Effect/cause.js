"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cause = cause;

var _cause = /*#__PURE__*/require("../Cause/cause.js");

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns an effect that succeeds with the cause of failure of this effect,
 * or `Cause.empty` if the effect did not succeed.
 */
function cause(effect, __trace) {
  return (0, _core.foldCauseM_)(effect, _core.succeed, () => (0, _core.succeed)(_cause.empty), __trace);
}
//# sourceMappingURL=cause.js.map
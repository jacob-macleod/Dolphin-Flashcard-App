"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uncause = uncause;

var _cause = /*#__PURE__*/require("../Cause/cause.js");

var _core = /*#__PURE__*/require("./core.js");

/**
 * When this effect succeeds with a cause, then this method returns a new
 * effect that either fails with the cause that this effect succeeded with,
 * or succeeds with unit, depending on whether the cause is empty.
 *
 * This operation is the opposite of `cause`.
 */
function uncause(effect, __trace) {
  return (0, _core.chain_)(effect, a => (0, _cause.isEmpty)(a) ? _core.unit : (0, _core.halt)(a), __trace);
}
//# sourceMappingURL=uncause.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bracketFiber = bracketFiber;
exports.bracketFiber_ = bracketFiber_;

var _bracket = /*#__PURE__*/require("./bracket.js");

var _core = /*#__PURE__*/require("./core.js");

var _coreScope = /*#__PURE__*/require("./core-scope.js");

var _fiberId = /*#__PURE__*/require("./fiberId.js");

/**
 * Fork the effect into a separate fiber wrapping it in a bracket and returining the
 * `use` handle. Acquisition will fork and release will interrupt the fiber
 */
function bracketFiber_(effect, use, __trace) {
  return (0, _bracket.bracket_)((0, _coreScope.forkDaemon)(effect), f => (0, _core.chain_)(_fiberId.fiberId, f.interruptAs), use, __trace);
}
/**
 * Fork the effect into a separate fiber wrapping it in a bracket.
 * Acquisition will fork and release will interrupt the fiber.
 *
 * @ets_data_first bracketFiber_
 */


function bracketFiber(use, __trace) {
  return effect => bracketFiber_(effect, use, __trace);
}
//# sourceMappingURL=bracketFiber.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dieMessage = dieMessage;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _die = /*#__PURE__*/require("./die.js");

// ets_tracing: off

/**
 * Returns an effect that dies with a {@link RuntimeError} having the
 * specified text message. This method can be used for terminating a fiber
 * because a defect has been detected in the code.
 */
function dieMessage(message, __trace) {
  return (0, _die.dieWith)(() => new _index.RuntimeError(message), __trace);
}
//# sourceMappingURL=dieMessage.js.map
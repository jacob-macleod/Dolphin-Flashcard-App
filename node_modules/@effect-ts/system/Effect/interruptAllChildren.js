"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptAllChildren = interruptAllChildren;

var _index = /*#__PURE__*/require("../Fiber/index.js");

var _ensuringChildren = /*#__PURE__*/require("./ensuringChildren.js");

// ets_tracing: off

/**
 * Returns a new effect that will not succeed with its value before first
 * interrupting all child fibers forked by the effect.
 */
function interruptAllChildren(self, __trace) {
  return (0, _ensuringChildren.ensuringChildren_)(self, _index.interruptAll, __trace);
}
//# sourceMappingURL=interruptAllChildren.js.map
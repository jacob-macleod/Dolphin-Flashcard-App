"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fiberId = void 0;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Returns the `FiberID` of the fiber executing the effect that calls this method.
 */
const fiberId = /*#__PURE__*/(0, _core.descriptorWith)(d => (0, _core.succeed)(d.id));
exports.fiberId = fiberId;
//# sourceMappingURL=fiberId.js.map
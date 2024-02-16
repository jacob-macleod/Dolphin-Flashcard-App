"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAs = makeAs;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _unsafeMake = /*#__PURE__*/require("./unsafeMake.js");

// ets_tracing: off

/**
 * Makes a new promise to be completed by the fiber with the specified id.
 */
function makeAs(fiberId) {
  return (0, _core.succeedWith)(() => (0, _unsafeMake.unsafeMake)(fiberId));
}
//# sourceMappingURL=makeAs.js.map
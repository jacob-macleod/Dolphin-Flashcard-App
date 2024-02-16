"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeManaged = makeManaged;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _fiberId = /*#__PURE__*/require("../Effect/fiberId.js");

var _index = /*#__PURE__*/require("../Effect/index.js");

var _makeAs = /*#__PURE__*/require("./makeAs.js");

// ets_tracing: off

/**
 * Makes a new managed promise to be completed by the fiber creating the promise.
 */
function makeManaged() {
  return (0, _index.toManaged)((0, _core.chain_)(_fiberId.fiberId, id => (0, _makeAs.makeAs)(id)));
}
//# sourceMappingURL=makeManaged.js.map
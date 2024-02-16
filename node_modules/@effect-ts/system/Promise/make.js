"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = make;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _fiberId = /*#__PURE__*/require("../Effect/fiberId.js");

var _makeAs = /*#__PURE__*/require("./makeAs.js");

// ets_tracing: off

/**
 * Makes a new promise to be completed by the fiber creating the promise.
 */
function make() {
  return (0, _core.chain_)(_fiberId.fiberId, id => (0, _makeAs.makeAs)(id));
}
//# sourceMappingURL=make.js.map
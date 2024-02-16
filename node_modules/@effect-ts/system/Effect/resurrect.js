"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resurrect = resurrect;

var _index = /*#__PURE__*/require("../Function/index.js");

var _index2 = /*#__PURE__*/require("../Option/index.js");

var _unrefine = /*#__PURE__*/require("./unrefine.js");

// ets_tracing: off

/**
 * Unearth the unchecked failure of the effect. (opposite of `orDie`)
 */
function resurrect(self, __trace) {
  return (0, _unrefine.unrefineWith_)(self, _index2.some, _index.identity, __trace);
}
//# sourceMappingURL=resurrect.js.map
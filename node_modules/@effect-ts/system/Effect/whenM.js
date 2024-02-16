"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenM = whenM;
exports.whenM_ = whenM_;

var _asUnit = /*#__PURE__*/require("./asUnit.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 */
function whenM_(self, predicate, __trace) {
  return (0, _core.chain_)(predicate, a => a ? (0, _asUnit.asUnit)(self, __trace) : _core.unit);
}
/**
 * The moral equivalent of `if (p) exp` when `p` has side-effects
 *
 * @ets_data_first whenM_
 */


function whenM(predicate, __trace) {
  return self => whenM_(self, predicate, __trace);
}
//# sourceMappingURL=whenM.js.map
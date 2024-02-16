"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unless = unless;
exports.unlessM = unlessM;
exports.unlessM_ = unlessM_;
exports.unless_ = unless_;

var _asUnit = /*#__PURE__*/require("./asUnit.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * The moral equivalent of `if (!p) exp`
 *
 * @ets_data_first unless_
 */
function unless(b, __trace) {
  return self => (0, _core.suspend)(() => b() ? _core.unit : (0, _asUnit.asUnit)(self), __trace);
}
/**
 * The moral equivalent of `if (!p) exp`
 */


function unless_(self, b, __trace) {
  return (0, _core.suspend)(() => b() ? _core.unit : (0, _asUnit.asUnit)(self), __trace);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 *
 * @ets_data_first unlessM_
 */


function unlessM(b, __trace) {
  return self => unlessM_(self, b, __trace);
}
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects
 */


function unlessM_(self, b, __trace) {
  return (0, _core.chain_)(b, _ => _ ? _core.unit : (0, _asUnit.asUnit)(self), __trace);
}
//# sourceMappingURL=unless.js.map
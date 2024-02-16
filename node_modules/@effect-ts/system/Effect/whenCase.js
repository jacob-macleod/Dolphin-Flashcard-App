"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenCase = whenCase;
exports.whenCase_ = whenCase_;

var _asUnit = /*#__PURE__*/require("./asUnit.js");

var _core = /*#__PURE__*/require("./core.js");

/**
 * Runs an effect when the supplied `PartialFunction` matches for the given value, otherwise does nothing.
 */
function whenCase_(a, pf, __trace) {
  return (0, _core.suspend)(() => {
    const p = pf(a);

    if (p._tag === "None") {
      return _core.unit;
    }

    return (0, _asUnit.asUnit)(p.value);
  }, __trace);
}
/**
 * Runs an effect when the supplied `PartialFunction` matches for the given value, otherwise does nothing.
 *
 * @dateFirst whenCase_
 */


function whenCase(pf, __trace) {
  return a => whenCase_(a, pf, __trace);
}
//# sourceMappingURL=whenCase.js.map
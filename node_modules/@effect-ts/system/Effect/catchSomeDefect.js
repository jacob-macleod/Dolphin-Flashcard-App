"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchSomeDefect = catchSomeDefect;
exports.catchSomeDefect_ = catchSomeDefect_;

var _catchAll = /*#__PURE__*/require("./catchAll.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _unrefine = /*#__PURE__*/require("./unrefine.js");

/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 */
function catchSomeDefect_(fa, f, __trace) {
  return (0, _catchAll.catchAll_)((0, _unrefine.unrefineWith_)(fa, f, _fail.fail), s => s, __trace);
}
/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @dataFist catchSomeDefect_
 */


function catchSomeDefect(f, __trace) {
  return effect => catchSomeDefect_(effect, f, __trace);
}
//# sourceMappingURL=catchSomeDefect.js.map
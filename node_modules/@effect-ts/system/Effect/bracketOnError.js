"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bracketOnError = bracketOnError;
exports.bracketOnError_ = bracketOnError_;

var _bracketExit = /*#__PURE__*/require("./bracketExit.js");

var _core = /*#__PURE__*/require("./core.js");

/**
 * Executes the release effect only if there was an error.
 *
 * @ets_data_first bracketOnError_
 */
function bracketOnError(use, release, __trace) {
  return acquire => bracketOnError_(acquire, use, release, __trace);
}
/**
 * Executes the release effect only if there was an error.
 */


function bracketOnError_(acquire, use, release, __trace) {
  return (0, _bracketExit.bracketExit_)(acquire, use, (a, e) => e._tag === "Success" ? _core.unit : release(a, e), __trace);
}
//# sourceMappingURL=bracketOnError.js.map
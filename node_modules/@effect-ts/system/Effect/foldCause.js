"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldCause = foldCause;
exports.foldCause_ = foldCause_;

var _core = /*#__PURE__*/require("./core.js");

/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 */
function foldCause_(value, failure, success, __trace) {
  return (0, _core.foldCauseM_)(value, c => (0, _core.succeed)(failure(c)), x => (0, _core.succeed)(success(x)), __trace);
}
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCause_
 */


function foldCause(failure, success, __trace) {
  return value => foldCause_(value, failure, success, __trace);
}
//# sourceMappingURL=foldCause.js.map
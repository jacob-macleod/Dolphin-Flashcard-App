"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fold = fold;
exports.fold_ = fold_;

var _core = /*#__PURE__*/require("./core.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 */
function fold_(value, failure, success, __trace) {
  return (0, _foldM.foldM_)(value, e => (0, _core.succeed)(failure(e)), a => (0, _core.succeed)(success(a)), __trace);
}
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 *
 * @ets_data_first fold_
 */


function fold(failure, success, __trace) {
  return value => fold_(value, failure, success, __trace);
}
//# sourceMappingURL=fold.js.map
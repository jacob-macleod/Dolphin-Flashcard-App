"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cond = cond;
exports.condM = condM;
exports.condM_ = condM_;
exports.cond_ = cond_;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

// ets_tracing: off

/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 *
 * @ets_data_first cond_
 */
function cond(onTrue, onFalse, __trace) {
  return b => cond_(b, onTrue, onFalse, __trace);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */


function cond_(b, onTrue, onFalse, __trace) {
  return condM_(b, (0, _core.succeedWith)(onTrue), (0, _core.succeedWith)(onFalse), __trace);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */


function condM_(b, onTrue, onFalse, __trace) {
  return (0, _core.suspend)(() => b ? onTrue : (0, _core.chain_)(onFalse, x => (0, _fail.fail)(x)), __trace);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */


function condM(onTrue, onFalse, __trace) {
  return b => condM_(b, onTrue, onFalse, __trace);
}
//# sourceMappingURL=cond.js.map